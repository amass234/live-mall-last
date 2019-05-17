import React, { Component } from 'react'
import { Table, Form, Input, Modal, Button } from 'antd'
import { inject, observer } from 'mobx-react';
import LayoutBase from './LayoutBase';

const FormItem = Form.Item;
const columns = [{
    title: 'Session Id',
    dataIndex: 'sessionId',
    key: 'sessionId',
}, {
    title: 'Sub Token',
    dataIndex: 'subToken',
    key: 'subToken',
}, {
    title: 'Pub Token',
    dataIndex: 'pubToken',
    key: 'pubToken',
}];

@inject('commonStore')
@observer
export class TokentList extends Component {

    state = { visible: false }

    componentDidMount() {
        this.props.commonStore.getToken()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.commonStore.newToken()
                this.setState({ visible: false });
            } else if (err) console.log(err)
        });
    }

    setsessionId = () => this.props.commonStore.setsessionId(sessionId.value)
    setpubToken = () => this.props.commonStore.setpubToken(pubToken.value)
    setsubToken = () => this.props.commonStore.setsubToken(subToken.value)
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visible: false, visibleCreate: false });
    }

    showModalCreate = () => {
        this.setState({ visible: true })
    }

    render() {
        const { token, loading } = this.props.commonStore
        const { visible } = this.state
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const output = [...new Map(token.map(o => [o.id, o])).values()]
        return (
            <div>
                <LayoutBase>
                    <Button onClick={this.showModalCreate} type="dashed" icon="plus" block>เพิ่มข้อมูล</Button>
                    <div style={{ marginTop: 20 }}>
                        <Table
                            loading={loading}
                            columns={columns}
                            dataSource={output}
                        />
                    </div>
                    <div>
                        <Modal
                            visible={visible}
                            style={{ top: 20 }}
                            title="จัดการข้อมูล"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={false}
                        >
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    {...formItemLayout}
                                    label="Session Id"
                                >
                                    {getFieldDecorator('sessionId', {
                                        rules: [{ required: true, message: 'ใส่ sessionId' }],
                                    })(
                                        <Input onChange={this.setsessionId} />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Sub Token"
                                >
                                    {getFieldDecorator('subToken', {
                                        rules: [{ required: true, message: 'ใส่ subToken', }],
                                    })(
                                        <Input onChange={this.setsubToken} />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Pub Token"
                                >
                                    {getFieldDecorator('pubToken', {
                                        rules: [{ required: true, message: 'ใส่ pubToken', }],
                                    })(
                                        <Input onChange={this.setpubToken} />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <div className='footerModel' style={{ display: 'block' }}>
                                        <Button
                                            type="default"
                                            htmlType='submit'
                                            style={{ background: '#00b42d' }}
                                        >เพิ่มข้อมูล</Button>
                                    </div>
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                </LayoutBase>
            </div>
        )
    }
}

export default Form.create()(TokentList)
