/**
 * Created by Reid on 2020-04-14 16:37
 *
 * HomeContainer 首页
 */

import React from 'react'
import '../../css/index.less'
import '../../css/component/draw.less'
import {Row} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons'


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
				<ArrowRightOutlined className={'arrow-icon right-arrow'} onClick={()=>{window.location = '/2';}}/>
				<Row type={'flex'} style={{height: '10vh'}} align={'middle'} justify={'center'}><span className={'title'}>趣味奖名单</span></Row>
				<Row type={'flex'} style={{height: '70vh', marginTop: '4vh'}} justify={'center'}>
					<table border={'5'} className={'table-body'}>
						<tr>
							<th className={'table-th table-th-1'}>奖项</th>
							<th className={'table-th table-th-2'}>名单</th>
							<th className={'table-th table-th-3'}>数量</th>
						</tr>
						<tr>
							<td className={'table-td table-td-1'}>创芯未来</td>
							<td className={'table-td table-td-2'}>1、2、3、4、5、6、7、8</td>
							<td className={'table-td table-td-3'}>8人</td>
						</tr>
						<tr>
							<td className={'table-td table-td-1'}>睿智新人</td>
							<td className={'table-td table-td-2'}>9、10、11、12、13、14</td>
							<td className={'table-td table-td-3'}>6人</td>
						</tr>
						<tr>
							<td className={'table-td table-td-1'}>感恩有你</td>
							<td className={'table-td table-td-2'}>15、16、17、18、19、20、21、22、23、24、25、26、27</td>
							<td className={'table-td table-td-3'}>13人</td>
						</tr>
					</table>
				</Row>
			</div>
		)
	}
}
