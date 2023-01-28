/**
 * Created by Reid on 2019/9/24 11:42.
*/
import fetch from 'isomorphic-fetch'

const isFile = o => Object.prototype.toString.call(o) === '[object File]'

// 底层Post函数
export default (rootUrl, url, data = {}) => {
    let options = {method: 'post'}
    // 生成body
    if (data && data instanceof Object && Object.keys(data).length !== 0) {
        const formData = new FormData()
        for (let key in data) {
            if(!data.hasOwnProperty(key))
                continue
            let val = data[key]
            if (!isFile(val) && (typeof val === 'object' || Array.isArray(val)))
                val = JSON.stringify(val)
            formData.append(key, val)
        }
        options.body = formData
    }

    return fetch(String(rootUrl) + String(url), options)
}
