import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

// 创建 axios 实例
const request = axios.create({
  baseURL: 'http://localhost:3000'
})

// 创建一个全局的 setIsLoggedIn 函数
let globalSetIsLoggedIn: ((value: boolean) => void) | null = null;

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 如果响应中包含新的 token，则更新存储
    console.log(response.headers)
    if (response.headers['token']) {
      localStorage.setItem('token', response.headers['token'])
    }
    return response
  },
  error => {
    if (error.response?.status === 401) {
      // token 失效，清除存储并更新登录状态
      localStorage.removeItem('token')
      if (globalSetIsLoggedIn) {
        globalSetIsLoggedIn(false)
      }
      // 可以添加提示
      alert('登录已过期，请重新登录')
    }
    return Promise.reject(error)
  }
)

function App() {
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 将 setIsLoggedIn 保存到全局变量
  useEffect(() => {
    globalSetIsLoggedIn = setIsLoggedIn
    return () => {
      globalSetIsLoggedIn = null
    }
  }, [])

  // 检查登录状态
  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    // 可以添加定期检查 token 是否过期的逻辑
    const checkToken = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        // 发送一个请求来验证 token
        await request.get('/user/bbb')
      } catch (error) {
        // 错误处理已经在响应拦截器中完成
        console.error('Token validation failed:', error)
      }
    }

    // 每分钟检查一次 token
    const interval = setInterval(checkToken, 60000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const login = async () => {
    try {
      const res = await request.post('/user/login', {
        username: '张三',
        password: '123456'
      })
      localStorage.setItem('token', res.data.token)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('登录失败:', error)
      alert('登录失败，请重试')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  const getData = async () => {
    try {
      setLoading(true)
      const res = await request.get('/user/bbb')
      console.log(res.data)
      alert('获取数据成功：' + res.data)
    } catch (error) {
      console.error('获取数据失败:', error)
      if (error.response?.status !== 401) {  // 401 错误已在拦截器中处理
        alert('获取数据失败，请重试')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div>
          {!isLoggedIn ? (
            <button onClick={login}>登录</button>
          ) : (
            <>
              <button onClick={getData} disabled={loading}>
                {loading ? '加载中...' : '获取数据'}
              </button>
              <button onClick={logout}>退出登录</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default App
