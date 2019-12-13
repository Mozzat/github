/*
 * @Author: your name
 * @Date: 2019-12-05 15:06:18
 * @LastEditTime: 2019-12-13 18:04:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Github/js/page/MyPage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'

//使用矢量图标
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from '../common/NavigationBar'

const THEME_COLOR = '#678'

export default class MyPage extends Component {

    getRightButton() {

        return <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{

            }}>
                <View style={{padding:5,marginRight:8}}>
                    <Feather name={'search'}
                             size={24}
                             style={{color:'white'}}         
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    getLeftButton(callBack) {
        return <TouchableOpacity style={{padding:8,paddingLeft:12 }} onPress={callBack}>
            <Ionicons 
                name={'ios-arrow-back'}
                size={26}
                style={{color:'white'}}
            />
        </TouchableOpacity>
    }

    render() {

        let statusBar = {
            backgroundColor:THEME_COLOR,
            barStyle:'light-content'
        }

        let navigationBar = <NavigationBar 
            title={'我的'}
            statusBar={statusBar}
            style ={{backgroundColor:THEME_COLOR}}
            rightButton={this.getRightButton()}
            leftButton={this.getLeftButton()}
        />

        return (
            <View style={style.container}>
                {navigationBar}
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
    }
})
