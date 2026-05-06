export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, system } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; // 從 Vercel 的保險箱拿鑰匙

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                systemInstruction: { parts: [{ text: system }] },
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        const data = await response.json();
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        return res.status(200).json(JSON.parse(textResult));
    } catch (error) {
        return res.status(500).json({ error: '連線到宇宙時發生了一點干擾' });
    }
}
