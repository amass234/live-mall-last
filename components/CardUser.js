import React, { Component } from 'react'
import { Card, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@observer
export class CardUser extends Component {
  componentDidMount() {
    this.props.userStore.getUser()
  }
  render() {
    const { data, countBuyer, countSeller } = this.props.userStore
    return (
      <div>
        <Card bordered={false} style={{ margin: '24px 16px' }}>
          <Row style={{ textAlign: 'center' }}>

            <Col sm={8} style={{ borderRight: '1px solid #ccc' }}>
              <p>จำนวนผู้ใช้ทั้งหมด</p>
              <h3>{data.length}</h3>
            </Col>
            <Col sm={8} style={{ borderRight: '1px solid #ccc' }}>
              <p>จำนวนผู้ขาย</p>
              <h3>{countSeller}</h3>
            </Col>
            <Col sm={8} style={{ borderRight: '1px solid #ccc' }}>
              <p>จำนวนผู้ซื้อ</p>
              <h3>{countBuyer}</h3>
            </Col>

          </Row>
        </Card>
      </div>
    )
  }
}

export default CardUser
