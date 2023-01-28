/**
 * Created by Reid on 2018/8/1.
 */
import React from 'react'
import {Spin, Row} from 'antd'

const Loading = () => (
    <Row style={{height: "80vh"}} type="flex" justify="center" align="middle">
        <Spin tip="loading..."/>
    </Row>
);

export default Loading
