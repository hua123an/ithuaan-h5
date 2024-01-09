import {dailyWords, todayInHistory, zhiHuDailyNews} from "@/utils/home/homeUtils.js";
export const getDailyWords = () => {
    return dailyWords({
        url : "/openapi/one"
    });
}
export const getZhiHuDailyNews = () => {
    return zhiHuDailyNews({
        url : "/api/zhihu-news/index.php",
        data : {
            "aa1" : "xiarou"
        }
    })
}
export const getTodayInHistory = ({month , day}) => {
    return todayInHistory({
        baseURL : "/Api/ScLsDay",
        data : {
            month,
            day
        }
    })
}