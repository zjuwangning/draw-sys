/**
 * Created by Reid on 2018/11/2.
 *
 * 增加了onMulti函数, 用于一个事件绑定多个函数
 * 原函数on, 一个事件只绑定一个函数 用于解决同一组件多次加载同一事件绑定了空函数
 */
import EventEmitter from 'events'

class MyEmitter extends EventEmitter {
    on(event){
        this.removeAllListeners(event);
        let args = [];
        for (let i = 1; i < arguments.length; i++)
            args.push(arguments[i])
        super.on(event, ...args)
    }

    onMulti(event){
        let args = []
        for (let i = 1; i < arguments.length; i++)
            args.push(arguments[i])
        super.on(event, ...args)
    }
}

export const emitter = new MyEmitter();

emitter.on('error', (err) => {
    console.error(err);
});

export const register = map => {
    for(let key in map) {
        const val = map[key];
        if(val instanceof Function)
            emitter.onMulti(key, val);
        if(val instanceof Array && val[0] instanceof Function)
            emitter.onMulti(key, ...val)
    }
}

export const unregister = map => {
    for(let key in map) {
        const val = map[key];
        if(val instanceof Function)
            emitter.removeListener(key, val);
        if(val instanceof Array && val[0] instanceof Function)
            emitter.removeListener(key, ...val)
    }
}

//统一管理系统中用到的Event
export const EVENT_NAME = {
    // 页面切换
};



