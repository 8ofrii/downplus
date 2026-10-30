# Down Plus — Digital Health Core Architecture

> Master Engineering Reference (v1.0)

---

## 1. Multi-Tenant Core Principles

The architecture strictly decouples generic platform services (**Core Engine**) from pediatric-specific clinical pathways (**Disease Modules**):

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Digital Health Core                             │
│   Auth • RBAC • Child Profile • Document Storage • Anonymization Core  │
│   Payment Engine • Notification Bus • Matrix Matching • Timeline Engine │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│  Down Plus Module (Active)   │              │ Future Modules (CP, ADHD...) │
│  - AAP Health Supervision    │              │ - Disease-specific logic     │
│  - Down Milestone Scales     │              │ - Custom Assessment trees    │
│  - Independence Matrix       │              │ - Disease clinical templates │
└──────────────────────────────┘              └──────────────────────────────┘
```

Every domain-specific table (e.g., `milestone_catalog`) includes a `module_disease` discriminator column defaulting to `'Down Syndrome'`.

---

## 2. GDPR & HIPAA Security Architecture

### 2.1 PII Separation
Identifiable personal data (`first_name`, `last_name`, `phone_number`, `email`) is isolated strictly within the `children` and `users` tables. Downstream clinical calculations, RAG vector embeddings, and LLM prompts never receive raw PII.

### 2.2 AI Anonymization Boundary (`AnonymizerService`)
All prompt text passing to LLM gateways (OpenRouter / Gemini / Claude) undergoes deterministic regex and semantic scrubbing:
1. Replaces patient names with generic references (`Patient`).
2. Redacts phone numbers (`[PHONE REDACTED]`).
3. Redacts email addresses (`[EMAIL REDACTED]`).
4. Redacts 14-digit Egyptian National IDs (`[NATIONAL_ID REDACTED]`).

### 2.3 Cryptography & Access Control
- **Data at Rest:** Encrypted using AES-256 (`EncryptionService` handles sensitive fields).
- **Presigned URLs:** AWS S3 presigned URLs generated with a strict maximum 15-minute (900 seconds) time-to-live.
- **External Sharing:** Cryptographic tokens (`exp_<random_hex>`) with configurable 24h to 48h expiration.

---

## 3. Doctor Matching Engine

Specialist matching calculates a composite score using the weighted formula:

$$\text{Score} = (\text{Specialty Match} \times 0.4) + (\text{Location Proximity} \times 0.25) + (\text{Down Syndrome Experience} \times 0.2) + (\text{Rating} \times 0.15)$$

- **Specialty Match (40%):** Direct match with pediatric physiotherapy, speech pathology, pediatric neurology, or genetics.
- **Location Proximity (25%):** Matching at city/governorate level (e.g., Cairo, Giza, Alexandria).
- **Down Syndrome Experience (20%):** Normalized score based on dedicated Trisomy 21 case volume.
- **Rating / Seniority (15%):** Pediatric clinical practice years.

---

## 4. Life Passport Export

The **Down Plus Life Passport** acts as a unified developmental health passport for the child. It compiles:
- Confirmed diagnoses & karyotype classification.
- Current active medications and dosages.
- Achieved developmental milestones on the **Independence Ladder**.
- Doctor-verified clinical notes with license verification.
- Time-limited QR code for instant access by external emergency or specialist care teams.
