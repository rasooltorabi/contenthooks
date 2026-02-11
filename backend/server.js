import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const usage = {}; // { email: { count, date } }

function checkLimit(email){
  const today = new Date().toDateString();

  if(!usage[email] || usage[email].date !== today){
    usage[email] = { count: 0, date: today };
  }

  if(usage[email].count >= 10){
    return false;
  }

  usage[email].count++;
  return true;
}

app.post("/generate", async (req,res)=>{
  const { email, platform, tone, topic, paid } = req.body;

  if(!paid){
    const ok = checkLimit(email);
    if(!ok){
      return res.status(429).json({ error:"Daily limit reached" });
    }
  }

  const prompt = `
You are a world-class viral content strategist.

Create 5 ${platform} hooks.
Tone: ${tone}
Topic: ${topic}

Rules:
- Short
- Scroll-stopping
- Emotional or curiosity driven
- No emojis
- Numbered list
`;

  try{
    const r = await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{
        "Authorization":"Bearer "+process.env.OPENAI_API_KEY,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:"gpt-4o-mini",
        messages:[
          {role:"system",content:"You write viral hooks."},
          {role:"user",content:prompt}
        ]
      })
    });

    const data = await r.json();
    res.json({ result:data.choices[0].message.content });
  }catch(e){
    res.status(500).json({ error:"AI error" });
  }
});

app.listen(3000,()=>{
  console.log("🚀 Backend running on port 3000");
});
