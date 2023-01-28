/**
 * Created by Reid on 2020-04-14 16:37
 *
 * HomeContainer 首页
 */

import React from 'react'
import '../../css/index.less'
import '../../css/component/draw.less'
import {cpy, isEmpty} from "../../util/cmn";
import {Row, Col, Button, Radio, message, Modal} from "antd";
import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons'


export default class FixedAwards extends React.Component {
	constructor(props) {
		super(props)

		this.timer = null
		this.cardNum = -1;

		this.state = {}
	}

	componentDidMount() {

	}


	render() {

		return (
			<div style={{height: '100vh', width: '100vw'}} >
				<ArrowLeftOutlined className={'arrow-icon left-arrow'} onClick={()=>{window.location = '/1';}}/>
				<ArrowRightOutlined className={'arrow-icon right-arrow'} onClick={()=>{window.location = '/3';}}/>
				<Row type={'flex'} style={{height: '10vh'}} align={'middle'} justify={'center'}><span className={'title'}>伯乐奖名单</span></Row>
				<Row type={'flex'} style={{height: '70vh', marginTop: '4vh'}} justify={'center'}>
					<table border={'5'} className={'table-body'}>
						<tr>
							<th className={'table-th table-th-1'}>奖项</th>
							<th className={'table-th table-th-2'}>名单</th>
							<th className={'table-th table-th-3'}>奖品</th>
						</tr>
						<tr>
							<td className={'table-td table-td-1'}>金伯乐奖</td>
							<td className={'table-td table-td-2'}>1、2、3</td>
							<td className={'table-td table-td-3'}>价值800元礼品</td>
						</tr>
						<tr>
							<td className={'table-td table-td-1'}>银伯乐奖</td>
							<td className={'table-td table-td-2'}>4、5、6、7</td>
							<td className={'table-td table-td-3'}>价值300元礼品</td>
						</tr>
						<tr>
							<td className={'table-td table-td-1'}>独具慧眼奖</td>
							<td className={'table-td table-td-2'}>8、9、10、11、12、13、14、15、16</td>
							<td className={'table-td table-td-3'}>价值200元礼品</td>
						</tr>
					</table>
				</Row>
			</div>
		)
	}
}
