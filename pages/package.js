import React, { Component } from 'react'
import Head from '../components/head'
import Sidebar from '../components/Sidebar'
import { withRouter } from 'next/router'
import PackageList from '../components/PackageList'
import { inject, observer } from 'mobx-react';
import Login from '../components/Login';

@inject('authStore')
@observer
class packlist extends Component {
    render() {
        const { user } = this.props.authStore
        return (
            <div>
                <Head title="package" />
                {
                    user ? <Sidebar id={this.props.router.query.id}>
                        <PackageList />
                    </Sidebar> : <Login />
                }

            </div>
        )
    }
}

export default withRouter(packlist)
