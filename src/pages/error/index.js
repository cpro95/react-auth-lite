import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
// logo
import logo from './logo.svg';
import './error.css';

const { Title, Paragraph } = Typography;

export default function Error() {
  return (
    <Row >
      <Col className="error-container" span={24}>
        <div>
          <img src={logo} alt="logo" />
          <Title level={1}>cpro95's React Admin</Title>
        </div>
        <div>
          <Title level={2}>404 error page</Title>
          <Paragraph level={5}>
            Oops. Looks like the page you're looking for no longer exists
          </Paragraph>
          <Paragraph>But we're here to bring you back to safety</Paragraph>
          <Link to="/">
            <Button type="primary">Back to Home</Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
}
