import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { withRouter, Link } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Typography,
  Alert,
  Form,
  Icon,
  Input,
  Checkbox,
  PageHeader
} from 'antd';
import './login.css';

const { Title } = Typography;

function NormalLoginForm(props) {
  // redux
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        dispatch(loginUser(values));
      } else {
        console.log(err);
      }
    });
  };
  const { getFieldDecorator } = props.form;

  return (
    <div>
      <PageHeader
        onBack={() => props.history.goBack()}
        title="Login"
        subTitle="please login"
      />

      <Row>
        <Col className="header" span={24}>
          <div>
            <Title level={1}>React Admin</Title>
          </div>
          <div>
            <div>
              <div className="login-body">
                <Title level={2}>Login</Title>

                {Object.keys(errors).length ? (
                  <Alert
                    className="login-body-alert"
                    message={
                      errors.email ||
                      errors.emailnotfound ||
                      errors.password ||
                      errors.password2 ||
                      errors.passwordincorrect
                    }
                    type="error"
                    showIcon
                  />
                ) : (
                  <div></div>
                )}

                <Form onSubmit={handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [
                        { required: true, message: 'Please input your email!' }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="mail"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="email"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Password!'
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true
                    })(<Checkbox>Remember me</Checkbox>)}
                    <Link className="login-form-forgot" to="/">
                      Forgot password
                    </Link>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Log in
                    </Button>
                    <Link to="/register">
                      <Button type="secondary" className="login-form-button">
                        register now
                      </Button>
                    </Link>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <Typography type="primary" level={2}>
              © 2019. cpro95@gmail.com. MIT License.
            </Typography>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default withRouter(Login);
