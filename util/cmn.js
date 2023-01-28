/**
 * Created by Reid on 2016/11/30.
 */
// 生成唯一ID
export const genId = len => {
    return Number(Math.random().toString().substr(3,len) + Date.now()).toString(36);
}

/**一些基本的函数**/
export function getVal(obj, defaultValue = "") {
    return isEmpty(obj) ? defaultValue : obj
}

export function toInt(o, defaultValue = 0) {
    let res = parseInt(o)
    if (isNaN(res)) return defaultValue
    return res
}

export function isEmpty(o) {
    if (o === null || o === undefined)
        return true
    switch (typeof o) {
        case "boolean":
            return false
        case "object":
            for (let t in o)
                return false
            return true
        case "array":
        case "string":
            return o.length <= 0
        case "number":
            return o.toString().length <= 0
        case "function":
            return false
    }
    return true
}

export function isNum(n) {
    return typeof n === "number"
}

/**
 * 判断两个变量是否相同
 * @returns {boolean}
 */
export function isEqual(a, b) {
    if (isEmpty(a) && isEmpty(b))
        return true
    if (isEmpty(a) || isEmpty(b))
        return false
    switch (typeof a) {
        case "object":
            if (count(a) != count(b))
                return false
            for (let i in a) {
                if (!isEqual(a[i], b[i]))
                    return false
            }
            return true
        default:
            return a === b
    }
}

/**json解析函数**/
export function json_decode(str, default_result = {}) {
    let res = default_result
    try {
        res = JSON.parse(str)
    } catch (e) {
    }
    return res
}

export function json_decode_arr(str) {
    let res = []
    try {
        res = JSON.parse(str)
    } catch (e) {
    }
    return res
}

/**对象和数组相关的函数**/
/**
 * 深度拷贝, 防止因直接赋值引起的地址相同问题
 * @returns {*}
 */
export function cpy(o) {
    let res = {}
    switch (typeof o) {
        case "object":
            //判断o是否是react组件对象， 如果是 直接赋值
            if (!isEmpty(o) && o["$$typeof"] === Symbol.for('react.element')) {
                res = o
                break
            }
            if (Object.prototype.toString.call(o) === '[object Array]')
                res = []
            for (let i in o) {
                res[i] = cpy(o[i])
            }
            break
        default:
            res = o
            break
    }
    return res
}

/**
 * 获取变量的长度
 * string 获取字符数
 * object 获取其children数量(一级)
 * @param o 输入参数
 * @returns int
 */
export function count(o) {
    switch (typeof o) {
        case "string":
        case "array":
            return o.length
        case "object":
            let n = 0
            for (let i in o)
                n++
            return n
    }
    return 0
}

/**
 * 判断元素是否在数组中
 * @param obj
 * @param arr
 * @returns {boolean}
 */
export function inArray(obj, arr) {
    if (isEmpty(arr))
        return false
    let i = arr.length
    while (i--) {
        if (arr[i] == obj)
            return true
    }
    return false
}

/**
 * 从数组中删除指定的元素
 * @param obj
 * @param arr
 */
export function array_remove(obj, arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (obj == arr[i])
            arr.splice(i, 1)
    }
}

export function keyCount(arr, key, val) {
    if (isEmpty(arr))
        return 0
    let count = 0
    for (let i in arr) {
        if (!isEmpty(arr[i][key]) && arr[i][key] == val)
            count++
    }
    return count
}

export function subArrByKeyEq(arr, key, val) {
    let check = item => {
        return !isEmpty(item[key]) && item[key] == val
    }
    return subArrByCheck(arr, check)
}

export function subArrByKeyNeq(arr, key, val) {
    let check = item => {
        return isEmpty(item[key]) || item[key] != val
    }
    return subArrByCheck(arr, check)
}

export function subArrByCheck(arr, check) {
    let result = []
    for (let i in arr) {
        if (!arr.hasOwnProperty(i))
            continue
        if (check(arr[i])) {
            result.push(arr[i])
        }
    }
    return result
}

export function maxKeyInArr(arr, key) {
    let res = ""
    for (let i in arr) {
        let item = arr[i]
        if (!isEmpty(item[key])) {
            if (isEmpty(res))
                res = item[key]
            else
                res = res < item[key] ? item[key] : res
        }
    }
    return res
}

//根据key值查数据，如果数据存在返回当前条目，如果数据不存在返回空
export function findItemByKey(arr, key, val) {
    if (isEmpty(arr))
        return {}
    for (let i in arr) {
        if (!arr.hasOwnProperty(i))
            continue
        if (!isEmpty(arr[i][key]) && arr[i][key] == val) {
            return arr[i]
        }
    }
    return {}
}

// 获取option, 默认返回空
export const getOption = (t, options) => {
    if (isEmpty(t))
        return ""
    // 这里转换下类型
    t = t.toString()
    for (let k in options) {
        if(!options.hasOwnProperty(k))
            continue
        const {title, key, children} = options[k]
        if(!isEmpty(key) && t === key.toString())
            return title || ""
        if(children instanceof Array){
            let res = getOption(t, children)
            if(res)
                return res
        }
    }
    return ""
}

// 通过title找key, 按顺序找到第一个即可。
export function findKeyByTitle(title, options) {
    let key = "";
    if (isEmpty(title))
        return key;

    for (let index in options) {
        if (options.hasOwnProperty(index) && title == options[index]["title"]) {
            key = options[index]["key"];
            break;
        }
    }
    return key
}

export function getTreeOption(key,options){
    let res = ""
    if (isEmpty(key) || isEmpty(options))
        return res
    for (let item of options) {
        if(item.value == key){
            res = item.title;
            break;
        }else if(!isEmpty(item.children)){
            res = getTreeOption(key,item.children);
        }
    }
    return res
}

export function keyCpyObj(o, keys) {
    let res = {}
    for (let i in keys) {
        let key = keys[i]
        res[key] = o[key]
    }
    return res
}

/**
 * 跟操作者有相关的key
 * @type {[*]}
 */
export const operator_keys = ["create_by", "creator_name", "create_time", "update_by", "update_name", "update_time"]

const getPanelTitle = (columns, key) => {
    for (let i in columns) {
        for (let j in columns[i]) {
            let curData = columns[i][j]
            if (curData.key === key)
                return curData.title
        }
    }
    return ""
}

/**
 * checkPanel, 检查DataPanel是否有错
 * @param data, 为传入DataPanel的data
 * @param columns, 为传入DataPanel的columns
 * @param rules, 当只需要检测必填项时, 该参数不需要传. 但该参数也提供了一些其他的校验功能
 * array[object{
 *      key: 要校验的key,
 *      type: [number] 校验类型
 *      pattern: {正则表达式} 校验是否满足正则
 *      validator: function(data) => msg 自定义校验,返回错误信息,校验通过时返回空("")
 *      msg: 当校验出错时, 覆盖默认的返回信息
 * }]
 * @returns {*}
 */
export const checkPanel = (data, columns, rules = false) => {
    data = data || {}
    //检查必填项
    for (let i in columns) {
        for (let j in columns[i]) {
            let curData = columns[i][j]
            if (curData.key && curData.required && isEmpty(data[curData.key]))
                return curData.msg ? curData.msg : "请输入" + curData.title
        }
    }
    if (!rules) return ""
    //检查rules
    for (let i in rules) {
        let rule = rules[i]
        //如果有key
        if (rule.key) {
            let item = data[rule.key]
            if (rule.type) {
                switch (rule.type) {
                    case "number":
                        if (typeof item !== "number" && !/^[0-9]+$/.test(item))
                            return rule.msg ? rule.msg : getPanelTitle(columns, rule.key) + "必须为数字!"
                    default:
                        break
                }
            }
            if (rule.pattern && !rule.pattern.test(item))
                return rule.msg ? rule.msg : getPanelTitle(columns, rule.key) + "未通过正则校验!"
        }
        if (rule.validator) {
            let error_msg = rule.validator(data)
            if (!isEmpty(error_msg)) return error_msg
        }
    }
    return ""
}

export const checkPanels = (data, rules, ...columns_arr) => {
    for (let columns of columns_arr) {
        let msg = checkPanel(data, columns, rules)
        if (msg) return msg
    }
    return ""
}

const getTableTitle = (columns, key) => {
    for (let i in columns) {
        if (columns[i].key === key)
            return columns[i].title
    }
    return ""
}

/**
 * 检查表格一行数据
 * @param data
 * @param columns
 * @param rules
 * @param rowIndex  //单行调用时一般不传,该值用于传入validator中
 * @returns {*}
 */
export const checkRow = (data, columns, rules = false, rowIndex = "") => {
    for (let i in columns) {
        let col = columns[i]
        let item = col.key || col.dataIndex
        if (col.required && item && isEmpty(data[item]))
            return col.msg ? col.msg : "请输入" + col.title
    }
    if (!rules) return ""
    //检查rules
    for (let i in rules) {
        let rule = rules[i]
        //如果有key
        if (rule.key) {
            let item = data[rule.key] || data[rule.dataIndex]
            if (rule.type) {
                switch (rule.type) {
                    case "number":
                        if (typeof item !== "number" && !/^[0-9]+$/.test(item))
                            return rule.msg ? rule.msg : getTableTitle(columns, rule.key) + "必须为数字!"
                    default:
                        break
                }
            }
            if (rule.pattern && !rule.pattern.test(item))
                return rule.msg ? rule.msg : getTableTitle(columns, rule.key) + "未通过正则校验!"
        }
        if (rule.validator) {
            let error_msg = rule.validator(data, rowIndex)
            if (!isEmpty(error_msg)) return error_msg
        }
    }
    return ""
}

/**
 * 检查表格多行数据
 * @param list
 * @param columns
 * @param checkRows 要检查的行数(数组),不传或传false表示全部检查,一般用于多选同时编辑的情况,传入modifyRows
 * @param rules
 * @returns {*}
 */
export const checkTable = (list, columns, checkRows = false, rules = false) => {
    if (checkRows) {
        for (let i in checkRows) {
            let row = checkRows[i]
            let msg = checkRow(list[row], columns, rules)
            if (!isEmpty(msg))
                return msg
        }
    } else {
        for (let i in list) {
            let msg = checkRow(list[i], columns, rules)
            if (!isEmpty(msg))
                return msg
        }
    }
    return ""
}

/**
 * websocket初始化
 * @param url 服务地址，需带上设备号，网页端的同一个用数字+"_WEB"，PAD端为数字
 * @param onOpen 链接后的回调
 * @param onMessage 消息回调
 * @param onError 异常回调
 * @param onClose 关闭回调
 * @returns {websocket}
 */
export function openSocket(url, onOpen, onMessage, onError, onClose) {
    let ws = null;
    if (!isEmpty(url)) {
        ws = new WebSocket(url);
        // 绑定open回调
        if (onOpen && typeof(onOpen) == 'function')
            ws.onopen = onOpen;

        // 绑定message回调
        if (onMessage && typeof(onMessage) == 'function')
            ws.onmessage = onMessage;

        // 绑定error回调
        if (onError && typeof(onError) == 'function')
            ws.onerror = onError;

        // 绑定close回调
        if (onClose && typeof(onClose) == 'function')
            ws.onclose = onClose;
    }

    return ws;
}

/**
 * 两个数组的differ函数
 * 从源到目标的变化过程
 * @param origArr 源
 * @param destArr 目标
 * @param sortFn 排序函数, 需要保证返回为数字, 并且相同排序的函数会被认为是同一key, 即update
 * @param isSameFn 判断两个节点是否相同
 * @returns false | {add, update, del}
 */
export const arrDiff = (origArr, destArr, sortFn, isSameFn) => {
    if (!(origArr instanceof Array) || !(destArr instanceof Array))
        return false

    // cpy并排序
    const orig = cpy(origArr).sort(sortFn)
    const dest = cpy(destArr).sort(sortFn)

    // 这里记录一个原数组的顺序, 将输出数据按原数组顺序排列, 从而保证稳定性
    const origSortMap = {}
    const destSortMap = {}
    origArr.map((item, key) => origSortMap[item] = key)
    destArr.map((item, key) => destSortMap[item] = key)

    let add = []
    let update = []
    let del = []

    for (let i = 0, j = 0; i < orig.length || j < dest.length;) {
        // 如果orig已经遍历完成, dest余下皆为新增数据
        if (i >= orig.length) {
            while (j < dest.length) {
                add.push(dest[j])
                j++
            }
            break
        }
        // 如果dest已经遍历完成, orig余下皆为删除数据
        if (j >= dest.length) {
            while (i < orig.length) {
                del.push(orig[i])
                i++
            }
            break
        }
        let o = orig[i]
        let d = dest[j]
        // 如果是key相同数据
        if(sortFn(o, d) === 0){
            // 这里更新数据里push的是更新后的数据
            !isSameFn(o, d) && update.push([o, d])
            i++
            j++
            continue
        }

        // 如果按排序, o在前, 说明o是删除数据
        if(sortFn(o, d) < 0){
            del.push(o)
            i++
            continue
        }
        // 否则说明d是新增数据
        add.push(d)
        j++
    }

    // update和del按照orig排序 add按dest排序
    update.sort((o1, o2) => origSortMap[o1] - origSortMap[o2])
    del.sort((o1, o2) => origSortMap[o1] - origSortMap[o2])
    add.sort((o1, o2) => destSortMap[o1] - destSortMap[o2])

    return {add, update, del}
}