/*
 * @Author: your name
 * @Date: 2019-12-06 11:33:55
 * @LastEditTime: 2019-12-09 16:46:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/navigator/DynamicTabNavigator.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator,BottomTabBar} from 'react-navigation-tabs'
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import FavoritePage from '../page/FavoritePage'
import MyPage from '../page/MyPage'

//图标库
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

///reducer
import {connect} from 'react-redux'

const TABS = {
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
}

// class TabBarComponent extends Component {

//     constructor(props){
//         super(props)
//         // console.disableYellowBox = true
//         this.theme = {
//             tintColor : props.activeTintColor,
//             updateTime: new Date().getTime()
//         }
//     }

//     render () {
//         const {routes,index} = this.props.navigation.state 
//         console.log('====1=====')
//         console.log(routes)
//         console.log('====2=====')
//         if (routes[index].params) {

//             console.log('1')
//             const {theme} = routes[index].params
//             if (theme&&theme.updateTime > this.theme.updateTime) {
//                 this.theme = theme
//             }
//         }

//         return <BottomTabBar 
//             {...this.props}
//             activeTintColor={this.theme.tintColor || this.props.activeTintColor}
//         />
//     }
// }

class TabBarComponent extends Component {
    constructor (props) {
      super(props)
      this.theme = {
        tintColor: props.activeTintColor,
        updateTime: new Date().getTime()
      }
    }
  
    render () {
    //   const { routes, index } = this.props.navigation.state
    //   console.log(this.props.navigation.state)
    //   if (routes[index].params) {
    //     const { theme } = routes[index].params
    //     if (theme && theme.updateTime > this.theme.updateTime) {
    //       this.theme = theme
    //     }
    //   }
  
      /**
       * custom tabBarComponent
       * https://github.com/react-navigation/react-navigation/issues/4297
       */
      return (
        <BottomTabBar
          {...this.props}
          getAccessibilityRole={() => {}}
          getAccessibilityStates={() => {}}
          activeTintColor={this.props.theme}
        />
      )
    }
}

class DynamicTabNavigator extends Component {

    constructor(props){
        super(props)
        // console.disableYellowBox = true
    }

    _tabNavigator() {

        ///如果已经创建成功了，就不需要再次创建
        if (this.Tabs) {
            return this.Tabs
        }

        const {PopularPage,TrendingPage,FavoritePage,MyPage} = TABS
        const tabs = {PopularPage,TrendingPage,FavoritePage,MyPage}

        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs,{
            tabBarComponent: props => <TabBarComponent theme={this.props.theme} {...props} />,
        }))
    }

    render() {

        const Tab = this._tabNavigator()
        return <Tab />
        
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
    theme:state.theme.theme,
})

export default connect(mapStateToProps)(DynamicTabNavigator)