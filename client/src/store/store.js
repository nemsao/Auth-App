import  create from 'zustand'

export const useAuthstore= create((set)=>({
    auth:{
        username:'',
        active:false
    },
    setUsername:(name)=>set((state)=>({auth:{
       ...state.auth,username:name
    }}))
}))