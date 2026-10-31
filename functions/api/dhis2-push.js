// Cloudflare Pages Function: POST /api/dhis2-push  body {"level":"ok"|"support"|"refer"}
// Sends ONLY an anonymous monthly count to DHIS2. Secrets live in Cloudflare settings, never in GitHub.
export async function onRequestPost({ request, env }) {
  const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json' } });
  let b; try { b = await request.json(); } catch (e) { return J({ ok: false, error: 'bad request' }, 400); }
  const de = { ok: env.DE_OK, support: env.DE_SUPPORT, refer: env.DE_REFER }[b.level];
  if (!de || !env.DHIS2_URL || !env.ORG_UNIT) return J({ ok: false, error: 'not configured' }, 400);
  const d = new Date(), pe = '' + d.getUTCFullYear() + String(d.getUTCMonth() + 1).padStart(2, '0');
  const h = { Authorization: 'Basic ' + btoa(env.DHIS2_USER + ':' + env.DHIS2_PASS), 'Content-Type': 'application/json' };
  let n = 0;
  const g = await fetch(`${env.DHIS2_URL}/api/dataValues?de=${de}&pe=${pe}&ou=${env.ORG_UNIT}`, { headers: h });
  if (g.ok) { const v = await g.json(); n = parseInt(Array.isArray(v) ? v[0] : v) || 0; }
  const p = await fetch(`${env.DHIS2_URL}/api/dataValueSets`, { method: 'POST', headers: h,
    body: JSON.stringify({ dataValues: [{ dataElement: de, period: pe, orgUnit: env.ORG_UNIT, value: String(n + 1) }] }) });
  return J({ ok: p.ok, error: p.ok ? undefined : 'dhis2 ' + p.status }, p.ok ? 200 : 502);
}
