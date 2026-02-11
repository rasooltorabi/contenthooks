export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a viral content creator assistant."
          },
          {
            role: "user",
            content: `Generate 5 viral content hooks about: ${topic}`
          }
        ],
        temperature: 0.8
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      result: data.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error.message });
  }
}
