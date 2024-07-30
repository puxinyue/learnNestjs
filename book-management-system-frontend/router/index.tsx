import { useRoutes } from 'react-router-dom'
import Login from '../src/Login'
import Register from '../src/Register'
import BookManage from '../src/BookManage'

import React from 'react'

const routes = [{
    path: '/login',
    element: <Login />
}, {
    path: '/register',
    element: <Register />
}, {
    path: '/',
    element: <BookManage />
}]

export default routes