/*
 * @Author: your name
 * @Date: 2019-12-13 15:05:47
 * @LastEditTime: 2019-12-13 18:22:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/common/NavigationBar.js
 */
import React, { Component } from 'react'
import {View,ViewPropTypes,StatusBar,Text,StyleSheet,Platform} from 'react-native'
import PropTypes from 'prop-types'

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const STATUS_BAR_HEIGHT = 20;//状态栏的高度
const StatusBarShapre = {
    barStyle:PropTypes.oneOf(['light-content', 'default',]),
    hidden:PropTypes.bool,
    backgroundColor:PropTypes.string
}

export default class NavigationBar extends Component {
    //提供属性的类型检查
    static propsTypes = {
        style:ViewPropTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        titleLayoutStyle:ViewPropTypes.style,
        hide:PropTypes.bool,
        stausBar:PropTypes.shape(StatusBarShapre),
        rightButton:PropTypes.element,
        leftButton:PropTypes.element,
    }

    //设置默认属性
    static defaultProps ={
        stausBar:{
            barStyle:'light-content',
            hidden:false,
        }
    }

    getButtonElement(data) {
        return (
            <View style={styles.navBarButton}>
                {data ? data : null}
            </View>
        )
    }

    render() {

        console.log(this.props.statusBar,222)

        let statusBar = !this.props.statusBar.hidden ?
            <View style={styles.stausBar}>
                <StatusBar {...this.props.statusBar} />
            </View> : null ;

        let titleView = this.props.titleView ? this.props.titleView :
             <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{this.props.title}</Text>

        let content = this.props.hide ? null : 
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>
                
        return (
            <View style={[styles.container,this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#2196f3'
    },
    navBarButton:{
        alignItems:'center'
    },
    navBar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID
    },
    navBarTitleContainer:{
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:40,
        right:40,
        top:0,
        bottom:0
    },
    title:{
        fontSize:20,
        color:'white'
    },
    stausBar:{
        height:Platform.OS === 'ios' ? 44 : 0,
    }
})