/*
 * @Author: your name
 * @Date: 2019-12-05 15:05:03
 * @LastEditTime: 2019-12-10 17:47:25
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
                <Text onPress={()=>{
                    NavigationUtil.goPage({
                        navigation:this.props.navigation
                    },'FetchDemoPage')
                }}>跳转到Fetch</Text>
                <Text onPress={()=>{
                    NavigationUtil.goPage({
                        navigation:this.props.navigation
                    },'AsyncStrageDemo')
                }}>AsyncStorage实用</Text>
                <Text onPress={()=>{
                    NavigationUtil.goPage({
                        navigation:this.props.navigation
                    },'DataStoreDemoPage')
                }}>DataStore实用</Text>
                
            </View>
        )
    }
}

// const tabNames = ['Java','Android','iOS','React','React Native','PHP']

export default class PopularPage extends Component {

    constructor(props){
        super(props)
        this.state={
            tabNames : ['Java','Android','iOS','React','React Native','PHP']
        }
    }

    _genTabs() {
        
        const tabs = {}
        this.state.tabNames.forEach((item,index) => {
            tabs[`tab${index}`] = {
                screen : props => <PopularTab {...props} tabLabel={item} />,
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
                    backgroundColor:'#678'
                },
                indicatorStyle:{
                    height:2,
                    backgroundColor:'white'
                },
                labelStyle:{
                    fontSize:13,
                    marginTop:6,
                    marginBottom:6,
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