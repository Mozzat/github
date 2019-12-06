/*
 * @Author: your name
 * @Date: 2019-12-05 10:13:49
 * @LastEditTime: 2019-12-06 10:22:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Github/js/page/HomePage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'

//图标库
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'

export default class HomePage extends Component {

    _tabNavigator() {
        return createAppContainer(createBottomTabNavigator({
            PopularPage:{
                screen:PopularPage,
                navigationOptions:{
                    tabBarLabel:'最热',
                    tabBarIcon:({tintColor,focus}) => {
                        return <MaterialIcons
                            name={'whatshot'}
                            size={26}
                            style={{color:tintColor}}
                        />
                    }
                }
            },
            TrendingPage:{
                screen:TrendingPage,
                navigationOptions:{
                    tabBarLabel:'趋势',
                    tabBarIcon:({tintColor,focus}) => {
                        return <Ionicons
                            name={'md-trending-up'}
                            size={26}
                            style={{color:tintColor}}
                        />
                    }
                }
            },
            FavoritePage:{
                screen:FavoritePage,
                navigationOptions:{
                    tabBarLabel:'收藏',
                    tabBarIcon:({tintColor,focus}) => {
                        return <MaterialIcons
                            name={'favorite'}
                            size={26}
                            style={{color:tintColor}}
                        />
                    }
                }
            },
            MyPage:{
                screen:MyPage,
                navigationOptions:{
                    tabBarLabel:'我的',
                    tabBarIcon:({tintColor,focus}) => {
                        return <Entypo
                            name={'user'}
                            size={26}
                            style={{color:tintColor}}
                        />
                    }
                }
            },
        }))
    }

    render() {

        const Tab = this._tabNavigator()
        return <DynamicTabNavigator/>
        
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})