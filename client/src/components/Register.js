import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import avatarlogout from '../assets/logoutimg.png'
import style from '../style/username.module.css' 
import { useFormik } from 'formik'
import { validateRegister} from '../helper/validate'
import { Toaster, toast } from 'react-hot-toast'
import convertTobase64 from '../helper/convert'
import {registerUser} from '../helper/helper'

function Password() {
  const nav=useNavigate()
  const [file,setfile]=useState('')
  const formik=useFormik({
    initialValues:{
      Password:'',
      Email:'',
      Username:''
    },
    validate: validateRegister,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async value=>{
      value=await Object.assign(value,{profile:file||''})
      const promiseMsg= registerUser(value)
      await toast.promise(promiseMsg,{
        loading:'Creating...!',
        success:<b>Register succesfully</b>,
        error:<b>Could not register</b>
      })
      promiseMsg.then(
        nav('/')
      ).catch(err=>{
        const error={}
        error.exist=toast.error(err)
      })
    }

  })
  const OnUpload=async e=>{
    const base64=await convertTobase64(e.target.files[0])
    setfile(base64)
  }
  return (
    <div className='containcer mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-srceen'>
              <div className={style.glass} style={{width:"45%" }}>
                <div className='title flex flex-col items-center'>
                  <h4 className='text-5xl font-bold '>Register</h4> 
                  <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                    Happy to join you 
                    </span> 
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                  
                    <div className='profile flex justify-center py-4'>
                         <label htmlFor='profile'>
                          <img className={style.profile_img} src={file||avatarlogout} alt='avatar'/>
                         
                         </label>
                           <input onChange={OnUpload} type='file' id='profile'  name='profile'></input>
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                         <input {...formik.getFieldProps('Email')} className={style.text_box} type='text' placeholder='Email'></input>
                         <input {...formik.getFieldProps('Username')} className={style.text_box} type='text' placeholder='Username'></input>
                         <input {...formik.getFieldProps('Password')} className={style.text_box} type='text' placeholder='Password'></input>
                         <button className={style.btn} type='submit'>Sign in</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-grey-500'>
                            Already register?  <Link className='text-red-400 ml-2' to='/'>Login</Link>
                        </span>
                    </div>
                </form>
                </div>      
        </div>
      
    </div>
  )
}

export default Password
