import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Layout } from 'antd';
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;
const { Footer, Content } = Layout;

@inject('authStore')
@observer
export class LoginBorad extends Component {

    handleEmailChange = () => this.props.authStore.setEmail(email.value);
    handlePasswordChange = () => this.props.authStore.setPassword(password.value);

    componentDidMount() {
        this.props.authStore.getUser()
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        this.props.authStore.login2()
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading, user } = this.props.authStore
        return (
            <div>
                {!user ? <Layout>
                    <Content style={{ height: "100vh" }}>
                        <div className="login_page">
                            <Form onSubmit={this.handleSubmitForm} className="login-form">
                                <div style={{
                                    margin: ' 1em auto 5em ',
                                    textAlign: 'center',
                                }}>
                                    <img src='/static/ic_logo_square@3x.png' width="120" />
                                    <h6 style={{ fontWeight: '100', margin: 10 }}>Live Mall Control Panel</h6>
                                </div>
                                <h6 style={{ textAlign: 'center', margin: '1em', color: 'rgb(0, 124, 255)' }}>เข้าสู่ระบบ</h6>
                                <FormItem>
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Username"
                                            onChange={this.handleEmailChange}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            style={{ marginTop: '1.6em' }}
                                            type="password"
                                            placeholder="Password"
                                            onChange={this.handlePasswordChange}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: false,
                                    })(
                                        <Checkbox>เข้าสู่ระบบอัตโนมัติ</Checkbox>
                                    )}
                                    <Button style={{ background: '#28a745', marginTop: '3em' }} loading={loading} type="primary" htmlType="submit" className="login-form-button">
                                        Log in
            </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Livemall ©2018</Footer>
                </Layout> : null}
            </div>
        );
    }
}

export default Form.create()(LoginBorad)

