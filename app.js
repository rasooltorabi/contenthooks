const API_URL = "http://localhost:3000";

function getUser(){
  return JSON.parse(localStorage.getItem("user"));
}

function setUser(u){
  localStorage.setItem("user",JSON.stringify(u));
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

async function generateHook(platform,tone,topic){
  const u = getUser();

  const res = await fetch(API_URL+"/generate",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      email:u.email,
      paid:u.paid,
      platform,
      tone,
      topic
    })
  });

  const data = await res.json();
  if(data.error) throw data.error;
  return data.result;
}
