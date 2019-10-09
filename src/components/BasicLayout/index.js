import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Layout, Menu, Drawer, Button } from 'antd';
import { SHOW_SIDEBAR, CLOSE_SIDEBAR } from '../../actions/types';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import './layout.css';

// pages
import Dashboard from '../../pages/dashboard';
import Users from '../../pages/users';
import Bacca from '../../pages/bacca';

const { Header, Content, Footer } = Layout;

function BasicLayout(props) {
  const ui = useSelector(state => state.ui);
  const dispatch = useDispatch();

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Button
          className="logo"
          type="primary"
          onClick={() => dispatch({ type: SHOW_SIDEBAR })}
        >
          React Admin
        </Button>
        <Drawer
          title="React Admin"
          placement="left"
          closable={true}
          onClose={() => dispatch({ type: CLOSE_SIDEBAR })}
          visible={ui.isSidebarOpened}
          keyboard={true}
        >
          <Menu
            theme="light"
            mode="vertical"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Divider />
            <Menu.Item
              key="1"
              onClick={() => {
                dispatch({ type: CLOSE_SIDEBAR });
                props.history.push('/app/dashboard');
              }}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                dispatch({ type: CLOSE_SIDEBAR });
                props.history.push('/app/bacca');
              }}
            >
              Bacca Search
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => {
                dispatch({ type: CLOSE_SIDEBAR });
                props.history.push('/app/users');
              }}
            >
              Users
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              key="4"
              onClick={() => {
                dispatch(logoutUser());
                props.history.push('/app/users');
              }}
            >
              Logout
            </Menu.Item>
            <Menu.Divider />
          </Menu>
        </Drawer>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            {props.history.location.pathname.slice(5).toUpperCase()}
          </Menu.Item>
          <Menu.Item key="4" style={{ float: 'right' }}>
            <div onClick={() => dispatch(logoutUser())}>Logout</div>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/users" component={Users} />
            <Route path="/app/bacca" component={Bacca} />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        React Admin created by cpro95@gmail.com with Ant Design
      </Footer>
    </Layout>
  );
}

export default withRouter(BasicLayout);
