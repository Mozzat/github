import {combineReducers} from 'redux'
import theme from './theme'
import popular from './popular'
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
})

export default index 