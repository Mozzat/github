/*
 * @Author: your name
 * @Date: 2019-12-09 14:06:32
 * @LastEditTime: 2019-12-09 17:19:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /github/js/store/index.js
 */
import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import {middleware} from '../navigator/AppNavigator'
import action from '../action'

const logger = store => next => action => {
    if (typeof action === 'function') {
      console.log('dispatching a function')
    } else {
      console.log('dispatching ', action)
    }
    const result = next(action)
    console.log('nextState', store.getState())
    return result
}
  

const middlewares = [
    middleware,
    logger,
    thunk
]

/**
 * 创建store
 * */ 

export default createStore(reducers, applyMiddleware(...middlewares))