export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { platform, tone, topic } = req.body;

    const prompt = `
You are a world-class viral content strategist.

Create 5 ${platform} hooks.
Tone: ${tone}
Topic: ${topic}

Rules:
- Short
- Scroll-stopping
- Emotional or curiosity driven
- Numbered list
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You write viral hooks." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return res.status(500).json({ error: "OpenAI error", details: data });
    }

    return res.status(200).json({
      result: data.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({ error: "Server crash", details: error.message });
  }
}
