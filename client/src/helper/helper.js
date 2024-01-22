/**Make api request */
import axios from 'axios'
import jwtdecode from 'jwt-decode'
//.env
axios.defaults.baseURL="http://localhost:8080"
export async function authenticate(username){
    try{
        return await axios.post('/api/authenticate',{username})
    }catch(err){
        return {err:"Username doesn't exist"}
    }
}
export async function getusername(){
  const token =localStorage.getItem('token')
  if(!token){return Promise.reject('there is no token')}
  const decode=jwtdecode(token)
 return decode
}
export async function getUser(username){
    try{
        const {data}= await axios.get(`/api/username/${username}`);
        return {data}
    }catch(err){
        return {error:"Password doesn't match"}
    }
}
export async function registerUser(credencials){
    let {Username,Email,Password,profile}=credencials
         const credencial={
          username:Username ,
          email:Email,
          profile:credencials.profile,
          password:Password
     }
    try{   
        const {data:{msg},status}= await axios.post(`/api/register`,credencial); 
        
        if(status===201){
             await axios.post('api/registerMail',{username:Username ,email:Email,subject:"Wellcome new user"})
        
      }
        return Promise.resolve(msg)
    }catch(error){
      console.log({error})
        return Promise.reject({error})
    }
}
/**Login fuction */
export async function verifyPassword({username,password}){
  try{
    if(username){
      
      const {data}=  await axios.post('api/login',{username,password})
      if(data.err){
        return Promise.reject(data.err)
      }
      return Promise.resolve({data})
    }
  }catch(err){
    return Promise.reject({err:"Couldn't verify"})
  }
}
export async function updateUser(response){
    try{
        const token=localStorage.getItem('token')
        const data=await axios.put('api/updateuser',response,{headers:{"authorization":`${token}` }})

     
        return Promise.resolve({data})
      
    }catch(err){
      return Promise.reject({err:"Couldn't update profile"})
    }
  }

export async function generateOPT(username){
    try{
        
        const {status}=await axios.get('api/generateOPT',{params:{username:username}})

        if(status===201){

           let {data:{email}}= await axios.get(`/api/username/${username}`)

           let text=`Verify and recover your password  . Enter this OTP into your verify OTP `

           await axios.post('api/registerMail',{username,text,email:email,subject:"Password OTP"})
        }
        return Promise.resolve(status)
      
    }catch({error}){
     
      return Promise.reject({error})
    }
  }
  /**Verify OTP */
  export async function verifyOPT({username,code}){
    try{
        
        const {data,status}=await axios.get('api/verifyOPT',{params: {username,code}})
        .catch((err)=>{
          const {error}=err.response.data
          return Promise.reject(error)}
           )

        
        return {data,status}
      
    }catch(error){
      
      return Promise.reject({error})
    }
  }
  export async function resetPassword({username,password}){
    try{
        
        const {data,status}=await axios.put('api/resetpassword', {username,password})

        
        return Promise.resolve({data,status})
      
    }catch(err){
      return Promise.reject({err})
    }
  }