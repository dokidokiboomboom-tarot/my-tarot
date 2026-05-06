export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: '不允許的方法' });

    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; 

    // 建立塔羅專用的系統提示詞（System Prompt）
    const tarotSystem = `你是一位專業且溫柔的靈魂占卜師。請針對牌面提供深度、具啟發性的分析。
    請嚴格以繁體中文 JSON 格式回傳，格式如下：
    {
      "interpretations": [{"meaning": "牌義深入解釋", "advice": "給使用者的具體行動建議"}],
      "summary": "整體能量總結",
      "soulMantra": "一句靈魂格言"
    }`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: tarotSystem + "\n\n現在請解析這段內容：" + prompt }] }],
                generationConfig: { 
                    responseMimeType: "application/json" // 強制 AI 吐出 JSON 格式
                }
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // 將 AI 吐出的 JSON 字串轉成真正的物件傳回給網頁
        res.status(200).json(JSON.parse(aiResponse));
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: '靈魂連結不穩定，請稍後再試' });
    }
}
