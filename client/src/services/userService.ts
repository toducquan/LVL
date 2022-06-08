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

export const editUserService = (id: any, data: any) => {
    console.log('vao: ', data)
    return axios.put(`http://localhost:5000/user/${id}`, data, {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    }) 
}

export const deleteUserService = (id: any) => {
    return axios.delete(`http://localhost:5000/user/${id}`, {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    }) 
}