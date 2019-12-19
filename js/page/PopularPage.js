/*
 * @Author: your name
 * @Date: 2019-12-05 15:05:03
 * @LastEditTime: 2019-12-13 17:04:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/page/PopularPage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet,FlatList,RefreshControl,ActivityIndicator} from 'react-native'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import actions from '../action/index'
import { connect } from 'react-redux'
import PopularItem from '../common/PopularItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const THEME_COLOR = '#678'
const pageSize = 10;//设为常量，防止修改

class PopularTab extends Component {

    constructor(props) {
        super(props)
        const {tabLabel} = this.props
        this.storeName = tabLabel
    }

    _store() {
        const {popular} = this.props
        let store = popular[this.storeName];
        if (!store) {
            store={
                items:[],
                isLoading:false,
                projectModes:[],///要显示的数据
                hideLoadingMore:false,//默认隐藏加载更多
            }
        }
        return store;
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR
    }

    loadData = (loadMore) => {
        const {onRefreshPopular,onLoadMorePopluar} = this.props
        const store = this._store()
        const url = this.genFetchUrl(this.storeName)

        if (loadMore) {
            console.log(111)
            onLoadMorePopluar(this.storeName,++store.pageIndex,pageSize,store.items,callback =>{
                this.refs.toast.show('没有更多了')
            })
        } else {
            onRefreshPopular(this.storeName,url,pageSize)
        }
    }

    componentDidMount() {
        this.loadData()
    }

    genIndicator() {
        return this._store().hideLoadingMore ? null : <View style={style.indicatorContainer}>
            <ActivityIndicator 
                style={style.indicator}
            />
            <Text>正在加载更多</Text>
        </View> ;
    }

    _renderItem = (data) => {
        const {item} = data
        return <PopularItem item={item}
            onSelect={()=>{
                console.log(1)
            }}     
        />
    }

    render() {
        const {popular} = this.props
        let store = this._store(); //动态获取state
        return (
            <View style={style.container}>
               <FlatList
                    data={store.projectModes}
                    renderItem={data => this._renderItem(data)}
                    keyExtractor={item=> {
                        console.log(item)
                        return item.id
                    }}
                    refreshControl={
                        <RefreshControl 
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            tintColor={THEME_COLOR}
                            refreshing={store.isLoading}
                            onRefresh={()=>this.loadData()}
                        />
                    }
                    ListFooterComponent={()=>this.genIndicator()}
                    onEndReached={()=>{
                        
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this.loadData(true)
                                this.canLoadMore = false;
                            }
                        }, 100);

                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={()=>{
                        this.canLoadMore = true; //初始化滚动页面调用onEndReached的问题
                    }}
               /> 
               <Toast ref={'toast'}
                    position={'center'}
               />
            </View>
        )
    }
}

const mapStateToProps = state =>({
    popular:state.popular
})

const mapDispatchToProps = dispatch =>({
    onRefreshPopular: (storeName,url,pageSize) => dispatch(actions.onRefreshPopular(storeName,url,pageSize)), 
    onLoadMorePopluar: (storeName,pageIndex,pageSize,items,callBack) => dispatch(actions.onLoadMorePopluar(storeName,pageIndex,pageSize,items,callBack)) 
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

        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle:'light-content'
        }
        let navigationBar = <NavigationBar 
            title={'最热'}
            style={{backgroundColor:THEME_COLOR}}
            statusBar={statusBar}
        />
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

        return <View style={{flex:1}}>
            {navigationBar}
            <TopNavigation />
        </View>
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    indicatorContainer:{
        alignItems:'center'
    },
    indicator:{
        color:'red',
        margin:10
    }
})