const mongoose=require('mongoose');
//.env
async function connection(){
   try{
    await mongoose.connect('mongodb://127.0.0.1/Dev', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connect sucessfully")
   }catch(err){
     console.log("connect error",err);
   }

}
module.exports= {connection};