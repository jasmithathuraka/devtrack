# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main` branch | ✅ |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Email: **priyanshu@devtrack.dev** *(or open a [private security advisory](https://github.com/Priyanshu-byte-coder/devtrack/security/advisories/new))*

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fix (optional)

**Response time:** Acknowledgement within 48 hours. Fix timeline communicated within 5 business days.

## Scope

In scope:
- Authentication bypass or session vulnerabilities
- SQL injection or data exposure via Supabase queries
- GitHub OAuth token leakage
- Server-side request forgery (SSRF) via GitHub API proxy

Out of scope:
- Issues requiring physical access to a device
- Social engineering attacks
- Rate limiting / denial of service on free-tier Vercel/Supabase

## Disclosure Policy

Once a fix is released, we will publish a summary in the [GitHub Security Advisories](https://github.com/Priyanshu-byte-coder/devtrack/security/advisories) page. Credit will be given to the reporter unless they prefer to remain anonymous.
