/*
 * @Author: your name
 * @Date: 2019-12-05 15:03:51
 * @LastEditTime: 2019-12-09 17:36:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/page/TrendingPage.js
 */
import React, { Component } from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'
import NavigationUtil from '../navigator/NavigationUtil'
// import {connect} from 'react-redux'
// import actions from '../action/index'

export default class FavoritePage extends Component {
    render() {
        const {navigation} = this.props
        return (
            <View style={style.container}>
                <Text>FavoritePage</Text>
                <Button title={'改变主题颜色'} onPress={()=>{
                    
                }}></Button>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

// const mapStateToProps = state => ({} )
// const mapDispatchToProps = dispatch => ({
//     onThemeChange : theme => dispatch(actions.onThemeChange(theme))
// })

// export default connect(mapStateToProps,mapDispatchToProps)(FavoritePage)