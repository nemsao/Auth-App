import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import avatarlogout from '../assets/logoutimg.png'
import style from '../style/username.module.css' 
import { useFormik } from 'formik'
import { validateProfile} from '../helper/validate'
import extend from '../style/profile.module.css'
import { Toaster, toast } from 'react-hot-toast'
import convertTobase64 from '../helper/convert'
import  {useAuthstore}  from '../store/store'
import useFetch from '../hooks/fetch.hook'
import {updateUser} from '../helper/helper'
function Profile() {
  const [{ isLoading, apiData, serverError }] = useFetch()
  const usenav=useNavigate()
  const [file,setfile]=useState('')
  const formik=useFormik({
    initialValues:{
      
      Lastname:apiData?.lastName||'',
      Firstname:apiData?.fisrtName||'',
      Mobile:apiData?.mobile||'',
      Address:apiData?.address||'',
      Email:apiData?.email||'',
      Username:apiData?.username||''
    },
    enableReinitialize:true,
    validate: validateProfile ,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async value=>{
      const values={'username':value.Username,'profile':file|| apiData?.profile || '','fisrtName':value.Firstname,'lastName':value.Lastname,'email':value.Email,'address':value.Address,'mobile':value.Mobile}
      
      const promiseupdate=updateUser(values)
      promiseupdate.then(
        
      ).catch(

      )
      toast.promise(promiseupdate,{
        loading:'Updating..!',
        success:'Success update !!!',
        error:'Fail update !'
      })
    }
  })
  function LogoutUser(){
    localStorage.removeItem('token')
    usenav('/')
  }
  const OnUpload=async e=>{
    const base64=await convertTobase64(e.target.files[0])
    setfile(base64)

  }
  return (
    
    <div className='containcer mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-srceen'>
              <div className={`${style.glass} ${extend.glass}`} style={{width:"45%" }}>
                <div className='title flex flex-col items-center'>
                  <h4 className='text-5xl font-bold '>Profile</h4> 
                  <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                   You can update your details
                    </span> 
                </div>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                  
                    <div className='profile flex justify-center py-4'>
                         <label htmlFor='profile'>
                          <img className={`${style.profile_img} ${extend.profile_img}`} src={file||apiData?.profile||avatarlogout} alt='avatar'/>
                         
                         </label>
                           <input onChange={OnUpload} type='file' id='profile'  name='profile'></input>
                    </div>
                    <div className='textbox flex flex-col items-center gap-6'>
                      <div className='name flex w-3/4 gap-10'>
                        <input {...formik.getFieldProps('Firstname')} className={`${style.text_box} ${extend.text_box}`} type='text' placeholder='First name'></input>
                        <input {...formik.getFieldProps('Lastname')} className={style.text_box} type='text' placeholder='Last name'></input>
                      </div>
                         
                      <div className='name flex w-3/4 gap-10'>
                        <input {...formik.getFieldProps('Mobile')} className={`${style.text_box} ${extend.text_box}`} type='text' placeholder='Mobile number'></input>
                        <input {...formik.getFieldProps('Email')} className={`${style.text_box} ${extend.text_box}`} type='text' placeholder='Email'></input>
                      </div>
                         <input {...formik.getFieldProps('Username')} className={`${style.text_box} ${extend.text_box}`} type='text' placeholder='Username'></input>
                         <input {...formik.getFieldProps('Address')} className={`${style.text_box} ${extend.text_box}`} type='text' placeholder='Address'></input>
                         <button className={style.btn} type='submit'>Update</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-grey-500'>
                           Come back later?  <Link className='text-red-400 ml-2' onClick={LogoutUser} to='/'>Logout</Link>
                        </span>
                    </div>
                </form>
                </div>      
        </div>
      
    </div>
  )
}

export default Profile
