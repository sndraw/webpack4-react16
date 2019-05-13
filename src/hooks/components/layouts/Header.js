/**
 * Created by sn on 2019/3/26.
 */
import React, {useState, useContext} from 'react';
import {Layout, Icon, Menu, Dropdown} from 'antd';
const {Header} = Layout;
import * as App from "@/hooks/containers/App";
import api from '@/api'
import actions from '@/hooks/actions';

function AppHeader (props) {
  const AppContext = useContext(App.Context);
  const {rootState, rootProps, rootDispatch} = AppContext;
  const {userInfo} = rootState;
  const userCenterMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout"><Icon type="user"/>注销登录</Menu.Item>
    </Menu>
  );function handleMenuClick (e) {
    if (e.key == 'logout') {
      api.login.logoutSite().then(() => {
        rootDispatch(actions.site.siteLogout());
        rootProps.history.push('/login');
      });
      return;
    }
  }

  function toggle () {
    props.collapsedChange()
  }

  return (
    <Header className="layout-header">
      <div className="layout-trigger" onClick={toggle}>
        <Icon type={props.collapsed ? 'menu-unfold' : 'menu-fold'}/>
      </div>
      <div className="layout-header-right">
        <Dropdown overlay={userCenterMenu}>
              <span style={{marginLeft: 8}}>
                <Icon type="home"/> {userInfo.nick}
              </span>
        </Dropdown>
      </div>
    </Header>
  )
}
export  default AppHeader
