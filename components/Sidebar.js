import React, { Component } from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react';
import { Layout, Menu, Icon, Popover, Spin } from 'antd';
import Bread from './Bread'
import UserList from './UserList'
import LoginBorad from './LoginBorad';
import AdminList from './AdminList';
import LogList from './LogList';
import PackageList from './PackageList';
import PaymentList from './PaymentList';
import TokenList from './TokenList';
import ReportList from './ReportList';

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
        const { user, email, loading } = this.props.authStore
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
                                <Link href="/?id=user" as="/user">
                                    <a>
                                        <Icon type="user" style={{ fontSize: '2em' }} />
                                        <span>รายชื่อผู้ใช้งาน</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="payment">
                                <Link href="/?id=payment" as="/payment">
                                    <a>
                                        <Icon type="money-collect" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>รายการแจ้งชำระเงิน</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="catalog">
                                <Link href="/?id=catalog" as="/catalog">
                                    <a>
                                        <Icon type="appstore" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>หมวดหมู่สินค้า</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="package">
                                <Link href="/?id=package" as="/package">
                                    <a>
                                        <Icon type="build" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>แพคเกจ</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="adminlist">
                                <Link href="/?id=adminlist" as="/adminlist">
                                    <a>
                                        <Icon type="crown" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>รายชื่อ Admin</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="report">
                                <Link href="/?id=report" as="/report">
                                    <a>
                                        <Icon type="sound" theme='filled' style={{ fontSize: '2em' }} />
                                        <span>รีพอร์ท</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="token">
                                <Link href="/?id=token" as="/token">
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

                            <Spin size="large" tip="Loading Autorizacion..." spinning={loading}>
                                { user ?
                                this.props.id === null ? <UserList /> :
                                    this.props.id === "user" ? <UserList /> :
                                        this.props.id === "adminlist" ? <AdminList /> :
                                            this.props.id === "catalog" ? <LogList /> :
                                                this.props.id === "package" ? <PackageList /> :
                                                    this.props.id === "payment" ? <PaymentList /> :
                                                        this.props.id === "token" ? <TokenList /> :
                                                            this.props.id === "report" ? <ReportList /> : <UserList /> 
                                    : <LoginBorad />
                                }
                            </Spin>

                        <Footer style={{ textAlign: 'center' }}>
                            Livemall ©2018 v 0.18.11
                        </Footer>
                    </Layout>
                </div>
            </Layout>
        );
    }
}

export default Sidebar
