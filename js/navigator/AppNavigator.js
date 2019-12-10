/*
 * @Author: your name
 * @Date: 2019-12-05 11:28:48
 * @LastEditTime: 2019-12-10 16:37:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Github/js/navigator/AppNavigator.js
 */
import {createAppContainer,createSwitchNavigator} from'react-navigation'
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs' 
import {createStackNavigator} from 'react-navigation-stack' 
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetialPage from '../page/DetialPage'
import LoginPage from '../page/LoginPage'
import FetchDemoPage from '../page/FetchDemoPage'
import AsyncStrageDemo from '../page/AsyncStrageDemo'
///redux
import {connect} from 'react-redux'
import {createReactNavigationReduxMiddleware,createReduxContainer} from 'react-navigation-redux-helpers'

///定义根路由
export const RootCom = 'Init'

const InitNavigator = createStackNavigator(
    {
        WelcomePage:{
            screen:WelcomePage,
            navigationOptions:{
                header:null
            }
        }
    }
)

const MainNavigator = createStackNavigator(
    {
        HomePage:{
            screen:HomePage,
            navigationOptions:{
                header:null
            }
        },
        DetialPage:{
            screen:DetialPage,
            mode:'modal',
            navigationOptions:{
                // header:null,
            }
        },
        FetchDemoPage:{
            screen:FetchDemoPage,
        },
        AsyncStrageDemo:{
            screen:AsyncStrageDemo,
        },
    }
)

const LoginNavigator = createStackNavigator(
    {
        LoginPage:{
            screen:LoginPage,
            navigationOptions:{
                header:null
            }
        }
    },{
        mode:'modal',
    }
)

export const RootNavigator = createAppContainer(createSwitchNavigator(
    {
        Init:InitNavigator,
        Main:MainNavigator,
        Login:LoginNavigator
    },{
        navigationOptions:{
            header:null
        }
    }
))

// export default createAppContainer(root)

/**
 * 1.初始化react-navigation与redux的中间件
 * 2.该方法的一个很大的作用就是为createReactNavigationReduxMiddleware的key设置actionSubscribers(行为订阅者)
 * 3.设置订阅者
 * 4.检测订阅者是否存在
 * @type {Middlewate}
 * */ 

export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root',
)

/**
 * 2.将根导航器组件传递给createReduxContainer函数
 * 并返回一个将navigation state 和 dispatch 函数作为props的新组件
 * 注意:要在createReactNavigationReduxMiddleware之后执行
 * */   
const AppWithNavigationState = createReduxContainer(RootNavigator,'root'); 

/**
 * State到Props的映射关系
 * @param state 
 * */  

const mapStateToProps = state => ({
    state:state.nav
})


/**
 * 3.连接React组件与Redux store
 * */ 
export default connect(mapStateToProps)(AppWithNavigationState)