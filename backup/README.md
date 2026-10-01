# Backup: Original Single-Founder Version

**Created**: October 2, 2026  
**Source Git Commit**: `9895bd0` (`origin/main`)

## Contents
This folder contains the original single-founder implementation of the marketing site prior to the addition of course instructors.

- `original-single-founder/Founder.tsx`: Original single-instructor showcase for Dr. Aftab Ali, MBBS.
- `original-single-founder/layout.tsx`: Original layout containing JSON-LD schema with Dr. Aftab Ali as the sole person listed.

## How to Restore
If you ever want to revert back to this exact original version:

```powershell
# Copy the original files back into the marketing site
Copy-Item "c:\Users\Ashhad\Projects\ConceptsToClinics\backup\original-single-founder\Founder.tsx" "c:\Users\Ashhad\Projects\ConceptsToClinics\marketing-site\src\components\Founder.tsx" -Force
Copy-Item "c:\Users\Ashhad\Projects\ConceptsToClinics\backup\original-single-founder\layout.tsx" "c:\Users\Ashhad\Projects\ConceptsToClinics\marketing-site\src\app\layout.tsx" -Force
```

Or using Git directly:
```bash
git checkout 9895bd0 -- marketing-site/src/components/Founder.tsx marketing-site/src/app/layout.tsx
```
