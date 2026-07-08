# Security Hardening

## Gate Authentication

- **Server-side validation**: Password hashed with SHA-256, compared server-side only
- **HTTP-only cookie**: `dgt.auth` set after successful auth, cannot be accessed via JavaScript
- **Rate limiting**: 5 attempts per IP per minute
- **Middleware**: Protected routes require valid cookie to access

## Cloudflare WAF Rules

**NOTE:** Free plan cannot add custom WAF rulesets. Upgrade to Pro/Business to enable Cloudflare WAF.

When available, configure:

1. **Block source map requests**
   - Expression: `(http.request.uri.path contains ".map")`
   - Action: Block
   - Custom response: `403 - lmao nice try`

2. **Block common reconnaissance**
   - Expression: `(http.request.uri.path contains "node_modules") or (http.request.uri.path contains ".env") or (http.request.uri.path contains "config.json")`
   - Action: Block

3. **Challenge auth endpoint**
   - Expression: `(http.request.uri.path eq "/api/auth/gate") and (http.request.method eq "POST")`
   - Action: Challenge (JavaScript)

## Vercel Environment

- `NEXT_PUBLIC_` variables are client-side only — never store secrets this way
- Sensitive hashes stored in route handlers only

## Notes

DevTools console hacks detected:
- `sessionStorage.setItem('dgt.gate', 'ok')` — middleware now validates server-side cookie
- Direct URL access — middleware redirects to `/` if no valid cookie
- Brute-force attempts — rate-limited and logged in Cloudflare

Enjoy the challenge. 🎯
