import React, { Component } from 'react'
import Head from '../components/head'
import Sidebar from '../components/Sidebar'
import { withRouter } from 'next/router'
import AdminList from '../components/AdminList';
import { inject, observer } from 'mobx-react';
import Login from '../components/Login';

@inject('authStore')
@observer
class Admin extends Component {
    render() {
        const { user } = this.props.authStore
        return (
            <div>
                <Head title="User" />
                {
                    user ?
                        <Sidebar id={this.props.router.query.id}>
                            <AdminList />
                        </Sidebar> : <Login />
                }
            </div>
        )
    }
}

export default withRouter(Admin)
