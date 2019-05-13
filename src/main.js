import React from 'react';
import ReactDOM from 'react-dom';
import '@/assets/css/index.less'
import routes from '@/router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
//主配置引入
import config from '@/config'
if (config.mock) {
  require('@/mock/index.js')
}


ReactDOM.render(
  (
    <LocaleProvider locale={zhCN}>
      <div className="app-container">
        {routes}
      </div>
    </LocaleProvider>
  ),
  document.getElementById('app')
)
