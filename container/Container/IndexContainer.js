/**
 * Created by Reid on 2020-09-14 14:44
 *
 * IndexContainer  用于跳转页面 解决页面跳转bug
 */

import React from 'react'
import {message} from 'antd'
import {withRouter} from "react-router-dom";
import {isEmpty} from "../../util/cmn";
import Cache from "../../system/Cache";
import '../../css/index.less'


class IndexContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        message.config({duration: 3, maxCount: 3});
        // 首先判断下是否有点击自动登录
        let authority = Cache.getUserAuthority();
        console.log('authority', authority);
        let url = '/backstage/device'
        if (!isEmpty(authority[0] && !isEmpty(authority[0]['path']))) {
            url = authority[0]['path'];
        }


        if (Cache.getUid() <= 0) {
            window.location = "/login";
        }
        else {
            window.location = '/';
        }
    }


    render() {
        return (
            <div className="">
            </div>
        )
    }
}

export default withRouter(IndexContainer)
