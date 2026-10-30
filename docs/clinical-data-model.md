# Down Plus — Clinical Data Model & Guidelines Reference

> Clinical supervision standards according to the **American Academy of Pediatrics (AAP)** guidelines for children with Down Syndrome.

---

## 1. AAP Health Supervision Schedule for Down Syndrome

| Age Bracket | Mandatory Clinical Screening | Clinical Rationale & Actions |
|-------------|------------------------------|------------------------------|
| **Birth – 2 Months** | Neonatal Screening Echocardiogram | Screen for Congenital Heart Defects (AVSD, VSD, ASD) present in ~50% of infants with Down Syndrome. |
| **Birth – 6 Months** | Karyotype Genetic Testing | Confirmation of Trisomy 21 (Free Trisomy ~95%, Translocation ~4%, Mosaicism ~1%). |
| **6 – 12 Months** | Annual Thyroid Function Panel (TSH + FT4) | Detect congenital or early autoimmune primary/subclinical hypothyroidism; adjust sodium levothyroxine (Eltroxin) dosage. |
| **12 – 18 Months** | Pediatric Audiology & Tympanometry | Screen for middle-ear effusion and conductive hearing loss caused by stenotic auditory canals. |
| **24 – 36 Months** | Pediatric Ophthalmology Exam | Screen for early cataracts, refractive errors, strabismus, and nystagmus. |
| **36 – 48 Months** | Cervical Spine Lateral X-Ray (Neutral/Flexion/Extension) | Evaluate for Atlantoaxial Instability (AAI) before participation in contact sports or gymnastics. |

---

## 2. Independence Ladder (سلم الاستقلالية)

Every developmental skill in Down Plus progresses through four sequential stages:

```
[not_started]  ──(Early Guidance)──>  [with_assistance]  ──(Milestone Achieved)──>  [independent]  ──(Full Generalization)──>  [mastered_outside]
  لم تبدأ بعد                               بمساعدة                                    مستقل بمفرده                                 متقنة تماماً
```

1. **`not_started` (لم تبدأ بعد):** The child cannot yet initiate or perform the skill.
2. **`with_assistance` (بمساعدة):** The child performs the task with physical hand-over-hand support or specialized adaptive equipment (e.g. SMO ankle orthotics, feeding spoons).
3. **`independent` (مستقل بمفرده):** The child performs the action without adult intervention or physical support across a standard duration.
4. **`mastered_outside` (متقنة تماماً في بيئات متعددة):** The skill is generalized across settings (home, nursery, clinic, playground) with zero regression.

---

## 3. Document Classification Taxonomy

| Category Key | Medical Domain | Typical File Formats | AI Ingestion Priority |
|--------------|----------------|----------------------|-----------------------|
| `Echo` | Pediatric Cardiology | PDF, DICOM, JPEG | Critical (Conditions: VSD, AVSD, PDA) |
| `Lab` | Endocrinology & Hematology | PDF, JPEG | Critical (TSH, FT4, CBC) |
| `Genetics` | Cytogenetics | PDF, JPEG | Baseline (Karyotype classification) |
| `Therapy_Report` | Physical & Speech Therapy | PDF, DOCX | Developmental (Gross motor tone, expressive language) |
| `Prescription` | Clinical Pharmacology | JPEG, PNG, PDF | Active medications & dosage updates |
