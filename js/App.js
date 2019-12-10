/*
 * @Author: your name
 * @Date: 2019-12-09 14:30:31
 * @LastEditTime: 2019-12-10 10:41:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/App.js
 */
import React,{Component} from 'react'
import {Provider} from 'react-redux'
import AppNavigator from './navigator/AppNavigator'
import store from './store'

export default class App extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox= true;
    }

    render () {
        return <Provider store={store}>
            <AppNavigator />
        </Provider>
    }

}