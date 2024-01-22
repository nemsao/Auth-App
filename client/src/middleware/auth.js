import {Navigate} from 'react-router-dom'
import {useAuthstore} from '../store/store'
/** alow user to   /profile route with token */
export const Authori=( {children} )=>{

   
    const token=localStorage.getItem('token')
    if(!token){
        return <Navigate to='/' replace={true} ></Navigate>
    }
    return children
}
/** alow user to   /password route with username */
export const Authoripassword=( {children} )=>{

   
    const {username}= useAuthstore(state=>state.auth)
    if(!username){
        return <Navigate to='/' replace={true} ></Navigate>
    }
    return children
}