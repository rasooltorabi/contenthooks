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
