/*
 * @Author: your name
 * @Date: 2019-12-05 15:05:03
 * @LastEditTime: 2019-12-06 11:02:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/page/PopularPage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'

class PopularTab extends Component {

    render() {
        const {tabLabel} = this.props
        return (
            <View style={style.container}>
                <Text>{tabLabel}</Text>
                <Text onPress={()=>{
                    NavigationUtil.goPage({
                        navigation:this.props.navigation
                    },'DetialPage')
                }}>跳转到详情页</Text>
            </View>
        )
    }
}

export default class PopularPage extends Component {
    render() {
        const TopNavigation = createAppContainer(createMaterialTopTabNavigator({
            PopularTab1 : {
                screen:PopularTab,
                navigationOptions:{
                    title:'Tab1'
                }
            },
            PopularTab2 : {
                screen:PopularTab,
                navigationOptions:{
                    title:'Tab2'
                }
            }
        }))

        return <View style={{flex:1,marginTop:30,}}>
            <TopNavigation />
        </View>
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})