/**
 * Created by dell on 2017/1/13.
 */
import {json_decode, isEmpty, inArray} from '../util/cmn'

const Cache = {
    // 基础函数
    set:function (key, value) {
        localStorage.setItem(key, value);
    },
    get:function (key) {
        return localStorage.getItem(key) ? localStorage.getItem(key) : false;
    },
    remove:function(key) {
        localStorage.removeItem(key);
    },

    // 用户相关
    saveUserInfo(user_info) {
        localStorage.setItem("user", JSON.stringify(user_info));
    },
    getUserInfo() {
        return json_decode(localStorage.getItem("user"));
    },
    removeUserInfo(){
        localStorage.removeItem("user");
    },
    getUserName() {
        let user_info = json_decode(localStorage.getItem("user"));
        return user_info && user_info.name ? user_info.name : false;
    },
    saveUserAuthority(authority) {
        localStorage.setItem("authority", JSON.stringify(authority));
    },
    getUserAuthority() {
        return json_decode(localStorage.getItem("authority"));
    },









    /*---------系统配置相关的处理--------*/
    saveRouteUpdateTime(value){  //保存路由最后的更新时间
        localStorage.setItem("route_update_time", JSON.stringify(value));
    },
    getRouteUpdateTime(){   //获取路由最后的更新时间
        return json_decode(localStorage.getItem("route_update_time"));
    },
    /** ---------用户相关的处理-------- **/
    //获取user_id, -1标识没有user_id
    getUid:function () {
        let user_info = json_decode(localStorage.getItem("user"));
        return user_info && user_info.key ? user_info.key : -1;
    },
    //获取用户权限
    getUserAuth:function () {
        let user_info = json_decode(localStorage.getItem("user"));
        return user_info && user_info.authority ? user_info.authority : false;
    },
    //获取用户的真实姓名
    getDoctorname:function () {
        let user_info = json_decode(localStorage.getItem("user"));
        return user_info && user_info.doctor_name ? user_info.doctor_name : false;
    },
    hasAuth: key => {
        const user_info = json_decode(localStorage.getItem("user"))
        const authorizationList = user_info && user_info.authority ? user_info.authority : []
        return inArray(key, authorizationList)
    },
    /** ---------用户相关的处理结束-------- **/
    /*------诊室相关处理------*/
    //获取诊室列表
    getRoomInfo:function () {
        let roomInfo = json_decode(localStorage.getItem('roomInfo')) ;
        return isEmpty(roomInfo) ? '' : roomInfo;
    },
    //获取某个医生的诊室名
    getDoctorRoom:function (UID) {
        let roomInfo = json_decode(localStorage.getItem('roomInfo')) ;
        if (isEmpty(roomInfo)) return '尚未设置当日排班';
        else{
            for (let i in roomInfo){
                if (roomInfo[i].doctorId == UID) return roomInfo[i].roomTitle;
            }
            return '今日无门诊'
        }
    },
    //获取某个医生的诊室ID号
    getRoomId:function (UID) {
        let roomInfo = json_decode(localStorage.getItem('roomInfo')) ;
        if (isEmpty(roomInfo)) return -1;
        else{
            for (let i in roomInfo){
                if (roomInfo[i].doctorId == UID) return roomInfo[i].roomId;
            }
            return -1;
        }
    },
    setDeviceId:function (device_id){
        localStorage.setItem("device_id", device_id);
    },
    getDeviceId:function (){
        let device_id = localStorage.getItem("device_id");
        return device_id ? device_id : "";
    },
    /**Cmnkey**/
    CONSENT_TYPE: "consent_type",   //知情同意书类别
    LOGIN_ENSURE: "login_ensure"
};

export default Cache
