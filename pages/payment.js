import React, { Component } from 'react'
import Head from '../components/head'
import Sidebar from '../components/Sidebar'
import { withRouter } from 'next/router'
import PaymentList from '../components/PaymentList';
import { inject, observer } from 'mobx-react';
import Login from '../components/Login';

@inject('authStore')
@observer
export class Payment extends Component {
  render() {
    const { user } = this.props.authStore
    return (
      <div>
        <Head title="Payment" />
        {
          user ? <Sidebar id={this.props.router.query.id}>
            <PaymentList />
          </Sidebar> : <Login />
        }

      </div>
    )
  }
}

export default withRouter(Payment)
