// /api/chat.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API Key 未設定，請檢查 Vercel 環境變數。' });
    }

    try {
        // 修改點：將 v1beta 改為 v1，這是最穩定的路徑
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `你是一位靈魂塔羅占卜師。請針對牌面進行深度解析。
                請嚴格以繁體中文 JSON 回傳（不要包含任何 Markdown 標籤或文字）：
                {
                  "interpretations": [{"meaning":"牌義描述","advice":"行動建議"}],
                  "summary": "能量總結",
                  "soulMantra": "一句話格言"
                }
                
                內容：${prompt}` }] }],
                generationConfig: {
                    // 強制要求 JSON 格式回傳
                    responseMimeType: "application/json"
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ error: 'Google API 報錯', details: errorText });
        }

        const data = await response.json();
        const resultText = data.candidates[0].content.parts[0].text;
        
        // 回傳給前端
        res.status(200).json(JSON.parse(resultText));

    } catch (error) {
        res.status(500).json({ error: '大腦執行失敗', message: error.message });
    }
}
