/**
 * Created by Reid on 2020-04-14 11:27
 *
 * 基础路由配置
 */
import React from 'react'
import Loading from './Loading'
import {Link, Route} from 'react-router-dom'
import Loadable from 'react-loadable';
import {RoutesList} from './Routes'

const NoMatch = () => (
    <div style={{margin: "50px"}}>
        <h3>404 NOT FOUND</h3>
        <Link to="/">返回主页</Link>
    </div>
)

const routeList = RoutesList;

//依据路由获取组件
export const getComponentByPath = path => {
    for (let i = 0; i < routeList.length; i++) {
        if (routeList[i].path === path) {
            return routeList[i].component
        }
    }
    return ""
}


//路由
export const routes = [
    {
        exact: true,
        path: '/1',
        component: Loadable({
            loader: () => import('../container/Container/FixedAwards'),
            loading: Loading
        })
    },
    {
        exact: true,
        path: '/2',
        component: Loadable({
            loader: () => import('../container/Container/BoleAwards'),
            loading: Loading
        })
    },
    {
        exact: true,
        path: '/3',
        component: Loadable({
            loader: () => import('../container/Container/DrawAwards'),
            loading: Loading
        })
    },
    {
        exact: true,
        path: '/4',
        component: Loadable({
            loader: () => import('../container/Container/ListAwards'),
            loading: Loading
        })
    },
    {
        component: NoMatch
    }
];

//生成react-router组件
export const RouteWithSubRoutes = route => (
    <Route
        exact={route.exact}
        path={route.path}
        render={props => (
            <route.component {...props} routes={route.routes}/>
        )}
    />
);
