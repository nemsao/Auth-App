/** validate username */
import Toaster, { toast }  from "react-hot-toast";
import Password from "../components/Register";
import {authenticate} from "./helper"
/** validate user login */
export async function validateUsername(values){
   const error=verifyUsername({},values)
   const {status}=await authenticate(values.Username)
   
   if(status!==200){
     error.exist=toast.error('User does not exist...!')
     
   }
   
   return error
}

/**  validate password*/
export async function validatePassword(values){
    const error= verifyPassword({},values);
    return error
}
/**validate reset pasword */
export async function validateResetPassword(values){
    const error=verifyPassword({},values);
    if(values.Password!==values.confirmPassword){error.exist=Toaster.error('Passwords don`t match')}
    return error
}
/**vlidate register password */
export async function validateRegister(values){
    const error=verifyUsername({},values);
        emailVeryfy({},values);
        verifyPassword({},values)
    return error
}
/**validate profile update */
export async function validateProfile(values){
    const error=verifyUsername({},values);
        emailVeryfy({},values);
        
    return error
}

/** validate password */
function verifyPassword(error={},values){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.Password){
        error.Password=Toaster.error('Password is required...!')
    }else if(values.Password.includes(" ")){
        error.Password=Toaster.error('Invalid Password...!')
    }else if(values.Password.length<=4){
        error.Password=Toaster.error('Your password must longer than 4 characters')
    }else if(specialChars.test(values.Password)){
        error.Password=Toaster.error('Your password has in valid character')
    }
   return error
}
/** validate err log in */
function verifyUsername(error={},values){
    if(!values.Username){
        error.Username=Toaster.error('Username is required...!')
    }else if(values.Username.includes(" ")){
        error.Username=Toaster.error('Invalid username...!')
    }
   return error
}
function emailVeryfy(error={},values){
    if(!values.Email){
        error.Email=Toaster.error('Esername is required...!')
    }else if(values.Email.includes(" ")){
        error.Email=Toaster.error('Invalid Email...!')
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)){
        error.Email=Toaster.error('Invalid Email...!')
    }
   return error
}