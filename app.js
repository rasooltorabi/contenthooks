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
