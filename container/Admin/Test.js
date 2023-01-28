/*
 * Created by Reid on 2020-04-15 11:44
 *
 * 首页 页面
 */

import React from 'react'
import { Row } from 'antd'
import '../../css/index.less'



export default class Test extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            weather: {}
        }
    }

    componentDidMount() {}


    render() {
        let {weather} = this.state

        return (
            <Row type='flex' style={{height: '5vh'}}>
                测试页面
            </Row>
        )
    }
}
