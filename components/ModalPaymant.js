import React, { Component } from 'react'
import { Button, Modal, Form, Input } from 'antd'
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;

@inject('depositStore')
@observer
export class ModalPaymant extends Component {

    state = { show: false }

    setName = () => this.props.depositStore.setName(username.value)
    setAmount = () => this.props.depositStore.setAmount(amount.value)
    setType = () => this.props.depositStore.setType(type.value)

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            }
        });
    }

    render() {
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
        const { getFieldDecorator } = this.props.form;
        const {
            id,
            isVerify,
            name,
            amount,
            type,
            created_at,
            slipL,
            handleOk,
            handleCancel
        } = this.props
        const { visible } = this.props.depositStore
        return (
            <div>
                <Modal
                    visible={visible}
                    style={{ top: 20 }}
                    title="จัดการข้อมูล"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={false}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="ชื่อ"
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'ใส่ชื่อ' }],
                                initialValue: name
                            })(
                                <Input disabled onChange={this.setName} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="จำนวนเงิน"
                        >
                            {getFieldDecorator('amount', {
                                rules: [{ required: true, message: 'ใส่จำนวนเงิน', }],
                                initialValue: amount
                            })(
                                <Input disabled onChange={this.setAmount} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ธนาคาร"
                        >
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: 'ใส่ชื่อธนาคาร', }],
                                initialValue: type
                            })(
                                <Input disabled onChange={this.setType} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="วันที่"
                        >
                            {getFieldDecorator('created_at', {
                                initialValue: created_at
                            })(
                                <Input disabled />
                            )}
                        </FormItem>
                        {/* <FormItem
                            {...formItemLayout}
                            label="เวลา"
                        >
                            {getFieldDecorator('tel', {
                                rules: [{
                                    type: 'tel', message: 'The input is not valid E-mail!',
                                }, {
                                    required: false, message: 'Please input your E-mail!',
                                }],
                                initialValue: amount
                            })(
                                <Input />
                            )}
                        </FormItem> */}
                        <FormItem
                            {...formItemLayout}
                            label="สลีปการโอน"
                        >
                            <img src={slipL} onClick={() => this.setState({ show: true })} height='200' />
                            <Modal
                                style={{ width: '100%', top: 20 }}
                                title="รูป"
                                visible={this.state.show}
                                onOk={() => this.setState({ show: false })}
                                onCancel={() => this.setState({ show: false })}
                                footer={null}
                            >
                                <img src={slipL} width='100%' />
                            </Modal>
                        </FormItem>
                        <FormItem>
                            <div className='footerModel' style={{ display: 'block' }}>
                                <Button
                                    type="default"
                                    style={{ background: '#00b42d' }}
                                    disabled={isVerify} key='Suspend account'
                                    onClick={() => this.props.depositStore.updateIsVerify(id)}
                                >อนุมัติ</Button>
                                <Button
                                    htmlType='submit'
                                    style={{ float: 'right' }}
                                    onClick={() => this.props.depositStore.updateDeposit(id)}
                                >ตกลง </Button>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(ModalPaymant)
