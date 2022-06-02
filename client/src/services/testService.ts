import axios from 'axios'

export const getTestsService = () => {
    console.log('vao')
    return axios.get('http://localhost:5000/test', {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}

export const getTestsOfStudentService = () => {
    return axios.get('http://localhost:5000/test/student-test', {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}

export const getAllGradeWithTestId = (id: any) => {
    return axios.get(`http://localhost:5000/test/${id}`, {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}

export const studentDoTest = (id: any, data: any) => {
    return axios.post(`http://localhost:5000/test/student-test/${id}`, data, {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}

export const addTestService = (data: any) => {
    return axios.post('http://localhost:5000/test', data, {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}

export const createGradeService = (data: any) => {
    console.log(data)
    return axios.post('http://localhost:5000/test/create-grade', data, {
        headers: {
            access_token: localStorage.getItem('token') as any
        }
    })
}