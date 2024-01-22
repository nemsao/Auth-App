import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import avatarlogout from '../assets/logoutimg.png'
import style from '../style/username.module.css' 
import { useFormik } from 'formik'
import {validatePassword} from '../helper/validate'
import { Toaster ,toast} from 'react-hot-toast'
import useFetch from '../hooks/fetch.hook'
import  {useAuthstore}  from '../store/store'
import {verifyPassword} from '../helper/helper'
/**a custom hook for password validate */
function Password() {
  const use_nav=useNavigate()
  const {username}= useAuthstore(state=>state.auth)
  const [{ isLoading, apiData, serverError }] =  useFetch(`/username/${username}`)
    
  
  const formik=useFormik({
    initialValues:{Password:''},
    validate:validatePassword,
    validateOnBlur:false,
    validateOnChange:false,
      onSubmit:async value=>{
        const promiseLogin= verifyPassword({username:username,password:value.Password})
        promiseLogin.then(res=>
          {
            const {token}=res.data
            localStorage.setItem('token',token)
            use_nav('/profile')
          }
        ).catch(err=>{
          err.exist=toast.error('password not match...!')
        
        }
        )
      }
  })
  return (
    <div className='containcer mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-srceen'>
              <div className={style.glass}>
                <div className='title flex flex-col items-center'>
                  <h4 className='text-5xl font-bold '>Hello {apiData?.firstName||apiData?.username} </h4> 
                  <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                    Please enter your pasword </span> 
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <img className={style.profile_img} src={apiData?.profile||avatarlogout} alt='avatar'/>

                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                         <input {...formik.getFieldProps('Password')} className={style.text_box} type='password' placeholder='Password'></input>
                         <button className={style.btn} type='submit'>Sign in</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-grey-500'>
                            Forgot password?  <Link className='text-red-400' to='/recovery'>Recover Now</Link>
                        </span>
                    </div>
                </form>
                </div>      
        </div>
      
    </div>
  )
}

export default Password
