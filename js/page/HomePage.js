/*
 * @Author: your name
 * @Date: 2019-12-05 10:13:49
 * @LastEditTime: 2019-12-10 11:02:07
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
import {connect} from 'react-redux'

class HomePage extends Component {

    constructor(props) {
        super(props)
        
    }

    render() {
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

const mapStateToProps = state => ({
    nav: state.nav,
    // customThemeViewVisible: state.theme.customThemeViewVisible,
    // theme: state.theme.theme,
});

// const mapDispatchToProps = dispatch => ({
//     onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
// });

export default connect(mapStateToProps)(HomePage);