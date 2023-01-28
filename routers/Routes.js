/**
 * Created by Reid on 2020-04-15 11:41
 *
 * 所有页面路由
 */
import React from 'react'
import Loadable from "react-loadable"
import Loading from "./Loading"


export const RoutesList = [
    {
        title: "首页",
        path: 'index',
        component: Loadable({
            loader: () => import('../container/Admin/Index'),
            loading: Loading
        })
    },
    {
        title: "主页",
        path: 'homePage',
        component: Loadable({
            loader: () => import('../container/Admin/HomePage'),
            loading: Loading
        })
    },
    {
        title: "测试",
        path: 'test',
        component: Loadable({
            loader: () => import('../container/Admin/Test'),
            loading: Loading
        })
    }
];

