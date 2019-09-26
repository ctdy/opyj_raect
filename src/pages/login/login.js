import React,{Component} from "react";
import './login.less'
import logo from './images/logo.png'
import {Form, Icon, Input, Button, message} from "antd";
import {reqLogin,reqAddUser} from '../../api'
import memoryUtils from "../../utils/memoryUtils";
import {Redirect} from 'react-router-dom'
import storageUtils from "../../utils/storageUtils";

const Item = Form.Item //不能写在import之前
class Login extends Component {
    handleSubmit = (e) => {
        //阻止事件的默认行为
         e.preventDefault()
         //  const form = this.props.form
         // //获取表单上的值
         // const values = form.getFieldsValue()
         //     console.log('handleSubmit',values);
        //对所有表单字段进行验证
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                //username,password不能随便命名，要和下面的username和password标识名一致
                 const {username,password} = values
                // reqLogin(username,password).then(response =>{
                //     console.log('成功',response.data)
                // }).catch(error => {
                //     console.log('失败')
                // })
                     //y用同步编码实现异步执行
                    const result = await reqLogin(username,password)
                    // console.log('请求成功',response.data)
                // const result = response.data //{status:0,data:user} ,{status:1,msg:xxx}
                if (result.status === 0){
                    //提示登陆成功
                    message.success('成功了')

                    const user = result.data
                    //存到内存里去
                    memoryUtils.user = user

                    storageUtils.saveUser(user)
                    console.log('store',storageUtils.getUser())

                    //跳转路由到管理界面
                    //在事件回调函数中实现跳转
                    this.props.history.replace('/Admin')

                }else {
                    message.error(result.msg)
                }
                // console.log('提交ajax请求: ', values);
            }else{
                console.log('校验失败')
            }
        });
    }
    validatePwd = (rule,value,callback) => {
        if(!value){
            callback('密码必须输入')
        }else if(value.length < 4) {
            callback('密码必须大于4')
        }else if(value.length > 12){
            callback('密码必须小于12')
        }else
//        callback('vslidatePwd',rule,value)  //验证通过
        callback()  //验证失败，输出xxxx
    }
    render() {
        const user = storageUtils.getUser()
        console.log('login',user)
        if(user && user._id){
            return <Redirect to='/Admin'/>
        }
        //得到具有强大功能的from对象
        //const form = this.props.form
        const {getFieldDecorator} = this.props.form
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>

                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                    //声明式验证，直接用别人写的
                                    rules: [
                                        {required:true,whiteSpace:true,message:'用户必须输入'},
                                        {min:4,message:'用户名至少4位'},
                                        {max:12,message:'用户名至多12位'},
                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或者下划线组成'},
                                    ],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />)
                            }
                                {/*<Input*/}
                                {/*    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
                                {/*    placeholder="用户名"*/}
                                {/*/>*/}
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [this.validatePwd]
                                })(
                                    <Input
                                        prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />)
                            }
                                {/*<Input*/}
                                {/*    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}*/}
                                {/*    type="password"*/}
                                {/*    placeholder="密码"*/}
                                {/*/>*/}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/*
1、高阶函数
    1). 一类特别的函数
        a.接收函数类型的参数
        b.返回值是函数
    2). 常见
        a.定时器
    3).高阶函数更具有扩展性
2、高阶组件
    1、本职是一个函数
    2、接收一个组件(被包装)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入特定的属性
    3、用来扩展一个组件的功能
    4、高阶组件也是高阶函数，接收一个组件函数，返回一个组件函数
 */
/*
包装Form组件生成一个新组件
新组件会向From组件传递一个强大的对象属性：from
程序从这里开始运行
 */
const WrapLogin = Form.create()(Login)
export default WrapLogin
/*
1、前台表单验证
2、收集表单数据
 */
/*
async和await
1. 作用？
    简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
    以同步编码(没有回调函数了)方式实现异步流程   (看到回调函数就是异步执行)
2. 哪里用await？
    再返回promise的表达式左侧写await： 不想要promise， 想要promise异步执行得到的value
3. 哪里写async？
    await所在函数（最近的）定义的左侧写async
 */