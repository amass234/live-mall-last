import React, { Component } from 'react'
import { Table, Form, Select, Input, } from 'antd'
import { Col, Row } from 'reactstrap'
import LayoutBase from './LayoutBase';
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;
const Option = Select.Option;

// function handleChange(value) {
//     console.log(`selected ${value}`);
// }
// function onChange(pagination, filters, sorter) {
//     console.log('params', pagination, filters, sorter);
// }

@inject('userStore')
@observer
class AdminList extends Component {

    state = {
        word: '',
        data: []
    }

    async componentDidMount() {
        await this.props.userStore.getUser()
    }

    searchingFor = (word) => {
        return x => {
            return x.username.toLowerCase().includes(word.toLowerCase()) || !word;
        }
    }

    searchingForAdmin = () => this.setState({ word: search.value })

    render() {
        const { data, loading } = this.props.userStore
        const output = data.filter(i => i.role === 'admin')
        const outputSearch = output.filter(this.searchingFor(this.state.word))
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 10 },
                md: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
                md: { span: 14 },
            },
        };
        const columns = [{
            title: 'ชื่อ',
            dataIndex: 'username',
        }, {
            title: 'E-mail',
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email - b.email,
        }, {
            title: 'เบอร์ติดต่อ',
            dataIndex: 'phone_no',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.tel - b.tel,
        }, {
            title: 'ประเภท',
            dataIndex: 'role',
        }
        ];
        return (
            <LayoutBase>
                <div style={{ margin: '1em 0 1em 0' }}>
                    <Form>
                        <Row>
                            <Col sm="4">
                                <FormItem {...formItemLayout} label="รายชื่อ Admin">
                                    {getFieldDecorator('search')(
                                        <Input placeholder=" ค้นหา" onChange={this.searchingForAdmin} />
                                    )}
                                </FormItem>
                            </Col>
                            {/* <Col sm="6">
                                <FormItem {...formItemLayout} label="ประเภทผู้ใช้งาน">
                                    {getFieldDecorator('searchs')(
                                        <Select
                                            style={{ width: 120 }}
                                            onChange={handleChange}
                                            placeholder="ประเภท"
                                        >
                                            <Option value="jack">admin</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col> */}
                        </Row>
                    </Form>
                </div>
                <Table columns={columns} loading={loading} dataSource={outputSearch} />
            </LayoutBase>
        )
    }
}

export default Form.create()(AdminList)
