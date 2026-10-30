terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "DownPlus"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Compliance  = "HIPAA-GDPR"
    }
  }
}

# ── 1. VPC & Networking ──
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "downplus-vpc-${var.environment}"
  }
}

# ── 2. S3 Encrypted Document Storage ──
resource "aws_s3_bucket" "medical_documents" {
  bucket = "downplus-medical-docs-${var.environment}"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "medical_documents_crypto" {
  bucket = aws_s3_bucket.medical_documents.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "block_public" {
  bucket = aws_s3_bucket.medical_documents.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ── 3. RDS PostgreSQL 16 (Multi-AZ with pgvector) ──
resource "aws_db_instance" "postgres" {
  identifier           = "downplus-db-${var.environment}"
  engine               = "postgres"
  engine_version       = "16.3"
  instance_class       = var.db_instance_class
  allocated_storage    = 50
  max_allocated_storage = 500
  storage_type         = "gp3"
  storage_encrypted    = true

  db_name  = "downplus"
  username = var.db_username
  password = var.db_password

  multi_az            = var.environment == "production" ? true : false
  skip_final_snapshot = var.environment != "production"
  deletion_protection = var.environment == "production"

  tags = {
    Name = "downplus-rds-${var.environment}"
  }
}

# ── 4. ElastiCache Redis 7 ──
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "downplus-redis-${var.environment}"
  engine               = "redis"
  node_type            = "cache.t4g.medium"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
}

# ── 5. ECS Fargate Cluster ──
resource "aws_ecs_cluster" "core" {
  name = "downplus-cluster-${var.environment}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}
