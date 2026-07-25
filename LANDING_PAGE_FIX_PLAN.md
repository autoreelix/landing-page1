# Landing Page Fix Plan

Date: 2026-07-25
Scope: Targeted fixes to the AUTOREELIX landing page and beta application flow. No redesign, no rebuild, no removal of working features.

## Current Problems

1. The public application flow exposes developer-style fallback messages.
2. The application form does not clearly capture access intent for Free Creator vs Founding Creator.
3. The submission path can fail with configuration errors that should never reach visitors.
4. The current data model does not clearly separate founder interest from free applicants.
5. Turnstile and Resend setup are present in code paths, but the visitor experience is not yet fully brand-safe when configuration is missing.

## Planned Fixes

### 1) Remove the Early Access Flow card

- Remove the public-facing Early Access Flow block from the landing page.
- Keep the application functionality and form CTA intact.
- Preserve the current SmartOrb visual treatment and overall premium landing page styling.

### 2) Update the application form

- Add a required access-type question.
- Options:
  - Free Creator
  - Founding Creator — $20
- Make it clear that Founding Creator is a future paid founder opportunity, not a charge that happens now.
- Preserve all existing creator fields.

### 3) Update application storage

- Store the user selection with the submission.
- Add or normalize these fields:
  - `access_type`: `free_creator` or `founding_creator`
  - `payment_status`: `not_started`
  - `application_status`: `submitted`, `reviewing`, `selected`, `invited`
- Keep the existing fields intact.
- Preserve the ability to filter founder interest separately from free users.

### 4) Fix submission flow and user messaging

- Verify the form submits successfully end-to-end.
- Ensure the API route receives and validates the new access-type field.
- Ensure Supabase insert works with the expected table and columns.
- Replace technical failures with brand-safe copy only.
- Use a user-facing success confirmation after submission.

### 5) Clean up Turnstile behavior

- Show the security widget only when configured.
- Hide developer/setup messaging from visitors.
- If Turnstile is not configured, show a neutral branded fallback instead of setup text.

### 6) Verify Resend flow

- Confirm applicant confirmation email is sent when configured.
- Confirm admin notification email is sent when configured.
- Keep confirmation messaging visible after successful submit.

## Files That Need Changes

- [app/page.tsx](app/page.tsx)
- [app/components/FoundingCreatorApplicationForm.tsx](app/components/FoundingCreatorApplicationForm.tsx)
- [app/api/early-access/route.ts](app/api/early-access/route.ts)
- [app/.env.local](app/.env.local) for local variable hygiene only

## Database Changes

Required table: `early_access_applications`

Expected fields to support the flow:

- `id`
- `name`
- `email`
- `creator_handle`
- `platform`
- `followers`
- `category`
- `posting_frequency`
- `challenge`
- `video_link`
- `improvement`
- `access_type`
- `payment_status`
- `application_status`
- `status`
- `created_at`

Recommended defaults:

- `access_type`: `free_creator`
- `payment_status`: `not_started`
- `application_status`: `submitted`
- `status`: `review`

## Environment Variables Needed

### Required

- `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SERVICE_KEY`
- `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_ADMIN_EMAIL`

### Optional

- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `SENTRY_DSN`

## Production Readiness Check

After implementation, verify:

- No developer/configuration messages are visible on the page
- The Apply button submits successfully
- Applications are stored in Supabase
- Access type is stored correctly for free and founding users
- Success confirmation displays after submit
- Confirmation and admin emails are sent when configured
- SmartOrb remains the visual centerpiece and the landing page still feels premium