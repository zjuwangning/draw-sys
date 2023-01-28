/**
 * Created by witkiky on 2017/2/26.
 */
// 后台双机热备
const Host1 = "172.0.0.1:3000"
const Host2 = "172.0.0.1:3000"
let host = Host1

// 文件地址
export const file_server_url = "http://192.168.0.241/"

// 视频流服务器地址
const VUE_APP_API_ROOT = 'http://172.16.3.115:8080'
const VUE_APP_WS_HOST_ROOT = '172.16.3.115:8080'

export const getRootUrl = () => "http://"+host

export const getHost = () => host

// 切换后台地址
export const switchHost = post_host => {
    if(post_host === host){
        host = host === Host1 ? Host2 : Host1
        return true
    }
    return false
}
