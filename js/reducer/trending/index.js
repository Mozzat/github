/*
 * @Author: your name
 * @Date: 2019-12-11 09:11:09
 * @LastEditTime: 2019-12-11 17:35:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/js/reducer/popular/index.js
 */
import Types from '../../action/types'

const defaultState = {

}


/**
 *popular:{
      java:{
          items:[],
          isLoading:false
      },
      ios:{
          items:[],
          isLoading:false
      }
 }
 * state 树，横向扩展
 * 1.如何动态的设置store，和动态获取store(难点:storekey不固定)
 * @export
 * @param {*} [state=defaultState]
 * @param {*} action
 * @returns
 */
export default function onAction(state=defaultState,action) {

    switch (action.type) {
        case Types.TRENDING_REFRESH_SUCCESS: //下拉刷新成功
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    items:action.items,
                    projectModes:action.projectModes,
                    isLoading:false,
                    hideLoadingMore:true,
                    pageIndex:action.pageIndex
                }
            }
        case Types.TRENDING_REFRESH : //下拉刷新
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:true,
                    hideLoadingMore:true,
                }
            }
        case Types.TRENDING_REFRESH_FAIL : //下拉刷新失败
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:false,
                    hideLoadingMore:true,
                }
            }
        case Types.TRENDING_LOAD_MORE_SUCCESS: //上拉加载更多成功
        return {
            ...state,
            [action.storeName]:{
                ...state[action.storeName],
                projectModes:action.projectModes,
                hideLoadingMore:true,
                pageIndex:action.pageIndex
            }
        }
        case Types.TRENDING_LOAD_MORE_FAIL: //上拉加载更多失败
        return {
            ...state,
            [action.storeName]:{
                ...state[action.storeName],
                hideLoadingMore:true,
                pageIndex:action.pageIndex
            }
        }
        
        default:
            return state;
    }
}