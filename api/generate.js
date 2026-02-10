import OpenAI from "openai";

const openai=new OpenAI({apiKey:process.env.OPENAI_KEY});

export default async function(req,res){
const {platform,tone}=JSON.parse(req.body);

const prompt=`Create a viral ${tone} hook for ${platform}`;

const r=await openai.chat.completions.create({
model:"gpt-4o-mini",
messages:[{role:"user",content:prompt}]
});

res.json({text:r.choices[0].message.content});
}
