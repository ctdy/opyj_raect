import React,{Component} from "react";
import memoryUtils from "../../utils/memoryUtils";
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";

import Role from "../role/role.js";
import Home from "../home/home.js";
import Category from "../category/category.js";
import Bar from "../charts/bar.js";
import Line from "../charts/line.js";
import Pie from "../charts/pie.js";
import Product from "../product/product.js";
import User from "../user/user.js";




export default class Admin extends Component {


    render() {
        const {Footer, Sider, Content } = Layout;
        const user = memoryUtils.user
        //如果内存没有存储user ==》 当前没有登陆
        //刷新之后内存中的值被清空
        if (!user || !user._id){
            //自动跳转到登陆页面(这是再render中实现跳转)，要与在回调函数中实现的跳转区分开来
            return <Redirect to='/login' />
        }
        return (
                <Layout style={{height:'100%'}}>
                    <Sider style={{height: '100%'}}>
                        <LeftNav></LeftNav>
                    </Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{backgroundColor: '#fff'}}>
                            content
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/user' component={User}/>
                                <Route path='/charts/line' component={Line}/>
                                <Route path='/charts/bar' component={Bar}/>
                                <Route path='/charts/pie' component={Pie}/>
                                <Redirect to='/home'/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign:'center',color:'#ccccc'}}>推荐使用谷歌浏览器，可以获得更佳的页面操作体验</Footer>
                    </Layout>
                </Layout>
        )
    }
}