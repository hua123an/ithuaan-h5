import {instance} from "@/utils/tools/toolsUtils.js";

export const getInstance = ({msg , type}) => {
    return instance({
        url : '/api/api-fanyi-yd/index.php',
        method : "GET",
        params : {
            msg,
            type
        }
    })
}