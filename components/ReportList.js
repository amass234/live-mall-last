import React, { Component } from 'react'
import Link from 'next/link'
import { Table, Form, Select, Input, Tag, Modal, Button } from 'antd'
import { Col, Row } from 'reactstrap'
import { inject, observer } from 'mobx-react';
import LayoutBase from './LayoutBase';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
},{
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
}, {
    title: 'Message',
    dataIndex: 'msg',
    key: 'msg',
}, {
    title: 'OS',
    dataIndex: 'os',
    key: 'os',
}, {
    title: 'Tel',
    dataIndex: 'tel',
    key: 'tel',
}, {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
}];

@inject('commonStore')
@observer
export class ReportList extends Component {

    componentDidMount() {
        this.props.commonStore.getReport()
    }

    render() {
        const { list, loading } = this.props.commonStore
        const output = [...new Map(list.map(o => [o.id, o])).values()]

        return (
            <div>
                <LayoutBase>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={output}
                    />
                </LayoutBase>
            </div>
        )
    }
}

export default ReportList
