/*
 * @Author: your name
 * @Date: 2019-12-05 15:06:18
 * @LastEditTime: 2019-12-05 15:42:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /Github/js/page/MyPage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet} from 'react-native'

export default class MyPage extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>MyPage</Text>
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
