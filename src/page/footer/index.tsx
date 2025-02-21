import React from 'react'
import styles from './index.module.scss'
import { Col, Divider, Layout, Row } from 'antd';
import Image1 from '../../assets/images/image1.png'
import GoogleMapComponent from '../googleMap';

const Footer: React.FC = () => {
  return (
    <Layout.Footer className={styles.container}>
      <Row>
        <Col>

        </Col>
        <Col span={24}>
          <div>
            Address
          </div>
        </Col>
        <Divider type='horizontal' />
        <Col span={24}>
          <div className={styles.copyRightText}>Copy right @ {new Date().getFullYear()} Gautam Homestay</div>
        </Col>
      </Row>

    </Layout.Footer>
  )
}

export default Footer