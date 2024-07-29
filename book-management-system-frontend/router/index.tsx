import {useRoutes} from 'react-router-dom'
import Login from '../src/Login'
import Register from '../src/Register'
import React from 'react'

const routes = [{
    path:'/login',
    element: <Login/>
},{
    path:'/register',
    element: <Register/>
}]

export default routes