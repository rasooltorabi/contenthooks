export default async function(req,res){
const {email}=JSON.parse(req.body);
const trial=Date.now()+86400000;

res.status(200).json({
email,
trial,
paid:false
});
}
