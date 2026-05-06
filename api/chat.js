export default async function handler(req, res) {
  // 只允許 POST 請求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_KEY; // 這裡會讀取 Vercel 的隱藏設定

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `你是一位療癒系塔羅導師。請針對問題進行繁體中文解析，格式必須為 JSON：{"interpretations":[{"meaning":"意義","advice":"建議"}],"soulMantra":"靈魂金句","summary":"總結"} \n\n提問與牌面：${prompt}` }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '能量連結失敗' });
  }
}
