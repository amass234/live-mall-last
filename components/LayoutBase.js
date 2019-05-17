import React, { Component } from 'react'
import { Layout } from 'antd'

const { Content } = Layout;

class LayoutBase extends Component {
    render() {
        return (
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                {this.props.children}
            </Content>
        )
    }
}

export default LayoutBase