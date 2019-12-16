/*
 * @Author: your name
 * @Date: 2019-12-09 15:13:53
 * @LastEditTime: 2019-12-09 15:46:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /github/js/action/index.js
 */
import {onThemeChange} from './theme'
import {onRefreshPopular,onLoadMorePopluar} from './popular'
import {onRefreshTrending,onLoadMoreTrending} from './trending'

export default {
    onThemeChange,
    onRefreshPopular,
    onLoadMorePopluar,
    onRefreshTrending,
    onLoadMoreTrending,
}