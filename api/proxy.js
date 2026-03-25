export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);
    if (!body) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = JSON.parse(Buffer.concat(chunks).toString());
    }
    const { endpoint, ...rest } = body;
    if (!endpoint) { res.status(400).json({ result: 'error', message: 'endpoint required' }); return; }
    const params = new URLSearchParams(rest);
    const response = await fetch('https://api.next-engine.org' + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ result: 'error', message: e.message });
  }
}
