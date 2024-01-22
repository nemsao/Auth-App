import axios from "axios";
import { useEffect, useState } from "react";
import {getusername} from '../helper/helper'
//.env
axios.defaults.baseURL="http://localhost:8080"

export default  function useFetch(query){
  const [getdata,setdata]= useState({isLoading:false,apiData:undefined,status:null,serverError:null})
  useEffect(()=>{
    
     const fetchdata=async ()=>{
        try{
            const {UserName}= !query ? await getusername():''
            
            setdata(a=>({ ...a,isLoading:true}))
            const {data,status} =!query ? await axios.get(`/api/username/${UserName}`):await axios.get(`/api${query}`)
            
            if(status===201){
                setdata(a=>({...a,isLoading:false}))
                setdata(a=>({...a,apiData:data,status:status}))
                
            }
        }catch(err){
            setdata(a=>({...a,isLoading:false,serverError:err }))
        }
     }
     fetchdata()
  },[query])
  return [getdata,setdata]
}