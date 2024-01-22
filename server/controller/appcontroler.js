const UserModel=require('../model/User.model')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const otpgen=require('otp-generator')
async function registerU(req,res){

    try {
        const { username, password, profile, email } = req.body; 
       

        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }).then((user)=>{
                
                if(user) reject({ error : "Please use unique username"});

                resolve();
            }).catch(err=>{
                if(err) reject(new Error(err))
            })
        });

        // check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }).then(( email)=>{
               
                if(email) reject({ error : "Please use unique Email"});

                resolve();
            }).catch(err=>{
                 if(err) reject(new Error(err+"email error"))
            })
        });


        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                                .catch(error => res.status(501).send({error}))

                        }).catch(error => {
                            return res.status(502).send({
                                error : "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                console.log(error.error)
                return res.status(500).send( error )
            })


    } catch (error) {
        return res.status(500).send(error);
    }
    

}

/**middleware varify username middleware */
async function authUser(req,res,next){
   try{
     const {username}=req.method=='GET'?req.query:req.body;
     let exist=await UserModel.findOne({username})
     if(!exist){
        return res.status(404).send({err:"Authentication Error"})
     }
        next()
     
   
    }catch(err){
    return res.status(404).send({err:"Authentication Error"})
   }
} 

async function login(req,res,next){
   const {username,password}=req.body
   try{
    UserModel.findOne({username}).then((data)=>{


       bcrypt.compare(password,data.password)
       .then((password)=>{if(password==false){
        res.status(501).send({'err':'Wrong pasword'})
       }else{
        //create a token
               const token=jwt.sign({
                UserId:data._id,
                UserName:data.username
               },'secret',{expiresIn:'24h'})
            return res.send({
                'message':'succesful login',
                'status':200,
                'username':data.username,
                token
               })
       }}).catch((err)=>{res.send({err:'Wrong password'})})
    }).catch((err)=>{
        res.status(404).send({err:err})
    })
   }
   catch(err){
      console.log(err)
   }
}
async function getUser(req,res,next){
    const {username}=req.params;
    try{
        if(!username){return res.send({err:'Invalid Username'})}
        UserModel.findOne({username})
        .then(data=>{
          if(data){
            const { username, email, profile, _id ,fisrtName,lastName,mobile,address} = data._doc;
            const modifiedResponse = {
                username,email,profile
                ,_id,lastName
                ,fisrtName,mobile,address
              };
            return res.status(201).json(modifiedResponse)}
          else{
            return res.status(501).send({err:'There is no such Username'})
        }})
        .catch((err)=>{return res.send({err:'Invalid Username'})})
     }
    catch(err){
        return res.send({err})
    }
}
async function updateUser(req,res,next){
    try{
        const {UserId}=req.user
        const newdata=req.body
       
        UserModel.updateOne({_id:UserId},newdata)
        .then((updatedata)=>{return res.status(201).send({message:"Succesful update"})})
        .catch((err)=>{return res.status(404).send({err:'Fail to update data'})})
    }catch(err){
        return res.status(404).send({err})
    }
    
}
async function genOTP(req,res,next){
    req.app.locals.OTP=await otpgen.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    res.status(201).send({code:req.app.locals.OTP})

}
async function verifyOTP(req,res){
   const {code}=req.query
    if(parseInt(req.app.locals.OTP)==code){
        req.app.locals.OTP=null//reset OTP values
        req.app.locals.resetSession=true // start the session for reset passowrd
        return res.status(201).send({mess:"verify sucessfull"})

    }
    return res.status(401).send({error:"Invalid OTP"})
}

async function createResetSession(req,res,next){
    if(req.app.locals.resetSession){
        req.app.locals.resetSession=null;
        return res.status(201).send({message:"access granded"})
    }
    return res.status(400).send({message:"Session expire"})
  
}
async function resetPassword(req,res,next){
   
    try{
        if(!req.app.locals.resetSession){
            return res.status(404).send({err:"Session expried "})
        }
        const {username,password}=req.body;
        try{
          UserModel.findOne({username}).then((data)=>{
            bcrypt.hash(password,10)
            .then(hashed=>{
                UserModel.updateOne({_id:data._id},{
                    password:hashed
                }).then(()=>{
                    return res.status(201).send({message:"success reset password"})
                })
            })
            .catch(err=>{
                return res.status(500).send({err:"fail password "})
            })
            data.password=password
          })
        }
        catch(err){
            return res.status(404).send({err:"Can find username "})
        }
    }catch(err){
        return res.status(500).send({err})
    }
}


module.exports={registerU,login,getUser,updateUser,genOTP,verifyOTP,createResetSession,resetPassword, authUser}