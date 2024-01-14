import {accessToken, instance} from "@/utils/tools/toolsUtils.js";
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
export const getAccessToken = ({client_id , client_secret}) => {
    return accessToken({
        url : '/oauth/2.0/token?grant_type=client_credentials',
        method : 'POST',
        data : {
            client_id,
            client_secret
        }
    })

}