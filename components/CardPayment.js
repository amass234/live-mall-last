import React, { Component } from 'react'
import { Card, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react'

@inject('depositStore')
@observer
class CardPayment extends Component {
  render() {
    const { countIsVerify, countIsVerifyFalse, amountCount } = this.props.depositStore
    return (
      <div>
        <div style={{ background: '#fff', padding: '1em 2em' }}>
          <h5>รายการแจ้งชำระเงิน</h5>
        </div>
        <Card bordered={false} style={{ margin: '24px 16px' }}>
          <Row style={{ textAlign: 'center' }}>

            <Col sm={8} style={{ borderRight: '1px solid #ccc' }}>
              <p>จำนวนเงินฝากรวม</p>
              <h3>{amountCount}</h3>
            </Col>
            <Col sm={8} style={{ borderRight: '1px solid #ccc' }}>
              <p>อนุมัติแล้ว</p>
              <h3>{countIsVerify}</h3>
            </Col>
            <Col sm={8} style={{ borderRight: '1px solid #ccc' }}>
              <p>ยังไม่ได้อนุมัติ</p>
              <h3>{countIsVerifyFalse ? countIsVerifyFalse : '0'}</h3>
            </Col>

          </Row>
        </Card>
      </div>
    )
  }
}

export default CardPayment
