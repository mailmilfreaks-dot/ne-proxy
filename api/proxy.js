export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { endpoint, ...body } = req.body;
  const params = new URLSearchParams(body);
  const response = await fetch(`https://api.next-engine.org${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const data = await response.json();
  res.status(200).json(data);
}
```

5. 右上の**「Commit changes」→「Commit changes」**を押す

---

## ② vercel.json を追加する

`ne-proxy` のトップに戻って、**「+」ボタン**（「Go to file」の右隣にある）→「**Create new file**」をクリック

ファイル名：
```
vercel.json
