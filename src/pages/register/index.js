import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import {
  Form,
  Input,
  Button,
  Alert,
  PageHeader,
  Row,
  Col,
  Typography
} from 'antd';
import './register.css';

const { Title } = Typography;

function RegistrationForm(props) {
  // redux
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  // local
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch(registerUser(values, props.history));
      } else {
        console.log(err);
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(['password2'], { force: true });
    }
    callback();
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const { getFieldDecorator } = props.form;

  return (
    <div>
      <PageHeader
        onBack={() => props.history.goBack()}
        title="Register"
        subTitle="please register"
      />

      {/* <div className="content"> */}

      <Row>
        <Col className="header" span={24}>
          <div>
            <Title level={1}>React Admin</Title>
          </div>
          <div>
            <div>
              <div className="register-body">
                <Title level={2}>Regitster</Title>

                {Object.keys(errors).length ? (
                  <Alert
                    className="register-body-alert"
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

                <Form onSubmit={handleSubmit} className="register-form">
                  <Form.Item>
                    {getFieldDecorator('name', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your name!',
                          whitespace: true
                        }
                      ]
                    })(<Input placeholder="name" />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!'
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!'
                        }
                      ]
                    })(<Input placeholder="E-mail" />)}
                  </Form.Item>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your password!'
                        },
                        {
                          validator: validateToNextPassword
                        }
                      ]
                    })(<Input.Password placeholder="Password" />)}
                  </Form.Item>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('password2', {
                      rules: [
                        {
                          required: true,
                          message: 'Please confirm your password!'
                        },
                        {
                          validator: compareToFirstPassword
                        }
                      ]
                    })(
                      <Input.Password
                        placeholder="Confirm password"
                        onBlur={handleConfirmBlur}
                      />
                    )}
                  </Form.Item>

                  {/* <Form.Item {...tailFormItemLayout}> */}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleSubmit}
                      className="register-form-button"
                    >
                      Register
                    </Button>
                    <Link to="/login">
                      <Button type="secondary" className="register-form-button">
                        log in now
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

const Register = Form.create({ name: 'register' })(RegistrationForm);
export default withRouter(Register);
