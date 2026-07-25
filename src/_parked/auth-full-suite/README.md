# Parked — full-suite auth variant

These files are **not routed** and are kept for reference/restoration only.

## Why they're here
PRD-001 EPIC-016 (TASK-154–162) scopes the visible `/signin` UI to a
**Google-only** card. TASK-155 requires "one Continue with Google button …
no email/password fields or forgot-password link", and TASK-161 (scope
compliance) explicitly forbids password fields, a forgot-password link, and an
onboarding/sign-up wizard.

The repo previously shipped the **full-suite** variant (Google **plus**
email/password sign-in, a `/signup` form with password-strength meter +
consent, and a `/reset` password-reset flow), ported from
`devrails-uiux → ui_kits/auth/index-full-suite.v1.html`. That variant is
out of scope for PRD-001, so it was moved here on **2026-07-24** rather than
deleted.

## Contents
- `signin.full-suite.tsx` — original Google + email/password `/signin`
- `signup.tsx` — email/password sign-up (strength meter, consent)
- `reset.tsx` — password-reset request flow

## Restoring
Move the file(s) back into `src/routes/` (rename `signin.full-suite.tsx` →
`signin.tsx`, replacing the Google-only version), remove the `@ts-nocheck` /
`eslint-disable` header lines, and let TanStack Router regenerate
`routeTree.gen.ts`. They import shared primitives from
`@/components/devrails/auth/authShared`, which is still present.

Real Firebase wiring is a separate task (TASK-012 / EPIC-017) and is **not**
included in any of these files.
