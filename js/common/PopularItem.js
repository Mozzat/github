/*
 * @Author: your name
 * @Date: 2019-12-11 10:59:47
 * @LastEditTime: 2019-12-11 18:15:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/common/PopularItem.js
 */
import React, { Component } from 'react'
import {View,Image,TouchableOpacity,Text,StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class PopularItem extends Component {
    render() {
        const {item} = this.props
        console.log(item,3333)
        if (!item || !item.owner) {
            return null;
        }
        let favoriteButton = <TouchableOpacity
                                style={{padding:6}}
                                onPress={()=>{

                                }}
                            >
                                <FontAwesome name={'star-o'} size={26} style={{color:'red'}}></FontAwesome>
                            </TouchableOpacity>
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.props.onSelect}>
                    <View style={styles.cell_container}>
                        <Text style={styles.title}>
                            {item.full_name}
                        </Text>
                        <Text style={styles.description}>
                            {item.description}
                        </Text>
                        <View style={styles.row}>
                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                <Text>Author:</Text>
                                <Image style={{height:22,width:22}}
                                    source={{uri:item.owner.avatar_url}} />
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text>Start:</Text>
                                <Text>{item.stargazers_count}</Text>
                            </View>
                            {favoriteButton}
                        </View>
                    </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cell_container:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderColor:'#ddd',
        borderWidth:0.5,
        borderRadius:2,
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2,
    },
    row:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:"#212121"
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:"#757575"
    }
})