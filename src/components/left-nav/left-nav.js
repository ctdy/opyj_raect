import React,{Component} from "react";
import {Link,withRouter} from "react-router-dom";
import './left.less'
import logo from '../../assets/images/logo.png'
import { Menu, Icon,  } from 'antd';
import MenuList from "../../config/menuconfig";


const SubMenu = Menu.SubMenu
/*
左侧导航组件
 */
class LeftNav extends Component {
    /*
    根据meun的数据数组生成标签数组
    */
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
                        }
                    >
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    getMeunNodes = (menuList) => {
        return menuList.reduce((pre,item) => {
            //用item进行遍历
            //向pre添加<Menu.Item>
                if(!item.children){
                    pre.push(
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                }else {
                    //向pre添加<SubMenu>
                    pre.push(
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
                            }
                        >
                            {this.getMenuNodes_map(item.children)}
                        </SubMenu>
                    )
                }
                return pre

        },[])
    }

    render() {
        //得到当前请求的路由路径
        //不能这么用，当前组件不是路由组件，不能得到location，history，match，需要用高阶组件传属性
        const path = this.props.location.pathname
        return (
            <div  className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1 >硅谷后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    // defaultSelectedKeys={[path]}
                     selectedKeys={[path]}
                    >
                    {
                        // this.getMenuNodes_map(MenuList)

                        this.getMeunNodes(MenuList)
                    }

                </Menu>
            </div>
        )
    }
}
/*
传递三个属性： history，location，match
 */
export default withRouter(LeftNav)