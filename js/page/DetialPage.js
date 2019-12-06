/*
 * @Author: your name
 * @Date: 2019-12-05 11:35:26
 * @LastEditTime: 2019-12-05 14:41:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Github/js/page/DetialPage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'

export default class DetialPage extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>DetialPage</Text>
                <Button title={'返回上一页'} onPress={()=>{
                    const {navigation} = this.props
                    navigation.goBack()
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