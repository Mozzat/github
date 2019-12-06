/*
 * @Author: your name
 * @Date: 2019-12-05 15:05:44
 * @LastEditTime: 2019-12-06 16:45:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/page/FavoritePage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'

export default class FavoritePage extends Component {
    render() {
        const {navigation} = this.props
        return (
            <View style={style.container}>
                <Text>PopularPage</Text>
                <Button title={'改变主题颜色'} onPress={()=>{
                    navigation.setParams({
                        theme:{
                            tintColor:'green',
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
