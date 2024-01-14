import axios from "axios"
// dailyWords
export const dailyWords = axios.create({
    baseURL : "https://api.xygeng.cn",
    headers : {
        "Content-Type" : "application/json"
    }
})
//zhihu daily news
export const zhiHuDailyNews = axios.create({
    baseURL : "https://v.api.aa1.cn",
    headers : {
        "Content-Type" : "application/json"
    }
})
//today in history
export const todayInHistory = axios.create({
    baseURL : "http://www.wudada.online",
    headers : {
        "Content-Type" : "application/json"
    }
})
export const worldNews = axios.create({
    baseURL : 'https://newsapi.org',
    headers : {
        'Accept' : 'application/json, text/plain, */*',
        'Authorization': '32467bdc0580474891c0bf4859aab561',
        'Content-Type' : 'application/json'
    }
})
export const epicGame = axios.create({
    baseURL : 'https://www.52api.cn',
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded;charset:utf-8',
        withCredentials : true
    }
})