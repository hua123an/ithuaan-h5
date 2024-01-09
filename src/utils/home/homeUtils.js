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