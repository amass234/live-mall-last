import React, { Component } from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react';
import { Layout, Menu, Icon, Popover } from 'antd';
import Bread from './Bread'

const { Header, Sider, Footer } = Layout;

@inject('commonStore', 'authStore')
@observer
export class Sidebar extends Component {

    componentDidMount() {
        this.props.authStore.getUser()
    }

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    logOut = () => this.props.authStore.logOut()

    render() {
        const { appname } = this.props.commonStore
        const { user, email } = this.props.authStore
        const content = (
            <div>
                <a onClick={this.logOut}>Log Out</a>
            </div>
        );

        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => { console.log(broken); }}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                    <div className="logo">
                        <img src='/static/ic_logo_square@3x.png' width='40' height='40' alt='logo' />
                        <h5 style={{ color: '#fff' }}>{appname}</h5>
                    </div>
                    <div className="menubar">
                        <Menu theme="dark" mode="inline" selectedKeys={[this.props.id]}>
                            <Menu.Item key="user">
                                <Link href="/user?id=user">
                                    <a>
                                        <Icon type="user" style={{ fontSize: '2em' }} />
                                        <span>รายชื่อผู้ใช้งาน</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="payment">
                                <Link href="/payment?id=payment">
                                    <a>
                                        <Icon type="money-collect" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>รายการแจ้งชำระเงิน</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="catalog">
                                <Link href="/catalog?id=catalog">
                                    <a>
                                        <Icon type="appstore" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>หมวดหมู่สินค้า</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="package">
                                <Link href="/package?id=package">
                                    <a>
                                        <Icon type="build" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>แพคเกจ</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="adminlist">
                                <Link href="/admin?id=adminlist">
                                    <a>
                                        <Icon type="crown" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>รายชื่อ Admin</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="report">
                                <Link href="/report?id=report">
                                    <a>
                                        <Icon type="sound" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>รีพอร์ท</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="token">
                                <Link href="/token?id=token">
                                    <a>
                                        <Icon type="lock" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>Token</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Sider>
                <div className="mainLayout">
                    <Layout>
                        <Header className="headerbar">
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                <h6 style={{ marginRight: 10 }}>
                                    <img src='/static/ic_logo_square@3x.png' width='40' height='40' alt='logo' />
                                    <span style={{ marginLeft: 10 }} />{appname}
                                    {!user ? <Link href='/login' > Login</Link>
                                        :
                                        <Popover placement='bottomRight' content={content}> {email} </Popover>
                                    }
                                </h6>
                            </div>
                        </Header>
                        <Bread page={this.props.id} />
                        {this.props.children}
                        <Footer style={{ textAlign: 'center' }}>
                            Livemall ©2018 Created by COMIOX
                        </Footer>
                    </Layout>
                </div>
            </Layout>
        );
    }
}

export default Sidebar
