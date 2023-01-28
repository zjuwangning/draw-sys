/**
 * Created by Reid on 2017/2/5.
 */
import React from 'react';
import moment from 'moment';
import {getVal} from '../util/cmn';
import Cache from './Cache';
import 'jquery';
import '../plugIn/jquery/jquery-migrate-1.2.1.min'

export default class BaseComponent extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        if(this.props.onRef)
            this.props.onRef(this)
    }

    /**
     * 用于判定用户和操作者, 来限定按钮的可用逻辑
     * 这里限定同一个操作者24小时内可用
     * @param data
     * @returns {boolean}
     */
    checkOperatorAndTime = (data, uidKey = "create_by", timeKey = "create_time") => {
        if(!data)
            return false
        const create_by = data[uidKey]
        const create_time = data[timeKey]
        if(!create_by || !create_time)
            return false
        return create_by === Cache.getUid() && moment(create_time).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
    }

    setDisVisible = key => this.setVisible(key, false)

    //当一个页面的弹出框过多时, 使用这部分的方法来控制弹出框的显示
    setVisible = (key, key_visible = true) => {
        try{
            let visible = getVal(this.state.visible, {});
            visible[key] = key_visible && true;
            this.setState({
                visible: visible
            })
        } catch(e){}
    }

    getVisible = key => {
        try{
           return getVal(this.state.visible[key], false);
        } catch(e){}
    }

    //控制加载
    setLoading = (key, is_loading = true) => {
        try{
            let loading = getVal(this.state.loading, {});
            loading[key] = is_loading;
            this.setState({loading})
        } catch(e){}
    }

    getLoading = key => {
        try{
            return getVal(this.state.loading[key], false);
        } catch(e){}
    }
}
