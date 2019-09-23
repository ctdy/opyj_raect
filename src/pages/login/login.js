import React,{Component} from "react";
import './login.less'
import logo from './images/logo.png'
import {Form,Icon,Input,Button} from "antd";

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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('提交ajax请求: ', values);
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
        }else if(/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或者下划线组成')
        }else
//        callback('vslidatePwd',rule,value)  //验证通过
        callback()  //验证失败，输出xxxx
    }
    render() {
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
3、
 */