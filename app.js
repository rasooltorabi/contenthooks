const OPENAI_API_KEY = "PUT_YOUR_OPENAI_API_KEY_HERE"; // ⚠️ فقط برای تست

function getUser(){
  return JSON.parse(localStorage.getItem("user"));
}

function setUser(u){
  localStorage.setItem("user", JSON.stringify(u));
}

function requireAuth(){
  if(!getUser()) location.href="auth.html";
}

function hasAccess(){
  const u=getUser();
  if(!u) return false;
  if(u.paid) return true;
  if(u.trial && Date.now()<u.trial) return true;
  return false;
}

function protect(){
  requireAuth();
  if(!hasAccess()) location.href="pricing.html";
}

async function generateHook(platform, tone, topic){
  const prompt = `
Create 5 viral ${platform} content hooks.
Tone: ${tone}
Topic: ${topic}
Short, punchy, scroll-stopping.
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Authorization":"Bearer "+OPENAI_API_KEY
    },
    body: JSON.stringify({
      model:"gpt-4o-mini",
      messages:[
        {role:"system",content:"You are a viral social media copywriter."},
        {role:"user",content:prompt}
      ]
    })
  });

  const data = await res.json();
  return data.choices[0].message.content;
}
