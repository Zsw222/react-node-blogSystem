import React, { Component } from 'react';
import './LoginUser.less'
import { message, Form, Icon, Input, Button } from 'antd';
import BGParticle from '../../utils/BGParticle'
import { _login } from '../../api/api'
import { from } from 'rxjs';
// import {getData, postData} from "../../api/http.js/index.js"
const url = 'https://zsw-1258369569.cos.ap-chengdu.myqcloud.com/884c994906e05a0e2b2009e405039' +
    '64c.jpg'
class LoginUser extends Component {
    state = {
        url: '', //背景图片
    }
    //载入页面时的一些处理
    initPage = () => {
        this
            .loadImageAsync(url)
            .then(url => {
                this.setState({ loading: false, url })
            })
            .then(() => {
                // 为什么写在then里？id为backgroundBox的DOM元素是在loading为false时才有，而上面的setState可能是异步的，必须等到set
                // State执行完成后才去获取dom
                this.particle = new BGParticle('LoginUser')
                this
                    .particle
                    .init()
            })
    }
    //登录的背景图太大，等载入完后再显示，实际上是图片预加载，
    loadImageAsync(url) {
        return new Promise(function (resolve, reject) {
            const image = new Image();
            image.onload = function () {
                resolve(url);
            };
            image.onerror = function () {
                console.log('图片载入错误')
            };
            image.src = url;
        });
    }
    componentDidMount() {
        this.initPage()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {
                    // 请求登录接口
                    _login(values).then(res => {

                        if (res.code !== 200) {
                            message.error(res.msg);
                            return
                        }
                        message.success('登录成功');
                        sessionStorage.setItem("token", res.token)
                        this
                            .props
                            .history
                            .push('/Main/Home')
                    }
                    )

                }
            });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id='LoginUser'>

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名!'
                                }
                            ]
                        })(
                            <Input
                                prefix={< Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码!'
                                }
                            ]
                        })(
                            <Input
                                prefix={< Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>

                    </Form.Item>
                </Form>
            </div>

        )
    }
}
const QUE = Form.create()(LoginUser)
export default QUE