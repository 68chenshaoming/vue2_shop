import axios from 'axios'
const requests = axios.create({
    baseURL: "http://127.0.0.1:8888/api/private/v1",
    timeout: 5000,
})
requests.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})





export default requests