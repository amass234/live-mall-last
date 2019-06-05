import React, { Component } from 'react'
import { List, Popconfirm, Form, Button, Modal, Tag, Input, Select } from 'antd'
import { Col, Row } from 'reactstrap'
import { inject, observer } from 'mobx-react';
import moment from 'moment'

import LayoutBase from './LayoutBase';

const FormItem = Form.Item;
const Option = Select.Option

@inject('packageStore')
@observer
export class PackageList extends Component {
    state = {
        loading: false,
        visible: false,
        visibleCreate: false,
    }
    componentDidMount() {
        this.props.packageStore.getPackage()
    }

    setPackage_name = () => this.props.packageStore.setPackage_name(package_name.value)
    setPrice = () => this.props.packageStore.setPrice(prices.value)
    setExp_date = () => this.props.packageStore.setExp_date(exp_date.value)
    setDescription = () => this.props.packageStore.setDescription(description.value)
    setColor = () => this.props.packageStore.setColor(color.value)
    setUnit = (value) => this.props.packageStore.setUnit(value)

    setPackage_name2 = () => this.props.packageStore.setPackage_name2(package_name2.value)
    setPrice2 = () => this.props.packageStore.setPrice2(price2.value)
    setExp_date2 = () => this.props.packageStore.setExp_date2(exp_date2.value)
    setDescription2 = () => this.props.packageStore.setDescription2(description2.value)
    setColor2 = () => this.props.packageStore.setColor2(color2.value)
    setUnit2 = (value) => this.props.packageStore.setUnit2(value)
    

    async deletePack(id) {
        await this.props.packageStore.deletePack(id)
        await this.props.packageStore.getPackage()
        this.setState({ visible: false, visibleCreate: false });
    }

    handleUpdatePackage = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            }
            if (err) console.log(err)
        });
        this.props.packageStore.updatePackage(this.state.id)
        this.setState({ visible: false, visibleCreate: false });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.packageStore.newPackage()
                this.setState({ visible: false, visibleCreate: false });
            } else if (err) console.log(err)
        });
    }

    showModal = (
        id,
        package_name,
        exp_date,
        price,
        unit,
        color,
        description
    ) => {
        this.setState({
            visible: true,
            id,
            package_name,
            exp_date,
            price,
            unit,
            color,
            description
        });
        this.props.packageStore.package_name2 = package_name
        this.props.packageStore.price2 = price
        this.props.packageStore.exp_date2 = exp_date
        this.props.packageStore.unit2 = unit
        this.props.packageStore.color2 = color
        this.props.packageStore.description2 = description
        this.props.form.setFieldsValue({
            package_name2: package_name,
            price2: price,
            exp_date2: exp_date,
            unit2: unit,
            color2: color,
            description2: description
        })
    }

    showModalCreate = () => {
        this.setState({
            visibleCreate: true
        })
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visible: false, visibleCreate: false });
    }
    render() {
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

        const {
            packageList,
            loading,
            package_name2,
            exp_date2,
            price2 } = this.props.packageStore
        const output = [...new Map(packageList.map(o => [o.id, o])).values()]
        const {
            id,
        } = this.state
        return (
            <LayoutBase>
                <h6 style={{ marginBottom: '2em', fontSize: 15 }}>แพคเกจ</h6>
                <Button onClick={this.showModalCreate} type="dashed" icon="plus" block>เพิ่มข้อมูล</Button>
                <div style={{ margin: '1em 0 1em 0' }}>
                    <List
                        size="large"
                        bordered
                        loading={loading}
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={output}
                        renderItem={item => (
                            <List.Item key={item.title}>
                                <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <Col sm="4">
                                        <List.Item.Meta
                                            title={`${item.package_name}`}
                                            description={<div>
                                                {item.description}
                                                {` ระยะเวลา: ${ 
                                                    item.unit === 'YEAR' ?
                                                    item.exp_date*365:
                                                    item.unit === 'MONTH' ?
                                                    item.exp_date*30:
                                                    item.exp_date
                                                    } วัน `}
                                                {` สี: ${item.color}`}
                                                <p>{` Unit: ${item.unit}`}</p>
                                            </div>}
                                        />
                                    </Col>
                                    <Col sm="2">
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div>ราคา {item.price} บาท</div>
                                        </div>
                                    </Col>
                                    <Col sm="3">
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div>อัพเดท: {moment(item.updated_at).locale('th').format('lll')}</div>
                                        </div>
                                    </Col>
                                    <Col sm="2" style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ marginBottom: 10 }}>{item.isPerfect ? <Tag color="#87d068">ข้อมูลสมบรูณ์</Tag> :
                                                <Tag color="#f50">ข้อมูลไม่สมบรูณ์</Tag>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }}>
                                        <a href="javascript:;" onClick={() => this.showModal(
                                            item.id,
                                            item.package_name,
                                            item.exp_date,
                                            item.price,
                                            item.unit,
                                            item.color,
                                            item.description
                                        )}>จัดการ</a>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                </div>

                <Modal
                    visible={this.state.visibleCreate}
                    title="เพิ่มแพคเกจ"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="ชื่อแพคเกจ"
                        >
                            {getFieldDecorator('package_name', {
                                rules: [{
                                    required: true, message: 'Please input Package Name',
                                }],
                            })(
                                <Input onChange={this.setPackage_name} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="รายละเอียด"
                        >
                            {getFieldDecorator('description', {
                                rules: [{
                                    required: true, message: 'Please input description',
                                }],
                            })(
                                <Input onChange={this.setDescription} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ราคา"
                        >
                            {getFieldDecorator('prices', {
                                rules: [{
                                    required: true, message: 'Please input Price',
                                }],
                            })(
                                <Input onChange={this.setPrice} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="สี"
                        >
                            {getFieldDecorator('color', {
                                rules: [{
                                    required: true, message: 'Please input color',
                                }],
                            })(
                                <Input type='color' onChange={this.setColor} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="หน่วย"
                        >
                            {getFieldDecorator('unit', {
                                rules: [{
                                    required: true, message: 'Please input unit',
                                }],
                            })(
                                <Select
                                    placeholder="DAY MONTH YEAR"
                                    onChange={this.setUnit}
                                >
                                    <Option value="DAY">DAY</Option>
                                    <Option value="MONTH">MONTH</Option>
                                    <Option value="YEAR">YEAR</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ระยะเวลา"
                        >
                            {getFieldDecorator('exp_date', {
                                rules: [{
                                    required: true, message: 'Please input EXP Date',
                                }],
                            })(
                                <Input onChange={this.setExp_date} />
                            )}
                        </FormItem>
                        <FormItem>
                            <div className='footerModel'>
                                {/* <Button key='Suspend account' onClick={this.handleCancel}>ลบ</Button> */}
                                <Button style={{ background: '#00b42d' }} htmlType='submit'>ตกลง</Button>
                                <Button style={{ background: '#8e8e8e' }} onClick={this.handleCancel}>ยกเลิก </Button>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>


                <Modal
                    visible={this.state.visible}
                    title="จัดการข้อมูล"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleUpdatePackage}>
                        <FormItem
                            {...formItemLayout}
                            label="ชื่อแพคเกจ"
                        >
                            {getFieldDecorator('package_name2', {
                                rules: [{
                                    required: false, message: 'Please input Package Name',
                                }],
                                initialValue: package_name2
                            })(
                                <Input onChange={this.setPackage_name2} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="รายละเอียด"
                        >
                            {getFieldDecorator('description2', {
                                rules: [{
                                    required: false, message: 'Please input description',
                                }],
                            })(
                                <Input onChange={this.setDescription2} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ราคา"
                        >
                            {getFieldDecorator('price2', {
                                rules: [{
                                    required: false, message: 'Please input Price',
                                }],
                            })(
                                <Input onChange={this.setPrice2} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="สี"
                        >
                            {getFieldDecorator('color2', {
                                rules: [{
                                    required: false, message: 'Please input color',
                                }],
                            })(
                                <Input type='color' onChange={this.setColor2} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="หน่วย"
                        >
                            {getFieldDecorator('unit2', {
                                rules: [{
                                    required: false, message: 'Please input unit',
                                }],
                            })(
                                <Select
                                    placeholder="DAY MONTH YEAR"
                                    onChange={this.setUnit2}
                                >
                                    <Option value="DAY">DAY</Option>
                                    <Option value="MONTH">MONTH</Option>
                                    <Option value="YEAR">YEAR</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ระยะเวลา"
                        >
                            {getFieldDecorator('exp_date2', {
                                rules: [{
                                    required: false, message: 'Please input EXP Date',
                                }],
                                initialValue: exp_date2
                            })(
                                <Input onChange={this.setExp_date2} />
                            )}
                        </FormItem>
                        <FormItem>
                            <div className='footerModel'>
                                <Popconfirm placement="top" title='Delete ?' onConfirm={() => this.deletePack(id)} okText="Yes" cancelText="No">
                                    <Button key='Suspend account'>ลบ</Button>
                                </Popconfirm>
                                <Button htmlType='submit'>อัพเดท</Button>
                                <Button style={{ background: '#8e8e8e' }} key='submit' onClick={this.handleCancel}>ยกเลิก </Button>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>
            </LayoutBase>
        )
    }
}

export default Form.create()(PackageList)
