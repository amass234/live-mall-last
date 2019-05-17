import React, { Component } from 'react'
import Head from '../components/head'
import Sidebar from '../components/Sidebar'
import { withRouter } from 'next/router'
import { inject, observer } from 'mobx-react';
import Login from '../components/Login';
import ReportList from '../components/ReportList';

@inject('authStore')
@observer
export class Report extends Component {
  render() {
    const { user } = this.props.authStore
    return (
      <div>
        <Head title="Report" />
        {
          user ? <Sidebar id={this.props.router.query.id}>
            <ReportList />
          </Sidebar> : <Login />
        }

      </div>
    )
  }
}

export default withRouter(Report)
