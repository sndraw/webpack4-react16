/**
 * Created by sn on 2017/4/15.
 */
import React, {useState, useContext, useReducer, useEffect} from 'react';

import {Icon, Form, Row, Col, Input, Button, Checkbox, Spin} from 'antd';
import md5 from 'md5';
import * as Login from "@/hooks/containers/Login";
import actions from '@/hooks/actions';
import api from '@/api';
import utils from '@/utils';

const FormBox = Form.create({
  name: 'login',
  mapPropsToFields(props) {
    return {
      username: Form.createFormField(
        {
          value: props.username
        }
      ),
      password: Form.createFormField(
        {
          value: props.password
        }
      ),
    };
  },
  onFieldsChange(props, changedFields) {
  },
  onValuesChange(props, values, allValues) {
  },
})((props) => {

  //修改验证码
  const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, setFields} = props.form;
  const userNameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');

  function hasErrors (fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          username: values.username,
          password: md5(values.password)
        }
        props.handleFormSubmit(params);
      }
    });
    return false;
  }

  return (
    <Form onSubmit={handleSubmit} className="app-login">
      <Form.Item validateStatus={userNameError ? 'error' : ''}
                 help={userNameError || ''}>
        {getFieldDecorator('username', {
          rules: [{required: true, message: '请输入用户名'}],
        })(
          <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                 placeholder="用户"/>
        )}
      </Form.Item>
      <Form.Item validateStatus={passwordError ? 'error' : ''}
                 help={passwordError || ''}>
        {getFieldDecorator('password', {
          rules: [{required: true, message: '请输入密码'}],
        })(
          <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                 placeholder="密码"/>
        )}
      </Form.Item>
      <Form.Item className="text-center">
        <Button
          type="primary"
          htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())}
        >登录</Button>
      </Form.Item>
    </Form>
  );
});

function LoginForm (props) {
  const LoginContext = useContext(Login.Context);
  const {loginState, loginDispatch} = LoginContext;
  const [init, setInit] = useState(0);
  const [loading, setLoading] = useState(false);

  function handleFormSubmit (values) {
    api.login.loginSite(values).then(response => {
      setLoading("登录成功，页面跳转中...");
      const url = window.location.href;
      const redirect = utils.getUrlParam(url, 'redirect');
      window.location.href = redirect ? redirect : "/";
    })
  }

  useEffect(() => {

  }, [init]);

  if (loading) {
    return (
      <div className="app-full-modal">
        <Spin tip={loading}/>
      </div>
    )
  }
  return (
    <div className="app-panel">
      <FormBox {...loginState} {...{handleFormSubmit}}/>
    </div>
  );

}
export  default LoginForm;
