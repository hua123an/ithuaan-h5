import {dailyWords, epicGame, todayInHistory, worldNews, zhiHuDailyNews} from "@/utils/home/homeUtils.js";
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
        url : "/Api/ScLsDay",
        data : {
            month,
            day
        }
    })
}
export const getWorldNews = (q) => {
    return worldNews({
        url : '/v2/everything',
        data : {
            q
        }

    })
}
export const getEpic = (key) => {
    return epicGame({
        url : '/api/epicgame',
        method : 'get',
        data : {
            key
        }
    })
}