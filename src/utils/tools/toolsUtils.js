import axios from 'axios'
export const instance = axios.create({
    baseURL : 'https://v.api.aa1.cn',
    headers : {
        'Content-Type' : 'application/json'
    }
})
export const accessToken = axios.create({
    baseURL : 'https://aip.baidubce.com',
    headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Methods": "GET,POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
}

})