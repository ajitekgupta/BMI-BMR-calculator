export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}` 
      },
      body: JSON.stringify({
        model: "liquid/lfm-2.5-1.2b-thinking:free",
        messages: [
          {
            role: "system",
            content: "You are a helpful health and fitness assistant. Keep your answers under 3 sentences. Only answer questions related to BMI, BMR, calories, and fitness. If the user asks anything unrelated, politely say you can only help with health and fitness topics."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API responded with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "Failed to fetch response from AI" });
  }
}
