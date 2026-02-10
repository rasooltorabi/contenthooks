const USDT_ADDRESS="TCc2WRafYtJS2iJPjCQqWLFSFGSEUo2xoX";
const EMAIL="rasooltorabi81@gmail.com";

function startTrial(){
const until=Date.now()+24*60*60*1000;
localStorage.setItem("trial_until",until);
location.href="generator.html";
}

function checkAccess(){
const trial=localStorage.getItem("trial_until");
const paid=localStorage.getItem("paid");
if(paid==="true") return true;
if(trial && Date.now()<trial) return true;
location.href="payment.html";
}

function buy(plan,price){
localStorage.setItem("plan",plan);
localStorage.setItem("price",price);
location.href="payment.html";
}
const USDT_ADDRESS = "TCc2WRafYtJS2iJPjCQqWLFSFGSEUo2xoX";
const SUPPORT_EMAIL = "rasooltorabi81@gmail.com";

function saveEmail(){
  const email=document.getElementById("email").value;
  if(!email.includes("@")){
    alert("Enter valid Gmail");
    return;
  }
  localStorage.setItem("user_email",email);
  location.href="trial.html";
}

function startTrial(){
  const until=Date.now()+24*60*60*1000;
  localStorage.setItem("trial_until",until);
  location.href="generator.html";
}

function hasAccess(){
  const paid=localStorage.getItem("paid")==="true";
  const trial=localStorage.getItem("trial_until");
  if(paid) return true;
  if(trial && Date.now()<trial) return true;
  return false;
}

function guard(){
  if(!hasAccess()){
    location.href="payment.html";
  }
}

function choosePlan(plan,price){
  localStorage.setItem("plan",plan);
  localStorage.setItem("price",price);
  location.href="confirm.html";
}

function unlock(){
  localStorage.setItem("paid","true");
  location.href="success.html";
}

function generateHook(){
  const hooks=[
    "Nobody talks about this… but it changes everything.",
    "If you’re still doing this, you’re losing views.",
    "This mistake kills your engagement instantly.",
    "99% of creators don’t know this trick.",
    "Stop scrolling — this will save you hours."
  ];
  const out=document.getElementById("output");
  out.innerText=hooks[Math.floor(Math.random()*hooks.length)];
}
function protect(){
const paid=localStorage.getItem("paid");
const trial=localStorage.getItem("trial_until");

if(paid==="true") return;
if(trial && Date.now()<trial) return;

location.href="pricing.html";
}
function getUser(){
  return JSON.parse(localStorage.getItem("user"));
}

function requireAuth(){
  const user=getUser();
  if(!user) location.href="login.html";
}

function hasAccess(){
  const user=getUser();
  if(!user) return false;
  if(user.paid) return true;
  if(Date.now()<user.trial) return true;
  return false;
}
