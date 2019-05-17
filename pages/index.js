import React from 'react'
import { withRouter } from 'next/router'
import Login from '../components/Login';
import Head from '../components/head'

const Home = () => (
  <div>
    <Head title="Login Live Mall" />
    <Login/>
  </div>
)

export default withRouter(Home)
