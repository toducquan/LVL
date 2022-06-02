import axios from 'axios'

export const getAllClassService = () => {
    return axios.get('http://localhost:5000/class', {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}

export const addClassService = (data: any) => {
    return axios.post('http://localhost:5000/class', data, {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}

export const getAllClassOfTeacher = () => {
    return axios.get('http://localhost:5000/class/teach', {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}