import React from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom"
/**im port all components */
import Username from "./components/username";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import {Authori,Authoripassword} from './middleware/auth'
/** root router */
const router=createBrowserRouter([
    {
        path:'/',
        element:<Username></Username>,
        
    },
    {
        path:'register',
        element:<Register></Register>
    },
    {
        path:'/password',
        element:<Password/>,
        
    },
    {
        path:'/profile',
        element:<Profile/>,
        
    },
    {
        path:'/recovery',
        element:<Recovery></Recovery>,
        
    },
    {
        path:'/reset',
        element:<Reset></Reset>,
        
    },
    {
        path:'*',
        element:<PageNotFound></PageNotFound>,
        
    },
])

export default function App(){
    return(
        <main>
           
            <RouterProvider router={router}>

            </RouterProvider>
        </main>
    )
}