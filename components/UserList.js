import React, { Component } from 'react'
// import Link from 'next/link'
import { List, Avatar, Form, Select, Tag, Input, Modal, Button, Divider } from 'antd'
import { Col, Row } from 'reactstrap'
import { inject, observer } from 'mobx-react';
import moment from 'moment'

import CardUser from './CardUser'
// import ModalUser from './ModalUser';
import LayoutBase from './LayoutBase';

const FormItem = Form.Item;
const Option = Select.Option;

@inject('userStore', 'packageStore')
@observer
export class UserList extends Component {

    state = {
        loading: false,
        visible: false,
        word: '',
        roles: '',
    }

    async componentDidMount() {
        await this.props.userStore.getUser()
        await this.props.packageStore.getPackage()
    }

    showModal = (
        role,
        f_name,
        gender,
        id_card,
        l_name,
        phone_no,
        birth_date,
        username,
        package_name,
        balance,
        email,
        historyID,
        isVerify,
        isBan,
        exp_date
    ) => {
        this.setState({
            role,
            f_name,
            gender,
            id_card,
            l_name,
            phone_no,
            birth_date,
            username,
            package_name,
            balance,
            email,
            historyID,
            isVerify,
            isBan,
            exp_date: moment(exp_date).diff(moment(), 'days')
        })
        this.props.userStore.visible = true
        this.props.userStore.f_name = f_name
        this.props.userStore.gender = gender
        this.props.userStore.id_card = id_card
        this.props.userStore.l_name = l_name
        this.props.userStore.phone_no = phone_no
        this.props.userStore.birth_date = birth_date
        this.props.userStore.username = username
        this.props.userStore.package_name = package_name
        this.props.userStore.isBan = isBan
        this.props.userStore.exp_date = exp_date
        this.props.form.setFieldsValue({
            f_name,
            gender,
            id_card,
            l_name,
            phone_no,
            birth_date,
            username,
            package_name,
            exp_date: moment(exp_date).diff(moment(), 'days')
        })
    }

    handleCancel = () => {
        this.props.userStore.visible = false
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    calDate = (date1) => {
        const last = new Date(Date.now() - (date1 * 24 * 60 * 60 * 1000));
        const day = last.getDate().toString();
        console.log(last)
        return day < 0 ? '0' : day
    }

    searchingFor = (word) => {
        return x => {
            return x.username.toLowerCase().includes(word.toLowerCase()) || !word;
        }
    }

    searchingForAdmin = () => this.setState({ word: search.value })

    setusername = () => this.props.userStore.setusername(username.value)
    setf_name = () => this.props.userStore.setf_name(f_name.value)
    setgender = value => this.props.userStore.setgender(value)
    setl_name = () => this.props.userStore.setl_name(l_name.value)
    setphone_no = () => this.props.userStore.setphone_no(phone_no.value)
    setpackage_name = value => this.props.userStore.setpackage_name(value)
    setbirth_date = () => this.props.userStore.setbirth_date(birth_date.value)
    setexp_date = () => this.props.userStore.setexp_date(exp_date.value)

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            }
        });
        this.props.userStore.updateUser(this.state.email, this.state.historyID)
    }

    render() {
        const {
            isBan,
            isVerify,
            email,
            role,
            roles,
            f_name,
            gender,
            id_card,
            l_name,
            phone_no,
            birth_date,
            username,
            package_name,
            exp_date,
            historyID
        } = this.state
        const { getFieldDecorator } = this.props.form;
        const { data, loading, visible, loadingb } = this.props.userStore
        const { packageList } = this.props.packageStore
        const output = [...new Map(packageList.map(o => [o.id, o])).values()]

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
        const outputSearch = data.filter(this.searchingFor(this.state.word))
        return (
            <div>
                <CardUser />
                <LayoutBase>
                    <div style={{ margin: '1em 0 1em 0' }}>
                        <Form>
                            <Row>
                                <Col sm="4">
                                    <FormItem {...formItemLayout} label="รายชื่อผู้ใช้งาน">
                                        {getFieldDecorator('search')(
                                            <Input
                                                placeholder="ค้นหา"
                                                onChange={this.searchingForAdmin}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col sm="6">
                                    <FormItem {...formItemLayout} label="ประเภทผู้ใช้งาน">
                                        {getFieldDecorator('searchs')(
                                            <Select
                                                style={{ width: 120 }}
                                                placeholder="ประเภท"
                                                onChange={value => this.setState({ roles: value })}
                                            >
                                                <Option value="null">ทั้งหมด</Option>
                                                <Option value="seller">ผู้ขาย</Option>
                                                <Option value="buyer">ผู้ซื้อ</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <List
                        size="large"
                        bordered
                        pagination={{
                            // onChange: (page) => {
                            //     console.log(page);
                            // },
                            pageSize: 4,
                        }}
                        locale={{ emptyText: loading ? 'กำลังค้นหา... รอสักครู่' : 'ไม่พบข้อมูลที่ค้นหา' }}
                        dataSource={
                            roles === 'seller' ? outputSearch.filter(e => e.role === roles) :
                                roles === 'buyer' ? outputSearch.filter(e => e.role === roles) :
                                    outputSearch
                        }
                        loading={loading}
                        renderItem={item => (
                            <List.Item key={item.username}>
                                <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <Col sm="5">
                                        <List.Item.Meta
                                            avatar={<Avatar shape="square" size={50} icon="user" />}
                                            title={item.username}
                                            description={item.role || null}
                                        />
                                    </Col>
                                    <Col sm="3">
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div>วันที่สมัคร: {item.created_at !== undefined ? moment(`${item.created_at}`).locale('th').format('lll') : null}</div>
                                            {item.role === 'seller' && <div style={{ color: '#ccc' }}>
                                                เพคเกจ: {item.package_name || null} คงเหลือ: {moment(item.exp_date).diff(moment(), 'days')} วัน
                                            </div>}
                                        </div>
                                    </Col>
                                    <Col sm="3" style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {item.role === 'seller' &&
                                                <div style={{ marginBottom: 10 }}>{item.isVerify || null ? <Tag color="#87d068">ยืนยันข้อมูลแล้ว</Tag> :
                                                    <Tag color="#f50">ยังไม่ได้ยืนยัน</Tag>}
                                                </div>
                                            }
                                            <div>{item.isOnline || null ? <Tag color="#87d068">ออนไลน์</Tag> :
                                                <Tag color="#f50">ออฟไลน์</Tag>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }}>
                                        <a onClick={() =>
                                            this.showModal(
                                                item.role,
                                                item.f_name,
                                                item.gender,
                                                item.id_card,
                                                item.l_name,
                                                item.phone_no,
                                                item.birth_date,
                                                item.username,
                                                item.package_name,
                                                // item.isVerify,
                                                item.create_at !== undefined ? this.calDate(item.create_at.toMillis()) : null,
                                                item.email,
                                                item.historyID,
                                                item.isVerify,
                                                item.isBan,
                                                item.exp_date
                                            )}>จัดการ</a>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                    {/* <ModalUser
                        email={this.state.email}
                        username={this.state.username}
                        isVerify={this.state.isVerify}
                        role={this.state.role}
                        f_name={this.state.f_name}
                        gender={this.state.gender}
                        id_card={this.state.id_card}
                        l_name={this.state.l_name}
                        phone_no={this.state.phone_no}
                        package_name={this.state.package_name}
                        birth_date={this.state.birth_date}
                        balance={this.state.balance}
                        handleOk={this.handleOk}
                        loading={this.state.loading}
                        historyID={this.state.historyID}
                        isBan={this.state.isBan}
                    /> */}

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
                                label="บัญชี"
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'กรุณาใส่บัญชี' }],
                                    initialValue: username
                                })(
                                    <Input onChange={this.setusername} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="ชื่อ"
                            >
                                {getFieldDecorator('f_name', {
                                    rules: [{ required: true, message: 'กรุณาใส่ชื่อ' }],
                                    initialValue: f_name
                                })(
                                    <Input onChange={this.setf_name} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="นามสกุล"
                            >
                                {getFieldDecorator('l_name', {
                                    rules: [{ required: true, message: 'กรุณาใส่นามสกุล' }],
                                    initialValue: l_name
                                })(
                                    <Input onChange={this.setl_name} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="เบอร์โทรศัพท์"
                            >
                                {getFieldDecorator('phone_no', {
                                    rules: [{ required: true, message: 'กรุณาใส่เบอร์โทรศัพท์' }],
                                    initialValue: phone_no
                                })(
                                    <Input onChange={this.setphone_no} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="วัน/เดือน/ปี"
                            >
                                {getFieldDecorator('birth_date', {
                                    rules: [{ required: true, message: 'กรุณาใส่ วัน/เดือน/ปี' }],
                                    initialValue: birth_date
                                })(
                                    <Input onChange={this.setbirth_date} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="เพศ"
                            >
                                {getFieldDecorator('gender', {
                                    rules: [{ required: true, message: 'กรุณาเลือกเพศ' }],
                                    initialValue: gender
                                })(
                                    <Select style={{ width: 120 }} onChange={this.setgender}>
                                        <Option value="M">ชาย</Option>
                                        <Option value="F">หญิง</Option>
                                    </Select>
                                )}
                            </FormItem>

                            {role === 'seller' &&
                                <div>
                                    <FormItem
                                        {...formItemLayout}
                                        label="บัตรประชาชน"
                                    >
                                        <img src={id_card} height='200' onClick={() => this.setState({ show: true })} />
                                        <Modal
                                            style={{ width: '100%', top: 20 }}
                                            title="รูป"
                                            visible={this.state.show}
                                            onOk={() => this.setState({ show: false })}
                                            onCancel={() => this.setState({ show: false })}
                                            footer={null}
                                        >
                                            <img src={id_card} width='100%' />
                                        </Modal>
                                    </FormItem>
                                    <Divider>SELLER</Divider>
                                    <FormItem
                                        {...formItemLayout}
                                        label="แพคเกจ"
                                    >
                                        {getFieldDecorator('package_name', {
                                            rules: [{ required: true, message: 'กรุณาเลือกแพคเกจ' }],
                                            initialValue: package_name
                                        })(
                                            <Select style={{ width: '100%' }} onChange={this.setpackage_name}>
                                                {
                                                    output.map(item => {
                                                        return (
                                                            <Option key={item.id} value={item.package_name}>{item.package_name} ({item.unit})</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>

                                    <FormItem
                                        {...formItemLayout}
                                        label="คงเหลือ"
                                    >
                                        {getFieldDecorator('exp_date', {
                                            rules: [{ required: false, message: 'กรุณาใส่ยอดคงเหลือ' }],
                                            initialValue: exp_date
                                        })(
                                            <Input disabled addonAfter={'วัน'} onChange={this.setexp_date} />
                                        )}
                                    </FormItem>
                                </div>
                            }
                            <FormItem>
                                {
                                    role === 'seller' ?
                                        <div className='footerModel'>
                                            {
                                                !isBan ?
                                                    <Button key='Suspend account' onClick={() => this.props.userStore.banUser(email)}>ระงับบัญชี</Button> :
                                                    <Button style={{ width: 'auto', background: '#87d068' }} key='Suspend account' onClick={() => this.props.userStore.banUser(email)}>ยกเลิกการระงับบัญชี</Button>
                                            }
                                            {
                                                !isVerify &&
                                                <Button key='back' onClick={() => this.props.userStore.verifyUser(email)}>ยืนยันบัญชี</Button>
                                            }
                                            <Button loading={loadingb} key='submit' htmlType="submit" >บันทึก </Button>
                                        </div> :
                                        <div className='footerModel'>
                                            {
                                                !isBan ?
                                                    <Button key='Suspend account' onClick={() => this.props.userStore.banUser(email)}>ระงับบัญชี</Button> :
                                                    <Button style={{ width: 'auto', background: '#87d068' }} key='Suspend account' onClick={() => this.props.userStore.banUser(email)}>ยกเลิกการระงับบัญชี</Button>
                                            }
                                            <Button key='submit' htmlType="submit" >บันทึก</Button>
                                        </div>
                                }
                            </FormItem>
                        </Form>
                    </Modal>
                </LayoutBase>
            </div>
        )
    }
}

export default Form.create()(UserList)
