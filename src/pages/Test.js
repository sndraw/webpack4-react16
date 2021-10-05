import React, { Component } from "react";
import GiftActivity from "@/components/gift-activity";

// 定义全局层级，防止循环刷新
let levels = [];
export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originLevels: []
    };
  }
  componentWillUnmount() {
    // 重置全局层级
    levels = [];
  }
  changeData(data) {
    levels = data;
  }
  render() {
    return (
      <GiftActivity
        levels={this.originLevels}
        maxLevelNum={5}
        changeData={this.changeData.bind(this)}
      />
    );
  }
}
