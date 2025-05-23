import React, { useEffect } from 'react';
import './App.css';
import axios, { AxiosRequestConfig } from 'axios';

interface PendingTask {
  resolve: Function
  config: AxiosRequestConfig
}
let refrshing = false
const done: PendingTask[] = []

function App() {
  const [userPage, setuserPage] = React.useState();
  const [bbbPage, setubbbPage] = React.useState();

  axios.interceptors.request.use((config) => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      config.headers.authorization = `Bearer ${access_token}`
    }
    return config
  })

  axios.interceptors.response.use((response) => {
    return response
  }, async (error) => {
    let { data, config } = error.response;

    if (refrshing) {
      return new Promise((resolve) => {
        done.push({ resolve, config })
      })
    }
    if (data.statusCode === 401 && !config.url.includes('/user/refresh')) {
      refrshing = true
      const res = await refreshToken();
      refrshing = false
      if (res.status === 200) {
        done.forEach(({ config, resolve }) => {
          resolve(axios(config))
        })
        return axios(config);
      } else {
        alert('登录过期，请重新登录');
        return Promise.reject(res.data)
      }
    } else {
      return error.response;
    }

  }
  )

  async function refreshToken() {
    const res = await axios.get('http://localhost:3000/user/refresh', {
      params: {
        refreshToken: localStorage.getItem('refresh_token')
      }
    });
    localStorage.setItem('access_token', res.data.accessToken || '');
    localStorage.setItem('refresh_token', res.data.refreshToken || '');
    return res;
  }

  const login = async () => {
    const { data } = await axios.post('http://localhost:3000/user/login', {
      username: '张三',
      password: '123456'
    })
    console.log('asdasadasd', data)
    localStorage.setItem('access_token', data.accessToken)
    localStorage.setItem('refresh_token', data.refreshToken)
  }
  const query = async () => {
    const data = localStorage.getItem('access_token')
    if (!data || data == '' || data == 'undefined') {
      await login()
    }
    await [
      axios.get('http://localhost:3000/user/bbb'),
      axios.get('http://localhost:3000/user/bbb'),
      axios.get('http://localhost:3000/user/bbb')
    ];
    // const { data: datbbb } = await axios.get('http://localhost:3000/user/bbb')
    // const { data: dataaa } = await axios.get('http://localhost:3000/user/aaa')
    // console.log(dataaa)
    // setuserPage(dataaa)
    // setubbbPage(datbbb)
  }
  useEffect(() => {
    query()
  }, [])

  return (
    <div className="App">
      <div>{userPage}asda</div>
      <div>{bbbPage}asdada</div>
    </div>
  );
}

export default App;
