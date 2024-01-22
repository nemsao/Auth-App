import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import style from '../style/username.module.css' 
import { useFormik } from 'formik'
import {validateResetPassword} from '../helper/validate'
import { Toaster,toast } from 'react-hot-toast'
import  {useAuthstore}  from '../store/store'
import {verifyPassword} from '../helper/helper'

function Reset() {

  const {username}= useAuthstore(state=>state.auth)
  const nav=useNavigate()
  const formik=useFormik({
    initialValues:{
      Password:'',
      confirmPassword:''
    },
    validate:validateResetPassword ,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:value=>{
      const promiseReset= verifyPassword({username:username,password:value.Password})
      toast.promise(promiseReset,{
        loading:'Updating password..!',
        success:'Success update !!!',
        error:'Fail update !'
      })
      promiseReset.then(nav('/password'))
    }
  })
  return (
    <div className='containcer mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-srceen'>
              <div className={style.glass}>
                <div className='title flex flex-col items-center'>
                  <h4 className='text-5xl font-bold '>Hello </h4> 
                  <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                    Enter new password </span> 
                </div>
                <form className='pt-20' onSubmit={formik.handleSubmit}>
                    
                    <div className='textbox flex flex-col items-center gap-6'>
                         <input {...formik.getFieldProps('Password')} className={style.text_box} type='text' placeholder='New Password'></input>
                         <input {...formik.getFieldProps('confirmPassword')} className={style.text_box} type='text' placeholder='Confirm Password'></input>
                         <button className={style.btn} type='submit'>Sign in</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-grey-500'>
                            Forgot Reset?  <Link className='text-red-400' to='/recovery'>Recover Now</Link>
                        </span>
                    </div>
                </form>
                </div>      
        </div>
      
    </div>
  )
}

export default Reset
