import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {routes, RouteWithSubRoutes} from './routers/router.config'

// 定义一些函数
Reflect.deletePropertys = function(obj, keylist){
    keylist.map(key => this.deleteProperty(obj, key))
}

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Router>
            <Switch>
                <Route path="/" exact={true}>
                    <Redirect to="/1"/>
                </Route>
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
            </Switch>
        </Router>
    </ConfigProvider>,
    document.getElementById('example')
);

