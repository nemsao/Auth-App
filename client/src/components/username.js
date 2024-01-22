import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import avatarlogout from '../assets/logoutimg.png'
import style from '../style/username.module.css' 
import { useFormik } from 'formik'
import {validateUsername} from '../helper/validate'
import { Toaster } from 'react-hot-toast'
import  {useAuthstore}  from '../store/store'
function Username() {

  const usenav=useNavigate()
  
  const setUsername= useAuthstore(state=>state.setUsername)
  
  const formik=useFormik({
    initialValues:{Username:''},
    validate:validateUsername ,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: value=>{
      setUsername(value.Username)
      usenav('/password')
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
                    exxplore with us </span> 
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-4'>
                        <img className={style.profile_img} src={avatarlogout} alt='avatar'/>

                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                         <input {...formik.getFieldProps('Username')} className={style.text_box} type='text' placeholder='username'></input>
                         <button className={style.btn} type='submit'>Lets go</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-grey-500'>
                            Not a member  <Link className='text-red-400' to='/register'>Register Now</Link>
                        </span>
                    </div>
                </form>
                </div>      
        </div>
      
    </div>
  )
}

export default Username
