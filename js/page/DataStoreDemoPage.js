/*
 * @Author: your name
 * @Date: 2019-12-10 11:39:59
 * @LastEditTime: 2019-12-10 18:01:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/page/FetchDemoPage.js
 */
import React, { Component } from 'react'
import {View,TextInput,StyleSheet,Button,Text,AsyncStorage,ScrollView} from 'react-native'
import DataStore from '../expand/dao/DataStore'

///https://api.github.com/search/reponsitories?q=java
const KEY ='Key'
export default class DataStoreDemoPage extends Component {

    constructor(props) {
        super(props)
        this.dataStore = new DataStore()
    }
    state = {
        showText:''
    }
    

    loadData =()=>{
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        console.log(url)
        this.dataStore.fetchData(url) 
            .then(data => {
                let showData = `初次加载时间：${new Date(data.timeStamp)} \n ${JSON.stringify(data.data)}`
                this.setState({
                    showText:showData
                })
            })
            .catch(error => {
                error && console.log(error.toString())    
            })
            
    }

    render() {
        return (
            <View style={style.container}>
                <Text>离线缓存框架简单实用简单实用</Text>
                <View style={style.search_container}>
                    <TextInput style={style.textInput} placeholder="要搜索的内容" onChangeText={text =>{
                        this.searchKey = text
                    }}/>
                    <Button title={'搜索'} onPress={()=>this.loadData()}/>
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

/*
 * @Author: your name
 * @Date: 2019-12-05 11:35:26
 * @LastEditTime: 2019-12-05 14:41:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Github/js/page/DetialPage.js
 */
// import React, { Component } from 'react'
// import {View,Text,StyleSheet,Button} from 'react-native'

// export default class AsyncStrageDemo extends Component {
//     render() {
//         return (
//             <View style={style.container}>
//                 <Text>AsyncStrageDemo</Text>
//                 <Button title={'返回上一页'} onPress={()=>{
//                     const {navigation} = this.props
//                     navigation.goBack()
//                 }}></Button>
//             </View>
//         )
//     }
// }

// const style = StyleSheet.create({
//     container:{
//         flex:1,
//         alignItems:'center',
//         justifyContent:'center'
//     }
// })