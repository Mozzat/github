/*
 * @Author: your name
 * @Date: 2019-12-09 15:10:50
 * @LastEditTime: 2019-12-09 15:46:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /github/js/action/theme/index.js
 */
import Types from '../types'

export function onThemeChange(theme) {
    return {type:Types.THEME_CHANGE,theme : theme}
}