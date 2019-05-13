/**
 * Created by sn on 2019/3/28.
 */
import  React, {useContext, useState} from 'react'

import {Layout, Menu, Icon, Button} from 'antd'
const SubMenu = Menu.SubMenu;

import * as App from "@/hooks/containers/App";


const defaultState={
  theme:"dark",//菜单样式
  init:false,//菜单是否初始化
  openKeys:[]//默认打开菜单的keys
};


function SiderMenu () {
  //获取上下文
  const AppContext = useContext(App.Context);
  const {rootState, rootProps} = AppContext;
  const current = rootProps.history.location;
  const pathname = current.pathname ? current.pathname : '/';

  const [theme, setTheme] = useState(defaultState.theme);
  const [currentPathname, setCurrentPathname] = useState(pathname);

  const [init, setInit] = useState(defaultState.init);
  const [openKeys, setOpenKeys] = useState(defaultState.openKeys);

  const listItems =rootState.menusTree.map(function (menu) {
    menu.url = menu.url ? menu.url : '';
    if (!menu.children && menu.url) {
      return (
        <Menu.Item key={menu.url} title={menu.name}>
          <Icon type="book"/>
          <span className="nav-text">{menu.name}</span>
        </Menu.Item>
      );
    }
    if (!menu.children && !menu.url) {
      return ('');
    }
    const childrenMenus = menu.children;
    const subMenus = childrenMenus.map(function (cmenu) {
      cmenu.url = cmenu.url ? cmenu.url : '';
      if (!cmenu.url) {
        return ('');
      }
      //重新刷新当前页面，默认打开当前选中子菜单的父菜单
      if (currentPathname && !init) {
        if (currentPathname == cmenu.url) {
          setInit(true);
          setOpenKeys([cmenu.fid ? cmenu.fid.toString() : ""]);
        }
      }
      return (
        <Menu.Item key={cmenu.url} title={cmenu.name}>
          <Icon type="book"/>
          <span className="nav-text">{cmenu.name}</span>
        </Menu.Item>
      );
    });
    const IconTitle = <span><Icon type="bars"></Icon><span className="nav-text">{menu.name}</span></span>;
    return (<SubMenu key={menu.id.toString()} title={IconTitle}>{subMenus}</SubMenu>);
  });


  function handleClick (e) {
    if (e.key != currentPathname) {
      rootProps.history.push(e.key);
      setCurrentPathname(e.key)
    }
  }

  function onOpenChange (e) {
    setInit(true)
    setOpenKeys(e)
  }
  return (
    <Menu
      className="layout-menu"
      theme={theme}
      selectedKeys={[currentPathname]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      inlineIndent="12"
      onClick={handleClick}
    >
      <Menu.Item key="/admin" title="首页">
        <Icon type="home"></Icon><span className="nav-text">首页</span>
      </Menu.Item>
      {listItems}
    </Menu>
  );
}

export  default SiderMenu
