import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Button, Table, Typography, Spin } from 'antd';

import './users.css';

export default function Users() {
  const [data, setData] = useState([]);
  const [edited, setEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios.get('/api/users/list');
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [edited]);

  const handleDelete = id => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        await axios.delete('/api/users/list/' + id);
        setEdited(!edited);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }

    fetchData();
  };

  const handleActivate = (id, activate) => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        await axios.put('/api/users/list/' + id, { activated: activate });
        setEdited(!edited);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }
    
    fetchData();
  };

  const handleChangeRole = (id, role) => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        await axios.put('/api/users/list/' + id, { role: role });
        setEdited(!edited);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }
    
    fetchData();
  };

  const columns = [
    {
      title: 'Admin',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.length - b.role.length,
      render: (text, record) => (
        <div>
          <Switch
            checked={text === 'admin'}
            onChange={() => {
              if (text === 'user') handleChangeRole(record._id, 'admin');
              else handleChangeRole(record._id, 'user');
            }}
          />
        </div>
      )
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length
    },
    {
      title: 'ACTIVATE',
      dataIndex: 'activated',
      key: 'activated',
      render: (text, record) => (
        <div>
          <Switch
            checked={record.activated}
            onChange={() => {
              handleActivate(record._id, !record.activated);
            }}
          />
        </div>
      )
    },
    {
      title: 'DELETE',
      key: 'delete',
      render: (text, record) => (
        <Button
          type="danger"
          onClick={() => {
            handleDelete(record._id);
          }}
        >
          Delete
        </Button>
      )
    }
  ];

  const { Title } = Typography;

  return (
    <>
      <Title>Manage Users</Title>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={data} columns={columns} />
      )}
    </>
  );
}
