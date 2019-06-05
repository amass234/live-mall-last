import React, { Component } from 'react'
import { Breadcrumb, Icon } from 'antd';
import Link from 'next/link'

export class Bread extends Component {
    render() {
        return (
            <div style={{ margin: '-8px 0', padding: 24, background: '#fff' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                        <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href="/?id=user" as="/user">
                            <a>
                                <span>Live Mall</span>
                            </a>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {this.props.page}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}

export default Bread
