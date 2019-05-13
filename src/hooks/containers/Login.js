import React, {createContext, useContext, useState, useEffect, useReducer} from 'react';
import {notification} from 'antd';

import api from '@/api';
import LoginForm from '@/hooks/components/login/LoginForm';
import loginReducer from '@/hooks/reducers/login';
import loginState from '@/hooks/states/login';
import actions from '@/hooks/actions';
import utils from '@/utils';
import constants from '@/config/constants.conf';

import  '@/assets/css/login.less'

export const Context = createContext();

const title = "登录页面";

function ContextProvider (props) {
  const [state, dispatch] = useReducer(loginReducer, loginState);
  const [init, setInit] = useState(0);

  useEffect(() => {
    document.title = title;
    api.login.loginAuth().then(response => {
      const resData = response.data ? response.data : "";
      if (!resData.data.status || resData.data.status === constants.CODE_NOT_LOGIN) {
        return false
      }
      if (resData.data.status == constants.CODE_LIMIT_LOGIN) {
        notification.error({
          message: '错误',
          description: '该账号已禁用，请重新登录'
        })
        return false
      }


      if (resData.data.status == constants.CODE_HAS_LOGIN) {
        notification.error({
          message: '消息',
          description: '该账号已登录，重新登录前请先注销登录'
        })
        const url = window.location.href;
        const redirect = utils.getUrlParam(url, 'redirect');
        window.location.href = redirect ? redirect : "/";
        return false
      }
    })
  }, [init]);
  return (
    <Context.Provider value={{loginState: state, loginDispatch: dispatch}}>
      <LoginForm/>
    </Context.Provider>
  );
}

export  default ContextProvider
