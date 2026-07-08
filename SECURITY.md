# Security Hardening

## Gate Authentication

- **Server-side validation**: Password hashed with SHA-256, compared server-side only
- **HTTP-only cookie**: `dgt.auth` set after successful auth, cannot be accessed via JavaScript
- **Rate limiting**: 5 attempts per IP per minute
- **Middleware**: Protected routes require valid cookie to access

## Cloudflare WAF Rules (Configure in Cloudflare Dashboard)

1. **Block source map requests**
   - Expression: `(uri.path contains ".map")`
   - Action: Block

2. **Block common reconnaissance**
   - Expression: `(uri.path contains "node_modules" OR uri.path contains ".env" OR uri.path contains "config.json")`
   - Action: Block

3. **Rate limit auth endpoint**
   - Expression: `(http.request.uri.path eq "/api/auth/gate")`
   - Action: Challenge (JavaScript) after 10 requests per minute

4. **Geographic blocks** (optional)
   - Block VPN/Proxy traffic
   - Block specific high-threat countries

## Vercel Environment

- `NEXT_PUBLIC_` variables are client-side only — never store secrets this way
- Sensitive hashes stored in route handlers only

## Notes

DevTools console hacks detected:
- `sessionStorage.setItem('dgt.gate', 'ok')` — middleware now validates server-side cookie
- Direct URL access — middleware redirects to `/` if no valid cookie
- Brute-force attempts — rate-limited and logged in Cloudflare

Enjoy the challenge. 🎯
