import React, { Component } from "react";

import { Form, Input, Icon, Button } from "antd";

import "./index.scss";

// 赠品添加-组件
class GiftAdd extends React.Component {
  constructor(props) {
    super(props);
    const { companyId, selectedIds } = props;
    this.state = {
      companyId: companyId, // 当前主体ID，用于赠品查询
      selectedIds: selectedIds || []// 已选赠品ID集合
    };
  }
  render() {
    return <div>赠品列表</div>;
  }
}

// 满赠活动
export default GiftAdd;
