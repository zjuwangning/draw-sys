/**
 * Created by Reid on 2020-04-14 16:02
 *
 * http请求
 */

import React from "react"
import {message} from 'antd'
import {getHost, getRootUrl, switchHost} from '../config/serverConfig'
import {isEmpty} from '../util/cmn'
import md5 from '../util/md5'
import Cache from './Cache'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import Url from './lib/Url'


// promise缓存记录
let networkPromiseMap = {}
const getKey = (url, parameters = {}) => md5(JSON.stringify({url, parameters}))
const isFile = o => Object.prototype.toString.call(o) === '[object File]'

// get
const baseGet = (url, data={}, isPrivate) => {
    const key = getKey(url, data);
    if (networkPromiseMap[key])
        return networkPromiseMap[key]
    url = String(url);
    let options = {method: 'get'}
    let userInfo = Cache.getUserInfo();
    // 内部请求需添加权限
    if (!isEmpty(userInfo) && isPrivate) {
        options.headers = {"Authorization": userInfo.key}
    }
    if (isPrivate) {    // 内部服务器请求数据 如果是外部服务器数据url需写完整
        url = getRootUrl() + url
    }
    // data参数不为空 url拼接
    if (!isEmpty(data)) {
        let index = 0;
        for (let key in data) {
            url = url + (index+'' === '0'?'?'+key+'='+data[key]:'&'+key+'='+data[key])
            index++;
        }
    }
    const promiseObj = fetch(url, options)
    networkPromiseMap[key] = promiseObj
    return promiseObj.then(
        resolve => {
            networkPromiseMap[key] = false
            return resolve
        },
        reject => {
            networkPromiseMap[key] = false
            return reject
        }
    )
}

export const Get = (url, data, isPrivate=true) => {
    return baseGet(url, data, isPrivate).then(
        response => {
            if (!response || response.status !== 200) {
                return {code: 1, msg: "请求错误"}
            }
            if(!response.jsonData)
                response.jsonData = response.json()
            return response.jsonData
        }
    ).then(
        json => {
            if (json.code === 1 || json.error == 1){
                if(json.msg)
                    message.error(json.msg)
                throw json.msg
            }
            return isPrivate?json.data:json
        }
    )
}

// post
const basePost = (url, data = {}) => {
    const key = getKey(url, data)
    if (networkPromiseMap[key])
        return networkPromiseMap[key]
    url = String(url)
    let options = {method: 'post'}
    options.headers = {"Content-Type":"application/json"}
    // 生成body
    if (!isEmpty(data)) {
        options.body = JSON.stringify(data)
    }
    const promiseObj = fetch(getRootUrl() + url, options)
    networkPromiseMap[key] = promiseObj
    return promiseObj.then(
        resolve => {
            networkPromiseMap[key] = false
            return resolve
        },
        reject => {
            networkPromiseMap[key] = false
            return reject
        }
    )
}

export const Post = (url, data) => {
    return basePost(url, data).then(
        response => {
            if (!response || response.status !== 200) {
                return {code: 1, msg: "请求错误"}
            }
            if(!response.jsonData)
                response.jsonData = response.json()
            return response.jsonData
        }
    ).then(
        json => {
            if (json.code === 1 || json.error == 1){
                if(json.msg)
                    message.error(json.msg)
                throw json.msg
            }
            return json.data
        }
    )
}

export const URL = Url;
