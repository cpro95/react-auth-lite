import React, { useState, useEffect } from 'react';
import { Typography, Row, Spin, Input, Table } from 'antd';
import axios from 'axios';

// styles
import './bacca.css';

export default function Bacca() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('/api/bacca/list');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios(url);
        if (typeof result.data !== 'number') {
          setData(result.data);
        } else {
          setData([{ number: '', result: `Total : ${result.data}` }]);
        }
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const handleSearch = e => {
    setSearch(e.target.value.trim().toUpperCase());
  };

  const handleSubmit = (value, e) => {
    if (value.length > 9) {
      setUrl(`/api/bacca/list/${value.trim().toUpperCase()}`);
    }
    e.preventDefault();
  };

  const columns = [
    {
      title: 'NUMBER',
      dataIndex: 'number',
      key: 'number',
      sorter: (a, b) => a.number.length - b.number.length
    },
    {
      title: 'RESULT',
      dataIndex: 'result',
      key: 'result'
    }
  ];

  const { Title } = Typography;
  const { Search } = Input;

  return (
    <>
      <Title>Search My Data</Title>
      <Row container spacing={4}>
        <Search
          placeholder="Search with P,B,T...... at least 10"
          enterButton="Search"
          size="large"
          value={search}
          onChange={e => handleSearch(e)}
          onSearch={(value, e) => handleSubmit(value, e)}
        />
        <br />
        <br />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Table dataSource={data} columns={columns} />
        )}
      </Row>
    </>
  );
}
