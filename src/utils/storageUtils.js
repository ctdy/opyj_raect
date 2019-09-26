/*
进行
 */
import store from 'store'

const key = 'user_key'
export default {
    saveUser(user){
        //localStorage.setItem(key,JSON.stringify(user))
        store.set(key,user)
    },

    getUser(){
        //不要让localStorage为null，容易报错，最好弄成{}
        //{}加''是要他变成josn格式的字符串
        //return JSON.parse(localStorage.getItem(key) || '{}')
        return store.get(key) || {}
    },
    removeUser(){
        store.remove(key)
    }
}