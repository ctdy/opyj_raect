/**
 * 应用的组件
 */
import React,{Component} from 'react'
import {BrowserRouter,Route,Switch,HashRouter} from 'react-router-dom';

import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

export default class App extends Component{


    render(){
        const user = storageUtils.getUser()
        console.log('index',user)
        memoryUtils.user = user
        return (
           <BrowserRouter>
               <Switch>{/*只匹配其中一个*/}
                   <Route path='/login' component={Login}></Route>
                   <Route path='/' component={Admin}></Route>
               </Switch>
           </BrowserRouter>
        )

    }
}