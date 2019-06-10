import React, { Component } from 'react'
import { List, Avatar, Form, Button, Modal, message, Input, Upload, Popconfirm, Tag, Checkbox } from 'antd'
import { Col, Row } from 'reactstrap'
import LayoutBase from './LayoutBase';
import { inject, observer } from 'mobx-react';
import moment from 'moment'

const FormItem = Form.Item;


function getBase64(img, callback) {
    if (img) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

@inject('categoryStore')
@observer
export class LogList extends Component {
    state = {
        loading: false,
        visible: false,
        visibleCreate: false,
    }

    componentDidMount() {
        this.props.categoryStore.getCategory()
    }


    setCategory_name = () => this.props.categoryStore.setCategory_name(category_name.value)
    setIsPopular = (e) => this.props.categoryStore.setIsPopular(e.target.checked)
    setIsPopular2 = (e) => this.props.categoryStore.setIsPopular2(e.target.checked)
    setCategory_name2 = () => this.props.categoryStore.setCategory_name2(category_name2.value)
    // setPackage_name2 = () => this.props.packageStore.setPackage_name(package_name2.value)
    // setPrice2 = () => this.props.packageStore.setPrice(prices2.value)
    // setExp_date2 = () => this.props.packageStore.setExp_date(exp_date2.value)

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.categoryStore.newCategory()
                this.setState({ visible: false, visibleCreate: false });
                this.props.categoryStore.reset()
            }
        });
    }

    handleUpdatePackage = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            }
            if (err) console.log(err)
        });
        this.props.categoryStore.updateCategory(this.state.id)
        this.setState({ visible: false, visibleCreate: false });
        this.props.categoryStore.reset()
    }

    async deleteCategory(id) {
        await this.props.categoryStore.deleteCategory(id)
        await this.props.categoryStore.getCategory()
        this.setState({ visible: false, visibleCreate: false });
    }

    showModal = (id, category_name, isPopular, img_url) => {
        const categoryStore = this.props.categoryStore
        this.setState({
            visible: true,
            id,
            imageUrl2: null
        });
        categoryStore.category_name2 = category_name
        categoryStore.isPopular2 = isPopular
        categoryStore.img_url2 = img_url
        this.props.form.setFieldsValue({
            category_name2: category_name
        })
    }

    showModalCrete = () => {
        this.setState({
            visibleCreate: true,
        });
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visible: false, visibleCreate: false, });
        // this.props.categoryStore.reset()
    }

    handleChangeUpload = (info) => {
        getBase64(info.file.originFileObj, imageUrl => {
            this.setState({
                imageUrl,
                loading: false,
            })
            this.props.categoryStore.img_url = imageUrl
        });
    }

    handleChangeUpload2 = (info) => {
        getBase64(info.file.originFileObj, imageUrl2 => {
            this.setState({
                imageUrl2,
                loading: false,
            })
            this.props.categoryStore.img_url2 = imageUrl2
        });
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
        const { data, loading } = this.props.categoryStore
        const output = [...new Map(data.map(o => [o.id, o])).values()]
        const { isPopular2, category_name2, img_url2 } = this.props.categoryStore
        const { id } = this.state
        const uploadButton = (
            <div>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const imageUrl2 = this.state.imageUrl2;
        return (
            <LayoutBase>
                <h6 style={{ marginBottom: '2em', fontSize: 15 }}>หมวดหมู่สินค้า</h6>
                <Button onClick={this.showModalCrete} type="dashed" icon="plus" block>เพิ่มข้อมูล</Button>
                <div style={{ margin: '1em 0 1em 0' }}>
                    <List
                        size="large"
                        bordered
                        loading={loading}
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 4,
                        }}
                        dataSource={output}
                        renderItem={item => (
                            <List.Item key={item.title}>
                                <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <Col sm="5">
                                        <List.Item.Meta
                                            avatar={<Avatar shape="square" size={50} src={item.img_url} />}
                                            title={item.category_name}
                                        />
                                    </Col>
                                    <Col sm="3">
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div>วันที่สร้าง {moment(item.created_at_date).locale('th').format('lll') || 'รีโหลด'}</div>
                                        </div>
                                    </Col>
                                    <Col sm="3" style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ marginBottom: 10 }}>{item.isPerfect ? <Tag color="#87d068">ข้อมูลสมบรูณ์</Tag> :
                                                <Tag color="#f50">ข้อมูลไม่สมบรูณ์</Tag>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }}>
                                        <a href="javascript:;" onClick={() =>
                                            this.showModal(
                                                item.id,
                                                item.category_name,
                                                item.isPopular,
                                                item.img_url
                                            )}>จัดการ</a>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                </div>

                <Modal
                    visible={this.state.visibleCreate}
                    title="เพิ่มหมวดหมู่"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="ระบุชื่อหมวดหมู่"
                        >
                            {getFieldDecorator('category_name', {
                                rules: [{
                                    required: true, message: 'Please input Category Name',
                                }],
                            })(
                                <Input onChange={this.setCategory_name} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ตั้งค่าหมวดหมู่"
                        >
                            <Checkbox onChange={this.setIsPopular}>ยอดนิยม</Checkbox>,
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="อัพโหลดรูปภาพ"
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={this.handleChangeUpload}
                            >
                                {imageUrl ? <img src={imageUrl} width='102' height='102' alt="avatar" /> : uploadButton}
                            </Upload>
                        </FormItem>
                        <FormItem>
                            <div className='footerModel'>
                                {/* <Button key='Suspend account' onClick={this.handleCancel}>ลบ</Button> */}
                                <Button htmlType='submit' >ตกลง</Button>
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
                            label="ระบุชื่อหมวดหมู่"
                        >
                            {getFieldDecorator('category_name2', {
                                rules: [{
                                    required: false, message: 'ระบุชื่อหมวดหมู่',
                                }],
                                initialValue: category_name2
                            })(
                                <Input onChange={this.setCategory_name2} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ตั้งค่าหมวดหมู่"
                        >
                            <Checkbox checked={isPopular2} onChange={this.setIsPopular2}>ยอดนิยม</Checkbox>,
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="อัพโหลดรูปภาพ"
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={this.handleChangeUpload2}
                            >
                                {imageUrl2 || img_url2 ? <img src={imageUrl2 || img_url2} width='102' height='102' alt="avatar" /> : uploadButton}
                            </Upload>
                        </FormItem>
                        <FormItem>
                            <div className='footerModel'>
                                <Popconfirm placement="top" title='Delete ?' onConfirm={() => this.deleteCategory(id)} okText="Yes" cancelText="No">
                                    <Button key='Suspend account'>ลบ</Button>
                                </Popconfirm>
                                <Button htmlType='submit' >อัพเดท</Button>
                                <Button style={{ background: '#8e8e8e' }} onClick={this.handleCancel}>ยกเลิก</Button>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>
            </LayoutBase>
        )
    }
}

export default Form.create()(LogList)
