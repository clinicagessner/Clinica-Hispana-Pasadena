// Descarga datos de Search Console a seo-data/. Uso:
//   node scripts/gsc-fetch.mjs <token> list
//   node scripts/gsc-fetch.mjs <token> <siteUrl> [dias=90]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const [tokName, site, daysArg] = process.argv.slice(2)
const tokPath = join(homedir(), '.config/seo-cli', `${tokName}.json`)
const tok = JSON.parse(readFileSync(tokPath, 'utf8'))

async function accessToken() {
  const body = new URLSearchParams({ client_id: tok.client_id, client_secret: tok.client_secret, refresh_token: tok.refresh_token, grant_type: 'refresh_token' })
  const r = await (await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body })).json()
  if (!r.access_token) throw new Error(JSON.stringify(r))
  return r.access_token
}
const at = await accessToken()
const api = async (path, body) => {
  const r = await fetch('https://www.googleapis.com/webmasters/v3' + path, {
    method: body ? 'POST' : 'GET', headers: { Authorization: `Bearer ${at}`, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body),
  })
  const j = await r.json(); if (!r.ok) throw new Error(path + ' ' + JSON.stringify(j)); return j
}
const inspect = async (siteUrl, inspectionUrl) => {
  const r = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST', headers: { Authorization: `Bearer ${at}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ siteUrl, inspectionUrl }),
  })
  return (await r.json()).inspectionResult?.indexStatusResult ?? {}
}

if (site === 'list') { console.log(JSON.stringify((await api('/sites')).siteEntry, null, 2)); process.exit(0) }

const days = Number(daysArg ?? 90)
const end = new Date(Date.now() - 3 * 864e5), start = new Date(end - days * 864e5)
const d = (x) => x.toISOString().slice(0, 10)
const q = (dimensions, extra = {}) => api(`/sites/${encodeURIComponent(site)}/searchAnalytics/query`, { startDate: d(start), endDate: d(end), dimensions, rowLimit: 5000, ...extra })

const out = join('seo-data', d(end)); mkdirSync(out, { recursive: true })
const save = (n, v) => { writeFileSync(join(out, n), JSON.stringify(v, null, 1)); console.log(n, Array.isArray(v) ? v.length : '') }

const [queries, pages, qp, dev, country, sitemaps] = await Promise.all([
  q(['query']), q(['page']), q(['query', 'page']), q(['device']), q(['country']),
  api(`/sites/${encodeURIComponent(site)}/sitemaps`),
])
save('queries.json', queries.rows ?? []); save('pages.json', pages.rows ?? []); save('query-page.json', qp.rows ?? [])
save('device.json', dev.rows ?? []); save('country.json', country.rows ?? []); save('sitemaps.json', sitemaps.sitemap ?? [])

// Indexación por URL: se inspeccionan las URLs del sitemap del sitio (cuota 2000/día).
const smUrl = (sitemaps.sitemap ?? []).find((s) => s.path.endsWith('sitemap.xml'))?.path
if (smUrl) {
  const xml = await (await fetch(smUrl)).text()
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
  const index = []
  for (const u of urls) index.push({ url: u, ...(await inspect(site, u)) })
  save('index-status.json', index)
  const byVerdict = {}; for (const i of index) byVerdict[i.coverageState ?? i.verdict ?? '?'] = (byVerdict[i.coverageState ?? i.verdict ?? '?'] ?? 0) + 1
  console.log(byVerdict)
}
