variable "aws_region" {
  description = "AWS deployment region (me-south-1 Bahrain for MENA compliance)"
  type        = string
  default     = "me-south-1"
}

variable "environment" {
  description = "Deployment environment (staging, production)"
  type        = string
  default     = "staging"
}

variable "db_instance_class" {
  description = "RDS DB instance class"
  type        = string
  default     = "db.t4g.medium"
}

variable "db_username" {
  description = "Database master administrator username"
  type        = string
  default     = "downplus_admin"
}

variable "db_password" {
  description = "Database master administrator password"
  type        = string
  sensitive   = true
}
