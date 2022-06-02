import axios from 'axios'

export const loginService = (payload: any) => {
    return axios.post('http://localhost:5000/auth/login', payload)
}

export const getUserService = () => {
    return axios.get('http://localhost:5000/auth', {
        headers: {
            access_token: localStorage.getItem('token') as any,
        }
    })
}