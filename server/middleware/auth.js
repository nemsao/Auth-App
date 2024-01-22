const jwt=require('jsonwebtoken')
//.env
async function auth(req,res,next){
try{
    const token=req.headers.authorization
    //.env
    console.log(token)
    const decoded=await jwt.verify(token,'secret')
    
    req.user= decoded
    next()
}
catch(err){
    return res.status(500).send({err})
}
}
async function localvariable(req,res,next){
   req.app.locals={
    OTP:null,
    resetSession:false
   }
   next()
    }


module.exports={auth,localvariable}