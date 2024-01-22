import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import style from '../style/username.module.css' 
import { useFormik } from 'formik'
import {useNavigate} from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import {useAuthstore} from '../store/store'
import {generateOPT,verifyOPT} from '../helper/helper'

function Recovery() {
  const nav=useNavigate()
  const {username}=useAuthstore(state=>state.auth)
  const [OTP,setOTP]=useState()
  useEffect(()=>{
    generateOPT(username).then((status)=>{
     
      if(status===201){ 
        return toast.success('Check your email to see OTP ')
      }else return toast.error('Fail to send OTP')
    } )

  },[username])
  
  async function onsubmit(e){
    e.preventDefault();
    
    await verifyOPT({username,code:OTP})
    .then(()=>{
      toast.success('Verify OTP successful')  ;
      setTimeout(()=>nav('/reset'),1500)})
      .catch((err)=>{
        return toast.error(err.error)
      
    })
    
    
  }
  async function resendOTP(){
   const resend= generateOPT(username)
   toast.promise(resend,{
    loading:"Sending OTP to your Email",
    success:'Success resend OTP',
    error:'FAIL TO SEND OTP'
   })

  }
  return (
    <div className='containcer mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='flex justify-center items-center h-srceen'>
              <div className={style.glass}>
                <div className='title flex flex-col items-center'>
                  <h4 className='text-5xl font-bold '>Recovery </h4> 
                  <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                    Enter OTP to recover </span> 
                </div>
                <form className='pt-20' onSubmit={onsubmit} >
                    
                    <div className='textbox flex flex-col items-center gap-6'>
                       <div className='input text-center' >
                       <span className='py-4 text-sm text-left text-grey-500'>
                          Enter 6 digit to send to your Email address
                         </span>
                         <input  className={style.text_box} onChange={e=>{setOTP(e.target.value)}} type='text' placeholder='OTP'></input>
                         <button className={style.btn} type='submit'>Recover</button>
                       </div>
                        
                    </div>
                  
                </form>
                  <div className='text-center py-4'>
                        <span className='text-grey-500'>
                            Can get OPT?  <button className='text-red-400' onClick={resendOTP} to='/recovery'>Resend OTP</button>
                        </span>
                    </div>
                    </div>      
        </div>
      
    </div>
  )
}

export default Recovery
