/*
 * @Author: your name
 * @Date: 2019-12-11 09:11:09
 * @LastEditTime: 2019-12-16 17:51:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /github/js/reducer/index.js
 */
import {combineReducers} from 'redux'
import theme from './theme'
import popular from './popular'
import trending from './trending'
import {RootCom,RootNavigator} from '../navigator/AppNavigator'

//1.指定默认的state 
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(RootCom))

/**
 * 2.创建自己的navigation reducer
 * */ 
const navReducer = (state = navState , action) => {
    const nextState = RootNavigator.router.getStateForAction(action,state);
    return nextState || state
}

/**
 * 3.合并reducer
 * */ 
const index = combineReducers({
    nav:navReducer,
    theme:theme,
    popular:popular,
    trending:trending,
})

export default index 