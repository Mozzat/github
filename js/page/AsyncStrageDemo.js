/*
 * @Author: your name
 * @Date: 2019-12-10 11:39:59
 * @LastEditTime: 2019-12-10 16:55:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/page/FetchDemoPage.js
 */
import React, { Component } from 'react'
import {View,TextInput,StyleSheet,Button,Text,AsyncStorage} from 'react-native'

///https://api.github.com/search/reponsitories?q=java
const KEY ='Key'
export default class AsyncStrageDemo extends Component {

    state = {
        showText:''
    }

    //存储数据
    doSave = () => {
        console.log('dosave')
        AsyncStorage.setItem(KEY,this.value)
            .catch(e => {
                console.log(e.toString())
            })
    }

    doRemove = () => {
        AsyncStorage.removeItem(KEY)
            .catch(e => {
                console.log(e.toString())
            })
    }

    getData = () => {
        AsyncStorage.getItem(KEY)
            .then(res => {
                console.log(res,111)
                this.setState({
                    showText:res || '没有取到数据'
                })
            })
            .catch(e => {
                console.log(e.toString())
            })
    }

    render() {
        return (
            <View style={style.container}>
                <Text>AsyncStorage简单实用</Text>
                <TextInput style={style.textInput} placeholder={'存储的数据'} onChangeText={(text) =>{
                    this.value = text
                }}/>
                <View style={style.menuStyle}>
                    <Text onPress={()=> this.doSave()}>存储</Text>
                    <Text onPress={()=> this.doRemove()}>删除</Text>
                    <Text onPress={()=> this.getData()}>获取</Text>
                </View>
                <Text style={{color:"red"}}>{this.state.showText}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    search_container:{
        flexDirection:'row',
        marginTop:20,
    },
    textInput:{
        margin:20,
        borderColor:'black',
        borderWidth:1,
        height:40
    },
    menuStyle :{
        justifyContent:'space-around',
        flexDirection:'row',
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