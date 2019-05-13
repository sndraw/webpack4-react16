/**
 * Created by sn on 2019/3/26.
 */
import React, {createContext, useReducer, useState, useEffect} from 'react';
import {Spin} from 'antd';

import api from '@/api'
import BasicLayout from '@/hooks/components/layouts/BasicLayout';
import siteReducer from '@/hooks/reducers/site';
import siteState from '@/hooks/states/site';

import actions from '@/hooks/actions';

export const Context = createContext();

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(siteReducer, siteState);

  const [loading, setLoading] = useState("网站初始化中...");

  //init变动后，重新执行副作用
  const [init, setInit] = useState(0);
  useEffect(() => {
    api.site.getSiteInfo().then(response => {
      if (response.data.data) {
        dispatch(actions.site.siteLoad(response.data.data));
        setLoading(false);
      }
    })
  }, [init]);

  //根组件数据
  const rootProps = props;
  const rootState = state;
  const rootDispatch = dispatch;
  if (loading) {
    return (
      <div className="app-full-modal">
        <Spin tip={loading}/>
      </div>
    )
  }
  return (
    <Context.Provider value={{rootState, rootDispatch, rootProps}}>
      <BasicLayout></BasicLayout>
    </Context.Provider>
  );
};

export  default ContextProvider
