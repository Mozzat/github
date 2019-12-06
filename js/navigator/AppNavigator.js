/*
 * @Author: your name
 * @Date: 2019-12-05 11:28:48
 * @LastEditTime: 2019-12-06 11:08:35
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

const root = createSwitchNavigator(
    {
        Init:InitNavigator,
        Main:MainNavigator,
        Login:LoginNavigator
    },{
        navigationOptions:{
            header:null
        }
    }
)

export default createAppContainer(root)