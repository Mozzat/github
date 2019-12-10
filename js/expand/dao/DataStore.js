/*
 * @Author: your name
 * @Date: 2019-12-10 17:16:17
 * @LastEditTime: 2019-12-10 18:02:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/expand/dao/DataStore.js
 */
import {AsyncStorage} from 'react-native'

export default class DataStore {

    /**
     * 1.保存数据
     * 
     * */ 
    saveData(url,data,callback) {
        if (!data || !url) {
            return;
        }
        AsyncStorage.setItem(url,JSON.stringify(this._wrapData(data)),callback)
    }
    
    /**
     * 获取本地数据
     * */ 
    fetchLocalData(url) {
        return new Promise((resolve,reject) => {
            AsyncStorage.getItem(url, (error , result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e);
                        console.log(e)
                    }
                } else {
                    reject(error)
                    console.error(error)
                }
            })
        })
    }

    /**
     * 1.获取网络数据
     * */ 
    fetchNetData(url) {
        return new Promise((resolve, reject) => {

            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Network response was not ok')
                })
                .then((responseData) => {
                    this.saveData(url,responseData)
                    resolve(responseData)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    fetchData(url){
        return new Promise((resolve,reject) => {
            this.fetchLocalData(url).then((wrapData) => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timeStamp)) {
                    resolve(wrapData)
                } else {
                    this.fetchNetData(url).then((data) => {
                        resolve(this._wrapData(data));
                    }).catch((error) => {
                        reject(error)
                    })
                }
            }).catch((error) => {
                this.fetchNetData(url).then((data) => {
                    resolve(this._wrapData(data))
                }).catch((error) => {
                    reject(error)
                })
            })
        })
    }

    /**
     * 时间校验
     * */ 
    static checkTimestampValid(timeStamp) {
        const currentDate = new Date()
        const targetDate = new Date()
        targetDate.setTime(timeStamp)
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 4) return false;
        return true;
    }

    _wrapData(data) {
        return {data:data, timeStamp: new Date().getTime()}
    }
}