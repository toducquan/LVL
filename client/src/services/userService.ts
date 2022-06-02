import axios from 'axios'

export const getTeachersService = () => {
    return axios.get('http://localhost:5000/user', {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}

export const getStudentInClassService = (id: any) => {
    return axios.get(`http://localhost:5000/test/class/${id}`, {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}

export const addTeachersService = (data: any) => {
    return axios.post('http://localhost:5000/user', data, {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}