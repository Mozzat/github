/*
 * @Author: your name
 * @Date: 2019-12-09 15:10:50
 * @LastEditTime: 2019-12-11 18:04:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/action/theme/index.js
 */
import Types from '../types'
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore'
import { handleData } from '../ActionUtil'

/**
 *
 *
 * @export 获取最热数据的异步action
 * @param {*} storeName 缓存的名称
 * @param {*} url 链接
 * @param {*} pageSize 
 * @returns
 */
export function onRefreshTrending(storeName,url,pageSize) {
    return dispatch => {
        dispatch({type:Types.POPULAR_REFRESH,storeName:storeName})
        let dataStore = new DataStore()
        dataStore.fetchData(url,FLAG_STORAGE.flag_trending) //异步action与数据流
            .then(data => {
                handleData(Types.TRENDING_REFRESH_SUCCESS,dispatch,storeName,data,pageSize)
            })
            .catch(error=>{
                console.log(error)
                dispatch({type:Types.POPULAR_REFRESH_FAIL,storeName,error})
            })
    }
}


/**
 *
 * 上拉加载更多
 * @export
 * @param {*} storeName
 * @param {*} pageIndex 第几页
 * @param {*} pageSize  每页展示条数
 * @param {[]} dataArray 原始数据
 * @param {*} callback 回调函数,可以通过回调函数来向调用页面通信:比如异常信息的展示，没有更多等待
 */
export function onLoadMoreTrending(storeName,pageIndex,pageSize,dataArray:[],callback) {
    console.log(dataArray,'数组')
    return dispatch => {
        setTimeout(() => { //模拟网络请求
            if ((pageIndex-1)*pageSize >= dataArray.length) { //已加载完全不数据
                if (typeof callback === 'function') {
                    callback('no more')
                }
                dispatch({
                    type:Types.TRENDING_LOAD_MORE_FAIL,
                    error:'no more data',
                    storeName:storeName,
                    pageIndex:--pageIndex,
                    projectModes:dataArray
                })
            } else {
                //本次和载入的最大的数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
                dispatch({
                    type:Types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes:dataArray.slice(0,max)
                })
            }
        }, 500);
    }

}


/**
 *
 * 处理下拉刷新的数据
 * @param {*} dispatch
 * @param {*} storeName
 * @param {*} data
 * @param {*} pageSize 
 */
// function handleData(dispatch,storeName,data,pageSize) {

//     let fixItems = []
//     if (data && data.data && data.data.items) {
//         fixItems=data.data.items
//     }

//     dispatch({
//         type:Types.POPULAR_REFRESH_SUCCESS,
//         items:fixItems,
//         projectModes:pageSize>fixItems.length ? fixItems : fixItems.slice(0,pageSize),//第一次要加载数据
//         storeName,
//         pageIndex:1
//     })
// }