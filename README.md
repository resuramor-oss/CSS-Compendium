# CSS Compendium

A free, source-based reviewer for **TESDA Computer Systems Servicing NC II** (CSS NC II). Public reading and quick quizzes work without an account; signing in adds progress tracking, saved quiz attempts, and a dashboard.

The original static site is preserved under [`legacy/`](./legacy) and in the `v1-static` Git tag.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **MDX content** in `src/content` — versioned in Git
- **Supabase** — Postgres, Auth, Row-Level Security
- **Vercel** — hosting and optional aggregate analytics
- Material Design 3-inspired UI, light and dark themes

## Local development

Requires **Node.js 22 LTS or newer** (the Supabase JS SDK has dropped Node 20 support).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. Without Supabase variables the site runs in **public-only mode**: reading and quizzes work, accounts and saved progress do not.

## Supabase setup (free)

1. Create a project at <https://supabase.com> (Singapore region is closest to the Philippines).
2. Open the SQL editor and run `supabase/migrations/20261030000000_init.sql`.
3. Copy **Project URL** and **anon public key** from Project Settings → API into `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Authentication → Providers:
   - **Email** is enabled by default. For faster testing, you can turn off “Confirm email”; for production, keep it on and configure custom SMTP if Supabase’s built-in email is too slow.
   - **Google** is optional. Create an OAuth client in Google Cloud Console, add the Supabase callback URL, then paste the client ID and secret into Supabase.
5. Authentication → URL Configuration:
   - Site URL: `http://localhost:3000` locally, your production URL when deployed.
   - Redirect URLs: add `http://localhost:3000/**` and `https://your-site.vercel.app/**` (wildcards are supported), or at minimum `/auth/callback`, `/auth/confirm`, `/account/reset`, and `/dashboard` on both origins.
6. Authentication → Email Templates. For the SSR/PKCE flow, replace the confirmation link in **Confirm signup** with:

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next={{ .RedirectTo }}">Confirm your email</a>
```

And replace the link in **Reset password** with:

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/account/reset">Reset your password</a>
```

The `/auth/confirm` route verifies the token hash and sets the session cookies before redirecting. OAuth still uses `/auth/callback`.

The migration creates:

- `profiles` (display name, role, analytics preference) with an auto-create trigger
- `section_progress` (reviewed sections per user)
- `quiz_attempts` and `attempt_answers` (saved attempts)
- RLS policies so users only read/write their own rows

Your account is a normal `student` by default. Content is edited in Git, so there is no admin CMS in this version.

## Content

Each COC is a directory under `src/content/coc-N/` with six MDX sections:

```
overview.mdx
standards.mdx
notes.mdx
procedures.mdx
tools.mdx
mistakes.mdx
```

Frontmatter supports `title`, `summary`, `lastReviewed`, and a `sources` array:

```yaml
---
title: Quick-Recall Notes
summary: The concepts most likely to be probed.
lastReviewed: "2026-10-30"
sources:
  - label: TESDA Training Regulations — CSS NC II, pp. 38–41
    url: https://www.tesda.gov.ph/...
---
```

Question banks live in `src/content/questions/coc-N.ts`. Each question has four choices, a zero-based `answer` index, an explanation, and a source. The quiz API never sends the answer key to the client before submission.

Run the content checks:

```bash
npm run validate:content
npm run typecheck
npm run lint
npm run build
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/coc/[1-4]` | Reviewer: standards, notes, procedures, tools, mistakes |
| `/quiz` | Practice hub |
| `/quiz/[1-4]` | 10 random questions for one COC |
| `/exam` | 15-question, 20-minute mixed mock exam |
| `/dashboard` | Signed-in progress and attempt history |
| `/login` | Email/password and Google sign-in |
| `/account/reset` | Choose a new password after a recovery link |
| `/about` | Sources and methodology |
| `/privacy` | Data and analytics notice |

## Deploy to Vercel

1. Import the GitHub repo into Vercel.
2. Add the three environment variables from `.env.example`.
3. Deploy. Add the production callback URL to Supabase’s redirect allow-list.
4. Enable Vercel Analytics in the Vercel dashboard if you want the opt-in aggregate analytics to work.

### Free-tier notes

- Supabase free projects pause after about a week of inactivity. A scheduled GitHub Action ping can keep it awake; otherwise restore it from the dashboard.
- Vercel Hobby is for non-commercial projects. This is a free study site; move to another host or a paid plan if that changes.
- Optional analytics are loaded only after the visitor opts in, and collect aggregate page views and quiz completions.

## Legacy site

The v1 static site is in `legacy/` and tagged `v1-static`. To keep the old GitHub Pages URL working while the new app lives on Vercel:

1. Open the repository’s **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the **Deploy legacy site to GitHub Pages** workflow manually).

The workflow in `.github/workflows/pages.yml` publishes only `legacy/`, so the old `index.html`, `coc1.html`–`coc4.html`, CSS, and JS remain available at their original paths. When you are ready to retire them, replace that workflow with redirect pages that point to the Vercel deployment.

## Disclaimer

CSS Compendium is not affiliated with TESDA. Content is paraphrased and cited from official TESDA Training Regulations and Self-Assessment Guides for non-commercial study. Always verify details against the current TR and your assessment centre.
