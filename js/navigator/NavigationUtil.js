/*
 * @Author: your name
 * @Date: 2019-12-05 14:27:19
 * @LastEditTime: 2019-12-06 11:01:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Github/js/navigator/NavigationUtil.js
 */

/**
 *
 * 全局导航跳转控制类
 * @export
 * @class NavigationUtil
 */
export default class NavigationUtil {


    /**
     *
     * 跳转到指定的控制器
     * @static
     * @param {*} params
     * @param {*} page
     * @returns
     * @memberof NavigationUtil
     */
    // static goPages(params,page) {

    //     const {navigation} = NavigationUtil.navigation 
    //     if (!navigation) {
    //         console.log('NavigationUtil.navigation控制器不存在')
    //         return;
    //     }
    //     navigation.navigate(
    //         page,
    //         {...params}
    //     )
    // }
    static goPage(params, page) {
        console.log('1')
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be null')
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }

    /**
     *
     *
     * @static 重置到首页
     * @param {*} params
     * @memberof NavigationUtil
     */
    static resetToHomePage(navigation) {
        navigation.navigate('Main')
    }


    /**
     *
     *
     * @static 返回上一页
     * @param {*} navigation
     * @memberof NavigationUtil
     */
    static goBack(navigation) {
        navigation.goBack()
    }

}