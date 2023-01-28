/**
 * Created by Reid on 2020-04-14 16:37
 *
 * HomeContainer 首页
 */

import React from 'react'
import { isEmpty } from "../../util/cmn"
import {Row, Button, Modal} from "antd"
import {ArrowLeftOutlined} from '@ant-design/icons'
import '../../css/index.less'
import '../../css/component/draw.less'

// 全部名单
const allList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']

export default class HomeContainer extends React.Component {
	constructor(props) {
		super(props)

		let drawList = localStorage.getItem('drawList')
		if (!isEmpty(drawList)) drawList = JSON.parse(drawList)
		else drawList = []

		let group = {}
		for (let k=0;k<5;k++) {
			let temp = localStorage.getItem(k+'');
			if (!isEmpty(temp)) {
				group[k+''] = JSON.parse(temp)
			}
		}

		this.state = {
			group, drawList
		}
	}

	componentDidMount() {

	}

	// clear
	clearAll = () => {
		const next = () => {
			localStorage.removeItem('drawList');
			for (let k=0;k<5;k++) {
				localStorage.removeItem(k+'');
			}
			location.reload();
		}

		Modal.confirm({
			title: '确认清除获奖记录缓存吗',
			onOk: next
		})
	}

	// clearItem
	clearItem = index => {
		const next = () => {
			localStorage.removeItem(index+'');
			location.reload();
		}

		Modal.confirm({
			title: '确认清除获奖记录缓存吗',
			onOk: next
		})
	}

	render() {
		let {group} = this.state;
		let name = {'0': '', '1': '', '2': '', '3': '', '4': ''}
		for (let k in group) {
			if (!isEmpty(group[k+''])) {
				let temp = ''
				for (let m in group[k+'']) {
					temp = temp+allList[group[k+''][m]] + '、'
				}
				name[k+''] = temp
			}
		}

		return (
			<div  style={{height: '100vh', width: '100vw'}} >
				<ArrowLeftOutlined className={'arrow-icon left-arrow'} onClick={()=>{window.location = '/3';}}/>
				<div className={'clear-btn'}>
					<Button onClick={this.clearAll}>清除缓存</Button>
				</div>
				<Row type={'flex'} style={{height: '10vh'}} align={'middle'} justify={'center'}><span className={'title'}>幸运名单</span></Row>
				<Row type={'flex'} style={{height: '85vh', marginTop: '2vh'}} justify={'center'}>
					<table border={'2'} className={'list-body'}>
						<tr>
							<th className={'list-th list-th-1'}>奖项</th>
							<th className={'list-th list-th-2'}>名单</th>
						</tr>
						<tr>
							<td className={'list-td list-td-1'} onClick={()=>{this.clearItem(0)}}>特等奖</td>
							<td className={'list-td list-td-2'}>{name[0]}</td>
						</tr>
						<tr>
							<td className={'list-td list-td-1'} onClick={()=>{this.clearItem(1)}}>一等奖</td>
							<td className={'list-td list-td-2'}>{name[1]}</td>
						</tr>
						<tr>
							<td className={'list-td list-td-1'} onClick={()=>{this.clearItem(2)}}>二等奖</td>
							<td className={'list-td list-td-2'}>{name[2]}</td>
						</tr>
						<tr>
							<td className={'list-td list-td-1'} onClick={()=>{this.clearItem(3)}}>三等奖</td>
							<td className={'list-td list-td-2'}>{name[3]}</td>
						</tr>
						<tr>
							<td className={'list-td list-td-1'} onClick={()=>{this.clearItem(4)}}>四等奖</td>
							<td className={'list-td list-td-2'}>{name[4]}</td>
						</tr>
					</table>
				</Row>
			</div>
		)
	}
}
