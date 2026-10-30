# Down Plus — Digital Health Engine
## Comprehensive Commercial Proposal, Scope of Work & Milestone Weighting Schedule

**Document Reference:** DP-COMM-2026-EGY-V2  
**Target Audience:** Client Executive Committee, Product Sponsor & Technical Leads  
**Solution Delivery Partners:** Medexia.ai (Clinical Innovation) & AI MicroMind (AI & Engineering)  
**Target Market:** Egypt & Regional Healthcare Providers  
**Currency Standard:** USD ($) & Egyptian Pound (EGP) at 1 USD = 57 EGP  
**Classification:** Confidential Commercial Agreement  

---

## 1. Executive Summary & Commercial Proposition

The **Down Plus Digital Health Engine** is an enterprise-grade digital health platform designed to capture market leadership in pediatric special needs care across Egypt and the MENA region. Jointly delivered by **Medexia.ai** and **AI MicroMind**, the solution combines clinical protocol automation (American Academy of Pediatrics Health Supervision Guidelines for Down Syndrome), developmental progression tracking (The 4-Stage Independence Ladder), and privacy-preserving generative AI.

### Commercial Value Proposition for the Client
- **High Retention & 18-Year Patient LTV:** Unlike episodic medical applications, families of children with Down Syndrome require continuous developmental, hormonal, and physical therapy tracking from birth through adulthood (18+ years).
- **Dual Monetization Streams Tailored for Egypt:**
  1. **B2C Recurring Subscriptions (via Paymob):** Premium parent tier at **250 EGP / month** (~$4.40 USD) or **2,200 EGP / year** (~$38.60 USD) for automated document OCR extraction, unlimited cloud storage, real-time clinical AI triage, and emergency Life Passport QR.
     * *At 10,000 active subscribed families: **22,000,000+ EGP Annual Recurring Revenue (ARR)** (~$385k USD).*
  2. **B2B Clinic Marketplace & Specialist Referral Commission:** 12% – 15% platform commission on doctor consultations and therapy sessions, plus clinic administration seats at **4,500 EGP / branch / month**.
- **Significant Intake Efficiency:** Partner clinics achieve a **65% reduction in administrative intake time** via pre-parsed OCR lab reports, karyotypes, and verified clinical baselines.
- **Future-Proof Multi-Tenant Architecture:** The investment in the Core Engine allows zero-overhead expansion into additional neurological conditions (Cerebral Palsy, Autism Spectrum Disorder, ADHD).

---

## 2. Platform Scope of Work (SOW) & Deliverables Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                DOWN PLUS SOLUTION SCOPE                                 │
├──────────────────────────────┬─────────────────────────────┬────────────────────────────┤
│ 1. Backend Core & API        │ 2. Parent Mobile App        │ 3. Doctor & Admin Web      │
│ - NestJS Modular Architecture│ - React Native Expo (iOS/And│ - Next.js 14 App Router    │
│ - PostgreSQL + pgvector DB   │ - Complete Onboarding & Auth│ - Clinician Baseline Work- │
│ - BullMQ Asynchronous OCR    │ - Milestones & Independence │   bench & Verification     │
│ - Anonymizer AI Boundary     │ - Encrypted Document Vault  │ - Ephemeral QR Guest View  │
│ - Paymob Subscription Engine │ - AI Health Assistant Chat  │ - Admin User & System Mgmt │
│ - Doctor Matching Engine     │ - Dynamic Life Passport QR  │                            │
├──────────────────────────────┴─────────────────────────────┴────────────────────────────┤
│ 4. Cloud Infrastructure, Security & Compliance:                                         │
│ - Terraform AWS Infrastructure as Code (VPC, ECS Fargate, RDS PostgreSQL, ElastiCache)  │
│ - HIPAA & GDPR compliant PII separation and AES-256 KMS encryption                      │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Project Milestone Breakdown & Commercial Weighting Matrix

To ensure disciplined execution and protect client cash flow, the total turnkey contract is partitioned into **Six Structured Milestones**. Payments are strictly gated by deliverables and verified client sign-off.

### Milestone Financial Weighting Table (Egyptian Market Schedule)

| Milestone ID | Phase Name | Focus Area | Weight (%) | Timeline | Amount (USD) | Amount (EGP @ 57) | Deliverable Artifacts |
|:---:|---|---|:---:|:---:|:---:|:---:|---|
| **M1** | **Foundation & Architecture Sign-Off** | Architecture, Data Models, CI/CD, Containerized Stack | **15%** | Week 1 – 2 | **$1,500** | **85,500 EGP** | Technical Spec, Database ERD, Docker Dev Stack, Initial Wireframes |
| **M2** | **Core Backend Engine & Security Ingestion** | Auth, RBAC, PII Isolation, S3 Encrypted Vault, OCR Pipeline | **20%** | Week 3 – 5 | **$2,000** | **114,000 EGP** | NestJS API Core, BullMQ OCR Worker, Swagger Documentation, S3 Presigned Engine |
| **M3** | **Clinical Intelligence & AI Engine** | AAP Supervision Schedule, Independence Ladder, RAG Anonymizer | **20%** | Week 6 – 8 | **$2,000** | **114,000 EGP** | AI Chat Gateway, Anonymizer Boundary, Doctor Matching Algorithm, Milestone Catalog |
| **M4** | **Cross-Platform Mobile Application** | Parent Portal (iOS & Android) in Expo React Native | **20%** | Week 9 – 11 | **$2,000** | **114,000 EGP** | Complete Parent Mobile App, Offline Storage, Life Passport QR Screen, Chat UI |
| **M5** | **Doctor Portal, Guest QR & Payment Engine** | Next.js Clinician Web, Guest Viewer, Paymob Subscriptions | **15%** | Week 12 – 14| **$1,500** | **85,500 EGP** | Doctor Dashboard, Baseline Verification Workbench, Paymob Webhooks & Subscriptions |
| **M6** | **Production Deployment, Security Audit & UAT** | AWS Terraform Deployment, Penetration Testing, Handover | **10%** | Week 15 – 16| **$1,000** | **57,000 EGP** | Live AWS Production System, Store Submission Builds, Final IP Transfer & Training |
| **TOTAL** | | | **100%** | **16 Weeks** | **$10,000** | **570,000 EGP** | **Complete Turnkey Solution** |

---

## 4. Financial Investment & Cash Flow Schedule

### 4.1 Investment Packages

| Package Tier | Total Investment (USD) | Total Investment (EGP @ 57) | Scope Included | Ideal For |
|---|:---:|:---:|---|---|
| **Turnkey Production Platform** *(Recommended)* | **$10,000 USD** | **570,000 EGP** | Full Milestones M1 – M6, iOS & Android Mobile Apps, Doctor Portal, Paymob Integration, Complete AWS Terraform IaC, 60 Days Full Warranty | Egyptian Commercial Launch & Healthcare Startups |
| **Enterprise Multi-Disease License** | **$16,500 USD** | **940,500 EGP** | Turnkey Platform + Additional Disease Modules (Cerebral Palsy GMFCS & Autism Spectrum trackers), Multi-Clinic Tenant Management, 120 Days Full Warranty | Hospital Chains & Regional Health Groups |

### 4.2 Cash Flow Milestones

```
[M1 & M2: 35%]  ──►  $3,500 USD (199,500 EGP)  ──►  Kickoff & Core API/S3 Acceptance
[M3 & M4: 40%]  ──►  $4,000 USD (228,000 EGP)  ──►  Clinical AI Engine & Mobile App Builds
[M5 & M6: 25%]  ──►  $2,500 USD (142,500 EGP)  ──►  Doctor Portal, Paymob & Production Launch
```

---

## 5. Operational Run Costs & Third-Party Infrastructure Estimates

All cloud infrastructure and vendor services are billed directly to the client's corporate billing accounts with zero agency markup:

| Infrastructure Item | Provider / Vendor | Estimated Monthly Cost (Early Launch: < 5,000 users) | Estimated Monthly Cost (Growth: 50,000+ users) |
|---|---|:---:|:---:|
| **AWS Cloud Hosting** (ECS Fargate, RDS PostgreSQL Multi-AZ, ElastiCache Redis, S3 KMS, ALB) | Amazon Web Services | $180 – $320 / month<br>*(~10,260 – 18,240 EGP/mo)* | $650 – $1,200 / month<br>*(~37,050 – 68,400 EGP/mo)* |
| **LLM Inference Tokens** (Anonymized clinical RAG, baseline generation, chat assistant) | OpenRouter / Google Gemini | $30 – $80 / month<br>*(~1,710 – 4,560 EGP/mo)* | $250 – $600 / month<br>*(~14,250 – 34,200 EGP/mo)* |
| **Payment Gateway Transaction Fee** | Paymob | 2.5% – 2.75% + 3 EGP per transaction | Standard blended gateway rates |
| **SMS OTP Verification** | Twilio / Local SMS Gateway | $20 – $50 / month<br>*(~1,140 – 2,850 EGP/mo)* | $150 – $400 / month<br>*(~8,550 – 22,800 EGP/mo)* |
| **Apple Developer Enterprise / Organization** | Apple Inc. | $99 / year (~5,643 EGP/yr) | $99 / year (~5,643 EGP/yr) |
| **Google Play Developer Account** | Google LLC | $25 one-time fee (~1,425 EGP) | $25 one-time fee (~1,425 EGP) |

---

## 6. Service Level Agreement (SLA), Warranty & Terms

### 6.1 Complimentary 60-Day Warranty Period
Included with the turnkey delivery is a **60-Calendar Day Comprehensive Warranty** commencing on the date of Milestone 6 sign-off.
- **Coverage:** Zero-cost resolution of all software bugs, regressions, security vulnerabilities, or deviations from the Technical Specification.
- **Exclusions:** New feature additions, infrastructure cost changes, or client-initiated third-party API changes.

### 6.2 100% Intellectual Property Ownership Transfer
Upon settlement of all milestone payments, 100% of the Intellectual Property (IP), proprietary source code, database schemas, graphic designs, and application documentation transfers exclusively to the Client.

### 6.3 Post-Warranty SLA Maintenance (Optional)
Following the warranty period, the client may elect to subscribe to an ongoing Silver Maintenance Agreement at **$750 USD / month (~42,750 EGP / month)** for 30 dedicated hours/month, continuous database optimization, and priority 8-hour incident response.

---

### Mutual Authorization & Sign-Off

**For the Client:**  
Name: ________________________________  
Title: _________________________________  
Date: _________________________________  
Signature: _____________________________  

**For the Solution Delivery Partners (Medexia.ai & AI MicroMind):**  
Name: ________________________________  
Title: _________________________________  
Date: _________________________________  
Signature: _____________________________  
