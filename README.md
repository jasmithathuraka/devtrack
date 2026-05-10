# DevTrack

> Open-source developer productivity dashboard — track coding habits, visualize GitHub contribution patterns, and set personal development goals.

![CI](https://github.com/Priyanshu-byte-coder/devtrack/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![GSSoC 2025](https://img.shields.io/badge/GSSoC-2025-orange.svg)
![Tech Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20Supabase%20%7C%20TypeScript-blue)

> **Live demo coming soon** — deploy your own in minutes with the guide below.

---

## Problem It Solves

Developer metrics are scattered across GitHub, Jira, Notion, and half a dozen other tools. DevTrack consolidates GitHub activity, PR review times, and issue resolution rates into one clean, self-hostable interface — no enterprise pricing, no vendor lock-in.

---

## Features

- **GitHub OAuth** — sign in with GitHub, no extra account needed
- **Contribution Heatmap** — visualize daily commit activity over time
- **PR Analytics** — average review time, merge rate, open/closed ratio
- **Goal Tracker** — set weekly coding goals and track progress
- **No separate backend** — Next.js API routes + Supabase, deploy to Vercel for free

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Auth | GitHub OAuth via NextAuth.js |
| Database | Supabase (PostgreSQL) |
| API | Next.js Route Handlers (`/app/api/`) |
| Charts | Recharts |
| Deployment | Vercel (free, auto-deploys from GitHub) |

---

## Project Structure

```
devtrack/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/  # GitHub OAuth
│   │   │   ├── metrics/
│   │   │   │   ├── contributions/   # GET commit activity
│   │   │   │   └── prs/             # GET PR analytics
│   │   │   └── goals/               # GET + POST weekly goals
│   │   ├── dashboard/               # Main dashboard page
│   │   └── page.tsx                 # Landing page
│   ├── components/                  # ContributionGraph, PRMetrics, GoalTracker
│   ├── lib/
│   │   ├── auth.ts                  # NextAuth config + Supabase user upsert
│   │   ├── github.ts                # GitHub API helpers
│   │   └── supabase.ts              # Supabase admin client (server-side)
│   └── types/
│       └── next-auth.d.ts           # Session type augmentation
├── supabase/
│   └── schema.sql                   # Run once in Supabase SQL editor
├── .github/
│   ├── workflows/ci.yml             # Type-check + lint on every PR
│   └── ISSUE_TEMPLATE/
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- A [Supabase](https://supabase.com) account (free)
- A [GitHub OAuth App](https://github.com/settings/applications/new)

### 1. Clone the repo

```bash
git clone https://github.com/Priyanshu-byte-coder/devtrack.git
cd devtrack
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Once created, go to **SQL Editor** → **New Query**
3. Paste and run the contents of `supabase/schema.sql`
4. Go to **Project Settings → API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

### 3. Create a GitHub OAuth App

1. Go to [github.com/settings/applications/new](https://github.com/settings/applications/new)
2. Fill in:
   - **Homepage URL:** `http://localhost:3000`
   - **Callback URL:** `http://localhost:3000/api/auth/callback/github`
3. Copy **Client ID** and **Client Secret**

### 4. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=any_random_32char_string

GITHUB_ID=your_client_id
GITHUB_SECRET=your_client_secret
```

### 5. Run

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## Contributing

DevTrack is actively seeking contributors for GSSoC 2025. All skill levels welcome.

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for full guidelines.

Quick start:
1. Browse [open issues](../../issues) — look for `good-first-issue` label
2. Comment on the issue to get assigned
3. Fork → branch → PR

**Communication:** GitHub Discussions + Discord (link in Discussions pinned post)

---

## Roadmap

- [ ] Dark mode toggle (#1)
- [ ] User avatar in navbar (#2)
- [ ] GitLab integration (#6, #9, #10, #11)
- [ ] Sign-out button (#12)
- [ ] Create Goal form UI (#13)
- [ ] Mobile responsive layout (#14)
- [ ] User profile/settings page (#15)
- [ ] Export metrics to CSV (#16)
- [ ] Chart type toggle — bar/line (#17)
- [ ] Contribution heatmap calendar (#18)
- [ ] Dashboard auth guard (#19)
- [ ] Slack/Discord weekly digest (#20)
- [ ] VS Code extension for real-time tracking

---

## License

MIT — see [LICENSE](./LICENSE).
