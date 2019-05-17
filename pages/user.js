import React, { Component } from 'react'
import Head from '../components/head'
import Sidebar from '../components/Sidebar'
import { withRouter } from 'next/router'
import UserList from '../components/UserList'
import { inject, observer } from 'mobx-react';
import Login from '../components/Login';

@inject('authStore')
@observer
class User extends Component {
    render() {
        const { user } = this.props.authStore
        return (
            <div>
                <Head title="User" />
                {
                    user ?
                        <Sidebar id={this.props.router.query.id}>
                            <UserList />
                        </Sidebar> : <Login />
                }
            </div>
        )
    }
}

export default withRouter(User)
