/*
 * @Author: your name
 * @Date: 2019-12-05 15:05:03
 * @LastEditTime: 2019-12-10 17:47:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/page/PopularPage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet,FlatList,RefreshControl} from 'react-native'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import actions from '../action/index'
import { connect } from 'react-redux'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const THEME_COLOR = 'red'

class PopularTab extends Component {

    constructor(props) {
        super(props)
        const {tabLabel} = this.props
        this.storeName = tabLabel
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR
    }

    loadData = () => {
        const {onLoadPopularData} = this.props
        const url = this.genFetchUrl(this.storeName)
        onLoadPopularData(this.storeName,url)
    }

    componentDidMount() {
        this.loadData()
    }

    _renderItem = (data) => {
        console.log(item,22222)
        return <View style={{marginBottom:10}}>
            <Text style={{backgroundColor:'#faa'}}>
                1111
            </Text>
        </View>
    }

    render() {
        const {popular} = this.props
        let store = popular[this.storeName]; //动态获取state
        if (!store) {
            store = {
                itmes:[],
                isLoading:false
            }
        }

        // console.log(store.isLoading)
        return (
            <View style={style.container}>
               <FlatList 
                    data={store.itmes}
                    renderItem={data => (<View>
                        <Text>1111</Text>
                    </View>)}
                    keyExtractor={item=> item+id}
                    refreshing={store.isLoading}
                    onRefresh={()=>this.loadData()}
                    refreshControl={
                        <RefreshControl 
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            tintColor={THEME_COLOR}
                        />
                    }
               /> 
            </View>
        )
    }
}

const mapStateToProps = state =>({
    popular:state.popular
})

const mapDispatchToProps = dispatch =>({
    onLoadPopularData: (storeName,url) => dispatch(actions.onLoadPopularData(storeName,url)) 
})

const PopularTabPage = connect(mapStateToProps,mapDispatchToProps)(PopularTab)

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
                screen : props => <PopularTabPage {...props} tabLabel={item} />,
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
    }
})