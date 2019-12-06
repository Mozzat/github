/*
 * @Author: your name
 * @Date: 2019-12-05 10:11:25
 * @LastEditTime: 2019-12-06 11:04:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Github/js/page/WelcomePage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet} from 'react-native'
import NavigationUtil from '../navigator/NavigationUtil'

export default class WelcomePage extends Component {

    componentDidMount() {
        this.timer = setTimeout(() => {
            console.log(this.props)
            const {navigation} = this.props
            NavigationUtil.resetToHomePage(navigation)
        }, 200 );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        NavigationUtil.navigation = this.props.navigation
        return (
            <View style={style.container}>
                <Text>WelcomePage</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})