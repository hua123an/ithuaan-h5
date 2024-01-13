import axios from 'axios'
export const instance = axios.create({
    baseURL : 'https://v.api.aa1.cn',
    headers : {
        'Content-Type' : 'application/json'
    }
})