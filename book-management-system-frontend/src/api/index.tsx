import axios from 'axios'


const requst = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 3000
})

export const login = async (data: any) => {
    return await requst.post('/user/login', { ...data })
}

export const register = async (data: any) => {
    return await requst.post('/user/register', { ...data })
}
export const getList = async (data: any) => {
    return await requst.get('/book/list', { params: data })
}

export const bookCreate = async (data: any) => {
    return await requst.post('/book/create', { ...data })
}

export const bookDelete = async (id: string) => {
    return await requst.delete(`/book/delete/${id}`)
}

export const bookUpdate = async (data: any) => {
    return await requst.put(`/book/update`,{...data})
}