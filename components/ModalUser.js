import React, { Component } from 'react'
import { Button, Modal, Form, Input, Select, Divider } from 'antd'
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;
const Option = Select.Option;

@inject('userStore')
@observer
export class ModalUser extends Component {

    setusername = () => this.props.userStore.setusername(username.value)
    setf_name = () => this.props.userStore.setf_name(f_name.value)
    setgender = value => this.props.userStore.setgender(value)
    setl_name = () => this.props.userStore.setl_name(l_name.value)
    setphone_no = () => this.props.userStore.setphone_no(phone_no.value)
    setpackage_name = value => this.props.userStore.setpackage_name(value)
    setbirth_date = () => this.props.userStore.setbirth_date(setbirth_date.value)

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            }
        });
        this.props.userStore.updateUser(this.props.email, this.props.historyID)
    }

    // componentWillMount(){
    //     this.props.form.setFieldsValue({
    //         f_name: this.props.f_name,
    //         gender: this.props.gender,
    //         id_card: this.props.id_card,
    //         l_name: this.props.l_name,
    //         phone_no: this.props.phone_no,
    //         birth_date: this.props.birth_date,
    //         username: this.props.username,
    //         package_name: this.props.package_name,
    //         balance: this.props.balance
    //     })
    // }


    handleCancel = () => {
        this.props.userStore.visible = false
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
            isBan,
            isVerify,
            email,
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
        } = this.props
        const { visible, loadingb } = this.props.userStore
        return (
            <Modal
                key={this.props.key}
                visible={visible}
                style={{ top: 20 }}
                title="จัดการข้อมูล"
                onOk={this.props.handleOk}
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
                                <img src={id_card} height='200' />
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
                                    <Select style={{ width: 120 }} onChange={this.setpackage_name}>
                                        <Option value="7 วัน">7 วัน</Option>
                                        <Option value="15 วัน">15 วัน</Option>
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="คงเหลือ"
                            >
                                {getFieldDecorator('balance', {
                                    rules: [{ required: true, message: 'กรุณาใส่ยอดคงเหลือ' }],
                                    initialValue: balance
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="ผูกบัญชี"
                            >
                                {getFieldDecorator('binding', {
                                    rules: [{ required: false, message: 'กรุณาใส่ ผูกบัญชี' }],
                                })(
                                    <Input />
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
        )
    }
}

export default Form.create()(ModalUser)
