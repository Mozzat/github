/*
 * @Author: your name
 * @Date: 2019-12-05 15:05:03
 * @LastEditTime: 2019-12-06 18:05:55
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

const tabNames = ['Java','Android','iOS','React','React Native','PHP']

export default class PopularPage extends Component {

    constructor(props){
        super(props)
        
    }

    _genTabs() {
        
        const tabs = {}
        tabNames.forEach((item,index) => {
            tabs[`tab${index}`] = {
                screen : PopularTab,
                navigationOptions:{
                    title:item
                }
            }
        });
        console.log(tabs)
        return tabs;
    }

    componentDidMount() {
        this._genTabs()
    }

    render() {
        const TopNavigation = createAppContainer(createMaterialTopTabNavigator(this._genTabs(),{
            tabBarOptions:{
                scrollEnabled : true, //是否允许滑动
                upperCaseLabel:false,//是否默认大写
                style:{
                    backgroundColor:'#768'
                }
            },
            

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