import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Head from '../components/head'
import Sidebar from '../components/Sidebar';

class Home extends Component {
  render() {
    return (
      <div>
        <Head title="Login Live Mall" />
        <Sidebar id={this.props.router.query.id} />
      </div>
    )
  }
}

export default withRouter(Home)
