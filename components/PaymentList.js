import React, { Component } from 'react'
import Link from 'next/link'
import { Table, Form, Select, Input, Tag, Modal, Button } from 'antd'
import { Col, Row } from 'reactstrap'
import { inject, observer } from 'mobx-react';

import CardPayment from './CardPayment';
import ModalPaymant from './ModalPaymant';
import LayoutBase from './LayoutBase';

function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
}

const FormItem = Form.Item;
const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

@inject('depositStore')
@observer
export class PaymentList extends Component {

    state = {
        loading: false,
        visible: false,
        show: false,
        word: '',
        bank: '',
    }

    componentDidMount() {
        this.props.depositStore.getDeposit()
    }

    showModal = (
        isVerify,
        name,
        amount,
        type,
        created_at,
        slip,
        id,
        email,
        package_id,
        bank,
        pay_date,
        pay_time
    ) => {
        this.setState({
            isVerify,
            name,
            amount,
            type,
            created_at,
            slip,
            id,
            email,
            package_id,
            bank,
            pay_date,
            pay_time
        });
        this.props.depositStore.visible = true
        this.props.depositStore.name = name
        this.props.depositStore.amount = amount
        this.props.depositStore.type = type
        this.props.form.setFieldsValue({
            isVerify,
            name,
            amount,
            type,
            created_at,
            slip,
            bank,
            pay_date,
            pay_time
        })
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    handleCancel = () => {
        this.props.depositStore.visible = false
    }

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
    searchingForAdmin = () => this.setState({ word: search.value })

    searchingFor = (word) => {
        return x => {
            return x.name.toLowerCase().includes(word.toLowerCase()) || !word;
        }
    }
    render() {
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
            key: 'name',
            title: 'ชื่อผู้แจ้ง',
            render: (text, record) => {
                return <div><span>{record.name}</span><span style={{
                    marginLeft: 5, color: '#ccc'
                }}>{record.type}</span></div>
            },
            sorter: (a, b) => a.name - b.name,
        }, , {
            key: 'email',
        }, {
            key: 'amount',
            title: 'จำนวนเงิน',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.amount - b.amount,
        }, {
            key: 'package_id',
        }, {
            key: 'bank',
            title: 'ธนาคาร',
            dataIndex: 'bank',
            defaultSortOrder: 'descend',
        }, {
            key: 'created_at',
            title: 'วันและเวลา',
            render: (text, record) => `${record.pay_date} ${record.pay_time}`,
            onFilter: (value, record) => record.pay_date.indexOf(value) === 0,
            sorter: (a, b) => a.pay_date.localeCompare(b.pay_date),
        }, {
            key: 'slip',
        }, {
            key: 'id',
        }, {
            key: 'isVerify',
            title: 'สถานะ',
            dataIndex: 'isVerify',
            render: (text, record) => (
                <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ marginBottom: 10 }}>
                        {record.isVerify ? <Tag color="#87d068">อนุมัติ</Tag> :
                            <Tag color="#f50">ยังไม่ได้อนุมัติ</Tag>}
                    </div>
                    <a href="javascript:;"
                        onClick={
                            () => this.showModal(
                                record.isVerify,
                                record.name,
                                record.amount,
                                record.type,
                                record.created_at,
                                record.slip,
                                record.id,
                                record.email,
                                record.package_id,
                                record.bank,
                                record.pay_date,
                                record.pay_time
                            )
                        }>จัดการ</a>
                </span>
            ),
        }];

        const { depositList, loading, visible } = this.props.depositStore
        const output = [...new Map(depositList.map(o => [o.id, o])).values()]
        const outputSearch = output.filter(this.searchingFor(this.state.word))
        const {
            isVerify,
            name,
            amount,
            type,
            created_at,
            slip,
            id,
            email,
            package_id,
            bank,
            pay_date,
            pay_time
        } = this.state
        return (
            <div>
                <CardPayment />
                <LayoutBase>
                    <div style={{ margin: '1em 0 1em 0' }}>
                        <Form>
                            <Row>
                                <Col sm="4">
                                    <FormItem {...formItemLayout} label="ชื่อผู้แจ้ง">
                                        {getFieldDecorator('search')(
                                            <Input placeholder=" ค้นหา" onChange={this.searchingForAdmin} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col sm="6">
                                    <FormItem {...formItemLayout} label="ธนาคาร">
                                        {getFieldDecorator('searchs')(
                                            <Select
                                                style={{ width: 250 }}
                                                onChange={value => this.setState({ bank: value })}
                                                placeholder="ธนาคาร"
                                            >
                                                <Option value={false}>ทั้งหมด</Option>
                                                <Option value="ธนาคารกรุงเทพ จำกัด (มหาชน)">ธนาคารกรุงเทพ จำกัด (มหาชน)</Option>
                                                <Option value="ธนาคารกรุงไท​ย จำกัด (มหาชน)">ธนาคารกรุงไท​ย จำกัด (มหาชน)</Option>
                                                <Option value="ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)">ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)</Option>
                                                <Option value="ธนาคารกสิกรไทย จำกัด (มหาชน)">ธนาคารกสิกรไทย จำกัด (มหาชน)</Option>
                                                <Option value="ธนาคารเกียรตินาคิน จำกัด (มหาชน)​​​">ธนาคารเกียรตินาคิน จำกัด (มหาชน)​​​</Option>
                                                <Option value="​ธนาคารซีไอเอ็มบี ไทย จำกัด (มหาชน)">​ธนาคารซีไอเอ็มบี ไทย จำกัด (มหาชน)</Option>
                                                <Option value="ธนาคารทหารไทย จำกัด (มหาชน)">ธนาคารทหารไทย จำกัด (มหาชน)</Option>
                                                <Option value="ธนาคารทิสโก้ จำกัด (มหาชน)">ธนาคารทิสโก้ จำกัด (มหาชน)</Option>
                                                <Option value="ธนาคารไทยพาณิชย์ จำกัด (มหาชน)">ธนาคารไทยพาณิชย์ จำกัด (มหาชน)</Option>
                                                <Option value="ธนาคาร​ธนชาต จำกัด (มหาชน)">ธนาคาร​ธนชาต จำกัด (มหาชน) </Option>
                                                <Option value="ธนาคารยูโอบี จำกัด (มหาชน)">ธนาคารยูโอบี จำกัด (มหาชน)</Option>
                                                <Option value="ธน​าคารแลนด์ แอนด์ เฮ้าส์ จำกัด (มหาชน)">ธน​าคารแลนด์ แอนด์ เฮ้าส์ จำกัด (มหาชน)​​​</Option>
                                                <Option value="ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย) จำกัด (มหาชน)">ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย) จำกัด (มหาชน)</Option>
                                                <Option value="ธนาคารไอซีบีซี (ไทย) จำกัด (มหาชน)">ธนาคารไอซีบีซี (ไทย) จำกัด (มหาชน)</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Table
                        loading={loading}
                        columns={columns}
                        onChange={onChange}
                        dataSource={bank ? outputSearch.filter(e => e.bank === bank) : outputSearch}
                        // dataSource={output}
                    />
                    {/* <ModalPaymant
                        isVerify={isVerify}
                        name={name}
                        amount={amount}
                        type={type}
                        created_at={created_at}
                        slipL={slipL}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}s
                        visible={this.state.visible}
                        id={id}
                    /> */}

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
                                    {getFieldDecorator('bank', {
                                        rules: [{ required: true, message: 'ใส่ชื่อธนาคาร', }],
                                        initialValue: bank
                                    })(
                                        <Input disabled onChange={this.setType} />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="วันที"
                                >
                                    {getFieldDecorator('pay_date', {
                                        initialValue: pay_date
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="เวลา"
                                >
                                    {getFieldDecorator('pay_time', {
                                        initialValue: pay_time
                                    })(
                                        <Input disabled />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="สลีปการโอน"
                                >
                                    <img src={slip} onClick={() => this.setState({ show: true })} height='200' />
                                    <Modal
                                        style={{ width: '100%', top: 20 }}
                                        title="รูป"
                                        visible={this.state.show}
                                        onOk={() => this.setState({ show: false })}
                                        onCancel={() => this.setState({ show: false })}
                                        footer={null}
                                    >
                                        <img src={slip} width='100%' />
                                    </Modal>
                                </FormItem>
                                <FormItem>
                                    <div className='footerModel' style={{ display: 'block' }}>
                                        <Button
                                            type="default"
                                            style={{ background: '#00b42d' }}
                                            disabled={isVerify} key='Suspend account'
                                            onClick={() => this.props.depositStore.updateIsVerify(id, email, package_id)}
                                        >อนุมัติ</Button>
                                        <Button
                                            htmlType='submit'
                                            style={{ float: 'right' }}
                                            onClick={this.handleCancel}
                                        >ตกลง </Button>
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

export default Form.create()(PaymentList)
