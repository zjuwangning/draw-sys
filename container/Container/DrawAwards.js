/**
 * Created by Reid on 2020-04-14 16:37
 *
 * HomeContainer 首页
 */

import React from 'react'
import '../../css/index.less'
import '../../css/component/draw.less'
import {isEmpty} from "../../util/cmn";
import {Row, Button, Radio, message} from "antd";
import {ArrowRightOutlined, ArrowLeftOutlined} from '@ant-design/icons'



// 全部名单
const allList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
// 固定奖项过滤名单
const luckList = []

// 各个奖项 幸运奖5*4 三等奖6*2
const awardName = ["特等奖", "一等奖", "二等奖", "三等奖", "幸运奖"]
// 各个奖项 总数量
const drawNum = [1, 2, 5, 12, 20];
// 各个奖项 单次抽取数量
const drawItemNum = [1, 2, 5, 6, 5];

export default class HomeContainer extends React.Component {
	constructor(props) {
		super(props)

		let drawList = localStorage.getItem('drawList')
		if (!isEmpty(drawList)) drawList = JSON.parse(drawList)
		else drawList = []

		this.state = {
			radioValue: -1,
			btnText: '开始抽奖',
			drawList,                       // 所有中过奖的名单
		}
	}

	componentDidMount() {
		// 增加缓存功能
	}

	// 开始或暂停抽奖
	start = () => {
		const {btnText, radioValue} = this.state;
		if (btnText === '开始抽奖') {
			if (radioValue < 0) {
				message.error('请先选择当前奖品');
				return ;
			}
			else {
				let temp = localStorage.getItem(radioValue+'')
				if (isEmpty(temp)) temp = [];
				else temp = JSON.parse(temp);
				if (temp.length>=drawNum[radioValue]) {
					message.warn('该奖项已经抽取完毕 需重新抽取请先删除名单');
					return ;
				}
			}
			this.audioControl('play');
			this.draw(radioValue);
			this.setState({btnText: '停止'})
		}
		else if (btnText === '停止') {
			this.audioControl('pause');
			this.stop();
			this.setState({btnText: '开始抽奖'})
		}
	}

	// 开始旋转
	draw = () => {
		const {drawList, radioValue} = this.state;
		this.timer = setInterval(()=>{
			// 抽幸运奖
			if (radioValue === 4) {
				let temp = []
				while (temp.length<drawItemNum[radioValue]) {
					let randomNum = Math.floor(Math.random()*allList.length)
					// 当前不重复 和已抽过人员不重复 不在趣味奖列表中
					while (temp.includes(randomNum) || drawList.includes(randomNum) || luckList.includes(allList[randomNum])) {
						randomNum = Math.floor(Math.random()*allList.length)
					}
					temp.push(randomNum)
				}
				for (let k in temp) {
					const element = document.getElementById('awards-'+k)
					element.innerHTML = allList[temp[k]]
				}
			}
			else {
				let temp = []
				while (temp.length<drawItemNum[radioValue]) {
					let randomNum = Math.floor(Math.random()*allList.length)
					// 当前不重复 和已抽过人员不重复
					while (temp.includes(randomNum) || drawList.includes(randomNum)) {
						randomNum = Math.floor(Math.random()*allList.length)
					}
					temp.push(randomNum)
				}
				for (let k in temp) {
					const element = document.getElementById('awards-'+k)
					element.innerHTML = allList[temp[k]]
				}
			}
		}, 100);
	}

	// 选出中奖人员
	stop = () => {
		let {drawList, radioValue} = this.state;
		if (this.timer !== null) {
			clearInterval(this.timer)
		}
		if (radioValue === 4) {
			let temp = []
			while (temp.length<drawItemNum[radioValue]) {
				let randomNum = Math.floor(Math.random()*allList.length)
				// 当前不重复 和已抽过人员不重复 不在趣味奖列表中
				while (temp.includes(randomNum) || drawList.includes(randomNum) || luckList.includes(allList[randomNum])) {
					randomNum = Math.floor(Math.random()*allList.length)
				}
				temp.push(randomNum)
			}
			for (let k in temp) {
				const element = document.getElementById('awards-'+k)
				element.innerHTML = allList[temp[k]]
			}
			drawList = drawList.concat(temp)
			this.setState({drawList})
			let drawListItem = localStorage.getItem(radioValue+'')
			if (isEmpty(drawListItem)) drawListItem = []
			else drawListItem = JSON.parse(drawListItem);
			drawListItem = drawListItem.concat(temp)
			localStorage.setItem('drawList', JSON.stringify(drawList))
			localStorage.setItem(radioValue, JSON.stringify(drawListItem))
		}
		else {
			let temp = []
			while (temp.length<drawItemNum[radioValue]) {
				let randomNum = Math.floor(Math.random()*allList.length)
				// 当前不重复 和已抽过人员不重复
				while (temp.includes(randomNum) || drawList.includes(randomNum)) {
					randomNum = Math.floor(Math.random()*allList.length)
				}
				temp.push(randomNum)
			}
			for (let k in temp) {
				const element = document.getElementById('awards-'+k)
				element.innerHTML = allList[temp[k]]
			}
			drawList = drawList.concat(temp)
			this.setState({drawList})
			let drawListItem = localStorage.getItem(radioValue+'')
			if (isEmpty(drawListItem)) drawListItem = []
			else drawListItem = JSON.parse(drawListItem);
			drawListItem = drawListItem.concat(temp)
			localStorage.setItem('drawList', JSON.stringify(drawList))
			localStorage.setItem(radioValue, JSON.stringify(drawListItem))
		}

	}

	// radioChange
	radioChange = e => {
		const {radioValue} = this.state;
		if (radioValue>-1) {
			for (let k=0; k<drawItemNum[radioValue]; k++) {
				const element = document.getElementById('awards-'+k)
				element.innerHTML = '';
			}
		}
		// let temp = localStorage.getItem(e.target.value+'');
		this.setState({radioValue: e.target.value})
	}

	// audio控制播放和暂停
	audioControl = key => {
		let audio = document.getElementById('myAudio');
		if (audio !== null) {
			if (key === 'play') {
				audio.currentTime = 0;
				audio.play();
			}
			else if (key === 'pause') {
				audio.currentTime = 0;
				audio.pause();
			}
		}
	}

	render() {
		const {radioValue, btnText} = this.state;
		const awards_name = "当前抽取 - "+ awardName[radioValue]+' - 共'+drawNum[radioValue]+'人'

		let awardArea = [];   // 展示姓名区域
		if (radioValue === 4) {
			awardArea = (
				<div style={{height: '75vh', width: '100%', paddingTop: '5vh'}}>
					<Row type={'flex'} justify={'center'} align={'middle'} style={{height: '60vh'}}>
						<div id={'awards-0'} className={'award-item award-item-4'}/>
						<div id={'awards-1'} className={'award-item award-item-4'}/>
						<div id={'awards-2'} className={'award-item award-item-4'}/>
						<div id={'awards-3'} className={'award-item award-item-4'}/>
						<div id={'awards-4'} className={'award-item award-item-4'}/>
					</Row>
				</div>
			)
		}
		else if (radioValue === 3) {
			awardArea = (
				<div style={{height: '75vh', width: '100%', paddingTop: '5vh'}}>
					<Row type={'flex'} justify={'center'} align={'middle'} style={{height: '60vh'}}>
						<div id={'awards-0'} className={'award-item award-item-3'}/><div id={'awards-1'} className={'award-item award-item-3'}/>
						<div id={'awards-2'} className={'award-item award-item-3'}/><div id={'awards-3'} className={'award-item award-item-3'}/>
						<div id={'awards-4'} className={'award-item award-item-3'}/><div id={'awards-5'} className={'award-item award-item-3'}/>
					</Row>
				</div>
			)
		}
		else if (radioValue === 2) {
			awardArea = (
				<div style={{height: '75vh', width: '100%', paddingTop: '5vh'}}>
					<Row type={'flex'} justify={'center'} align={'middle'} style={{height: '60vh'}}>
						<div id={'awards-0'} className={'award-item award-item-2'}/><div id={'awards-1'} className={'award-item award-item-2'}/>
						<div id={'awards-2'} className={'award-item award-item-2'}/><div id={'awards-3'} className={'award-item award-item-2'}/>
						<div id={'awards-4'} className={'award-item award-item-2'}/>
					</Row>
				</div>
			)
		}
		else if (radioValue === 1) {
			awardArea = (
				<div style={{height: '75vh', width: '100%', paddingTop: '5vh'}}>
					<Row type={'flex'} justify={'center'} align={'middle'} style={{height: '60vh'}}>
						<div id={'awards-0'} className={'award-item award-item-1'}/><div id={'awards-1'} className={'award-item award-item-1'}/>
					</Row>
				</div>
			)
		}
		else if (radioValue === 0) {
			awardArea = (
				<div style={{height: '75vh', width: '100%', paddingTop: '5vh'}}>
					<Row type={'flex'} justify={'center'} align={'middle'} style={{height: '60vh'}}>
						<div id={'awards-0'} className={'award-item award-item-0'}/>
					</Row>
				</div>
			)
		}


		return (
			<div style={{height: '100vh', width: '100vw'}} >
				<ArrowLeftOutlined className={'arrow-icon left-arrow'} onClick={()=>{window.location = '/2';}}/>
				<ArrowRightOutlined className={'arrow-icon right-arrow'} onClick={()=>{window.location = '/4';}}/>
				<div className={'radio-area'}>
					<Radio.Group value={radioValue} onChange={this.radioChange}>
						<Radio value={4}>幸运奖</Radio>
						<Radio value={3}>三等奖</Radio>
						<Radio value={2}>二等奖</Radio>
						<Radio value={1}>一等奖</Radio>
						<Radio value={0}>特等奖</Radio>
					</Radio.Group>
				</div>



				<Row type={'flex'} style={{height: '10vh'}} align={'middle'} justify={'center'}><span className={'title'}>幸运抽奖</span></Row>
				<Row type={'flex'} style={{height: '5vh'}} justify={'center'}>
					<span className={'sub-title'}>{radioValue<0?"":awards_name}</span>
				</Row>
				<div style={{height: '75vh', width: '100%'}}>
					{awardArea}
				</div>
				<Row type={'flex'} style={{height: '10vh'}} justify={'center'}>
					<Button onClick={this.start} className={'draw-btn'}>{btnText}</Button>
				</Row>

				<audio id={'myAudio'}>
					<source src="../../images/draw.mp3" type="audio/mpeg" />
				</audio>
			</div>
		)
	}
}
