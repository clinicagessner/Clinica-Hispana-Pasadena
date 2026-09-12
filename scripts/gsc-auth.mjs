// Autoriza una cuenta Google para la Search Console API (y Business Profile, para cuando se apruebe).
// Uso: node scripts/gsc-auth.mjs <nombre-token> [ruta-client-json]
// Token en ~/.config/seo-cli/<nombre-token>.json. Cliente OAuth fuera del repo (ver playbook 1.2b).
import { createServer } from 'node:http'
import { readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const name = process.argv[2] ?? 'default'
const clientPath = process.argv[3] ?? join(homedir(), 'Desktop/Freelance Projects/google-oauth-client.json')
const { installed: c } = JSON.parse(readFileSync(clientPath, 'utf8'))
const SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/business.manage',
].join(' ')

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const code = url.searchParams.get('code')
  if (!code) return res.end('Sin código')
  const body = new URLSearchParams({
    code, client_id: c.client_id, client_secret: c.client_secret,
    redirect_uri: `http://localhost:${server.address().port}`, grant_type: 'authorization_code',
  })
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body })
  const tok = await r.json()
  if (!tok.refresh_token) { res.end('Error: ' + JSON.stringify(tok)); console.error(tok); process.exit(1) }
  const out = join(homedir(), '.config/seo-cli', `${name}.json`)
  writeFileSync(out, JSON.stringify({ ...tok, client_id: c.client_id, client_secret: c.client_secret }, null, 2))
  res.end('Autorizado. Puedes cerrar esta pestaña.')
  console.log('Token guardado en', out)
  server.close()
})
server.listen(0, () => {
  const p = new URLSearchParams({
    client_id: c.client_id, redirect_uri: `http://localhost:${server.address().port}`,
    response_type: 'code', scope: SCOPES, access_type: 'offline', prompt: 'consent',
  })
  console.log('ABRE ESTA URL con la cuenta de la clínica:\n\nhttps://accounts.google.com/o/oauth2/v2/auth?' + p)
})
