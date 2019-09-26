/*
能发送异步ajax请求的函数模块
封装axios库
函数返回值是一个promise对象
优化： 统一处理异常
    再外层包一个自己创建的promise对象
优化2：
    异步得到不是response， 而是response.data
    再请求成功resolve时： resolve(response.data)
 */

import axios from 'axios'
import {message} from "antd";

export default function ajax(url, data={}, type='GET') {
    return new Promise((resolve,reject) => {     //excutor是一个执行器
        let promise
        //执行异步请求
        if(type == 'GET'){ //发get请求
            promise = axios.get(url,{ //配置对象
                params: data  //指定请求对象
            })
        }else { //发post请求，两种请求用法不一样
            promise = axios.post(url, data)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求失败：' + error.message)
        })
    })
    // if(type == 'GET'){ //发get请求
    //    return axios.get(url,{ //配置对象
    //        params: data  //指定请求对象
    //    })
    // }else { //发post请求，两种请求用法不一样
    //     return axios.post(url, data)
    // }
}


// //请求登陆接口
// ajax('/login',{username:'Tom',password:'12345'},'POST').then()
// //添加用户
// ajax('/manage/user/add',{username:'Tom',password:'12345',phone: '12345678910',},'POST').then()