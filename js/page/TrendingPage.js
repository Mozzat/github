/*
 * @Author: your name
 * @Date: 2019-12-05 15:03:51
 * @LastEditTime: 2019-12-19 17:47:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/page/TrendingPage.js
 */
// import React, { Component } from 'react'
// import {View,Text,StyleSheet,Button} from 'react-native'
// import NavigationUtil from '../navigator/NavigationUtil'
// import {connect} from 'react-redux'
// import actions from '../action/index'

// class TrendingPage extends Component {
//     render() {
//         const {navigation} = this.props
//         return (
//             <View style={style.container}>
//                 <Text>TrendingPage</Text>
//                 <Button title={'改变主题颜色'} onPress={()=>this.props.onThemeChange('#768')}></Button>
//             </View>
//         )
//     }
// }

// const style = StyleSheet.create({
//     container:{
//         flex:1,
//         alignItems:'center',
//         justifyContent:'center'
//     }
// })

// const mapStateToProps = state => ({} )
// const mapDispatchToProps = dispatch => ({
//     onThemeChange : theme => dispatch(actions.onThemeChange(theme))
// })

// export default connect(mapStateToProps,mapDispatchToProps)(TrendingPage)


import React, { Component } from 'react'
import {View,Text,StyleSheet,FlatList,RefreshControl,ActivityIndicator} from 'react-native'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'
import actions from '../action/index'
import { connect } from 'react-redux'
import TrendingItem from '../common/TrendingItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'

const URL = 'https://github.com/trending/'
const QUERY_STR = '?since=deily'
const THEME_COLOR = '#678'
const pageSize = 10;//设为常量，防止修改

class TrendingTab extends Component {

    constructor(props) {
        super(props)
        const {tabLabel} = this.props
        this.storeName = tabLabel
    }

    _store() {
        const {trending} = this.props
        let store = trending[this.storeName];
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
        const {onRefreshTrending,onLoadMoreTrending} = this.props
        const store = this._store()
        const url = this.genFetchUrl(this.storeName)
        console.log(url,'接口')

        if (loadMore) {
            console.log(111)
            onLoadMoreTrending(this.storeName,++store.pageIndex,pageSize,store.items,callback =>{
                this.refs.toast.show('没有更多了')
            })
        } else {
            onRefreshTrending(this.storeName,url,pageSize)
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
        return <TrendingItem item={item}
            onSelect={()=>{
                console.log(1)
            }}     
        />
    }

    render() {
        const {trending} = this.props
        let store = this._store(); //动态获取state
        console.log(store.projectModes);
        return (
            <View style={style.container}>
               <FlatList
                    data={store.projectModes}
                    renderItem={data => this._renderItem(data)}
                    keyExtractor={item=> {
                        return item.id || item.fullName
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
    trending:state.trending
})

const mapDispatchToProps = dispatch =>({
    onRefreshTrending: (storeName,url,pageSize) => dispatch(actions.onRefreshTrending(storeName,url,pageSize)), 
    onLoadMoreTrending: (storeName,pageIndex,pageSize,items,callBack) => dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,items,callBack)) 
})

const TrendingTabPage = connect(mapStateToProps,mapDispatchToProps)(TrendingTab)

export default class TrendingPage extends Component {

    constructor(props){
        super(props)
        this.state={
            tabNames : ['Objective-C','JAVA','C','C#','PHP','JavaScript']
        }
    }

    _genTabs() {
        
        const tabs = {}
        this.state.tabNames.forEach((item,index) => {
            tabs[`tab${index}`] = {
                screen : props => <TrendingTabPage {...props} tabLabel={item} />,
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
            title={'趋势'}
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