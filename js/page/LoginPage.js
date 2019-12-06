import React, { Component } from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'

export default class LoginPage extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>LoginPage</Text>
                <Button title={'返回上一页'} onPress={()=>{
                    const {navigation} = this.props
                    navigation.goBack()
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