/**
 * Created by sn on 2019/3/26.
 */
import React, {useState, useContext} from 'react';
import {Layout} from 'antd';
const {Content, Sider} = Layout;
import AppHeader from './Header';
import SiderMenu from './SiderMenu';
import * as App from "@/hooks/containers/App";
import style from '@/assets/css/layouts/BasicLayout.less';

function BasicLayout () {
  const [collapsed, setCollapsed] = useState(false);
  const AppContext = useContext(App.Context);
  const {rootState, rootProps} = AppContext;
  function collapsedChange () {
    setCollapsed(collapsed ? false : true)
  }
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        width={256}
      >
        <div className="layout-logo">
          <img src={rootState.logo} alt="logo"/>
          <span>Ant Design Pro</span>
        </div>
        <SiderMenu></SiderMenu>
      </Sider>
      <Layout
        style={{minHeight: '100vh'}}
      >
        <AppHeader collapsed={collapsed} collapsedChange={collapsedChange}></AppHeader>
        <Content>{rootProps.children}</Content>
      </Layout>
    </Layout>
  )
}
export  default BasicLayout
