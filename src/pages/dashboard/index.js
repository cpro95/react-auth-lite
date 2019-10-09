import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Spin } from 'antd';
import axios from 'axios';

export default function Dashboard(props) {
  const { Title } = Typography;

  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [startP, setStartP] = useState(0);
  const [startB, setStartB] = useState(0);
  const [startT, setStartT] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios.get('/api/bacca/list');
        setTotal(Number(result.data));
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios.get('/api/bacca/list/P');
        setStartP(Number(result.data.length));
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios.get('/api/bacca/list/B');
        setStartB(Number(result.data.length));
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios.get('/api/bacca/list/T');
        setStartT(Number(result.data.length));
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Title>Dashboard</Title>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div>
          <Title level={2}>Total -{total.toLocaleString()}</Title>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Start with P" bordered={false}>
                {startP.toLocaleString()}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Start with B" bordered={false}>
                {startB.toLocaleString()}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Start with T" bordered={false}>
                {startT.toLocaleString()}
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
