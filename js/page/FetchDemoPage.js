/*
 * @Author: your name
 * @Date: 2019-12-10 11:39:59
 * @LastEditTime: 2019-12-10 14:59:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/page/FetchDemoPage.js
 */
import React, { Component } from 'react'
import {View,TextInput,StyleSheet,Button,Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

///https://api.github.com/search/reponsitories?q=java
export default class FetchDemoPage extends Component {

    state = {
        showText:''
    }
    loadData =()=>{
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        console.log(url)
        fetch(url)
            .then(response => response.text())
            .then(responseJson =>{
                this.setState({
                    showText:responseJson
                })
            })
    }

    loadData2 =()=>{
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}` 
        console.log(url)
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
                throw new Error('NetWork response wes not ok')
            })
            .then(responseJson =>{
                this.setState({
                    showText:responseJson
                })
            })
            .catch(e => {
                this.setState({
                    showText:e.toString()
                })
            })
    }

    render() {
        return (
            <View style={style.container}>
                <Text>Fetch简单实用</Text>
                <View style={style.search_container}>
                    <TextInput style={style.textInput} placeholder="要搜索的内容" onChangeText={text =>{
                        this.searchKey = text
                    }}/>
                    <Button title={'搜索'} onPress={()=>this.loadData2()}/>
                </View>
                <ScrollView style={{marginTop:20}}>
                    <Text>{this.state.showText}</Text>
                </ScrollView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        // justifyContent:'center'
    },
    search_container:{
        flexDirection:'row',
        marginTop:20,
    },
    textInput:{
        marginLeft:10,
        marginRight:10,
        borderColor:'black',
        borderWidth:1,
        width:300

    }
})