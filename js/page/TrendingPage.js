/*
 * @Author: your name
 * @Date: 2019-12-05 15:03:51
 * @LastEditTime: 2019-12-06 15:44:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/page/TrendingPage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'
import NavigationUtil from '../navigator/NavigationUtil'

export default class TrendingPage extends Component {
    render() {
        const {navigation} = this.props
        return (
            <View style={style.container}>
                <Text>TrendingPage</Text>
                <Button title={'改变主题颜色'} onPress={()=>{
                    navigation.setParams({
                        theme:{
                            tintColor:'red',
                            updateTime: new Date().getTime()
                        }
                    })
                }}></Button>
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
