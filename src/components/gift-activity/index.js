import React, { Component } from "react";

import { Form, Icon, Button, Input } from "antd";
import GiftList from "./gift-list";

import "./index.scss";

// 层级列表-组件
class LevelList extends React.Component {
  constructor(props) {
    super(props);
    const { currentId, maxLevelNum, levels } = props;
    const newCurrentId = currentId || new Date().getTime();
    this.state = {
      currentId: newCurrentId, // 当前ID，用于层级赋值
      maxLevelNum: maxLevelNum || 10, // 最大限制层级数量
      levels: levels || [
        {
          id: newCurrentId,
          judge: { total: null, add: null },
          gifts: []
        }
      ] // 层级列表
    };
  }
  componentWillUpdate(nextProps, nextState) {
    const { changeData } = this.props;
    const { levels } = nextState;
    changeData && changeData(levels);
  }

  // 获取中文数字（只支持10以内数字）
  getCNNum = num => {
    const newNumber = Number(num);
    if (isNaN(newNumber)) {
      return num;
    }
    if (newNumber > 10) {
      return num;
    }
    // 数字对应中文列表
    const numCNList = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十"
    ];
    return numCNList[newNumber] || num;
  };
  // 删除层级
  removeLevel = k => {
    const { levels } = this.state;
    if (levels.length === 1) {
      return;
    }
    this.setState({
      levels: levels.filter(item => item.id !== k)
    });
  };

  // 添加层级
  addLevel = () => {
    const { currentId, maxLevelNum, levels } = this.state;
    // 如果当前层级数量，超过最大限制层级数量
    if (levels.length >= maxLevelNum) {
      return;
    }
    const nextId = currentId + 1;
    const item = {
      id: nextId,
      judge: { total: null, add: null },
      gifts: []
    };
    levels.push(item);
    this.setState({
      currentId: nextId,
      levels
    });
  };
  getMoney = value => {
    let newValue = value;
    // 只能输入"数字"和"."
    newValue = newValue.replace(/[^\d.]/g, "");
    // 第一位字符不能为"."
    newValue = newValue.replace(/^\./g, "");
    // 只能输入一个小数点且只保留一个
    newValue = newValue
      .replace(".", "$#$")
      .replace(/\./g, "")
      .replace("$#$", ".");
    // 只能输入两位小数
    newValue = newValue.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
    return newValue;
  };
  // 修改总金额
  changeTotalMoney = (id, e) => {
    const { levels } = this.state;
    const value = this.getMoney(e.target.value);
    const newLevels = levels.map(item => {
      if (item.id === id) {
        item.totalMoney = value;
        if (!value) {
          item.totalMoneyError = true;
        } else {
          item.totalMoneyError = false;
        }
      }
      return item;
    });
    this.setState({ levels: newLevels });
  };

  // 修改添加金额
  changeAddMoney = (id, e) => {
    const { levels } = this.state;
    const value = this.getMoney(e.target.value);
    const newLevels = levels.map(item => {
      if (item.id === id) {
        item.addMoney = value;
      }
      return item;
    });
    this.setState({ levels: newLevels });
  };

  addItems = () => {
    alert("添加赠品");
  };

  render() {
    const { maxLevelNum, levels } = this.state;
    const levelItems = levels.map((level, index) => {
      return (
        <div key={level.id} className="gift-activity-level">
          <div className="level-title">层级{this.getCNNum(index + 1)}</div>
          <div className="level-container ant-form">
            <div className="level-rule">
              <label className="rule-label">条件：</label>
              <div className="rule-input-list">
                <div className="rule-input-wrapper">
                  <span className="rule-input-prefix">满</span>
                  <Input
                    value={
                      level.totalMoney || (level.totalMoney === 0 ? 0 : null)
                    }
                    className={[
                      "rule-input",
                      level.totalMoneyError ? "has-error" : ""
                    ].join(" ")}
                    addonAfter="元"
                    placeholder="请输入不超过两位小数的正数"
                    onChange={e => {
                      this.changeTotalMoney(level.id, e);
                    }}
                  />
                </div>
                <div className="rule-input-wrapper">
                  <span className="rule-input-prefix">加</span>
                  <Input
                    value={level.addMoney || (level.addMoney === 0 ? 0 : null)}
                    className={[
                      "rule-input",
                      level.addMoneyError ? "has-error" : ""
                    ].join(" ")}
                    addonAfter="元"
                    placeholder="请输入不超过两位小数的正数"
                    onChange={e => {
                      this.changeAddMoney(level.id, e);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="level-gift">
              <div className="gift-container">
                <label className="gift-label">活动：</label>
                <span className="gift-btn-wrapper">
                  <span className="gift-btn-prefix">赠</span>{" "}
                  <Button
                    className="gift-btn"
                    onClick={() => this.addItems(level.id)}
                  >
                    <Icon type="plus" />
                    <span>添加商品</span>
                  </Button>
                </span>
              </div>
              {level.gifts && level.gifts.length > 0 && (
                <div className="gift-table">
                  <GiftList levelId={level.id} gifts={level.gifts} />
                </div>
              )}
            </div>
            {levels.length > 1 && index > 0 ? (
              <Button
                className="level-delete-btn"
                onClick={() => this.removeLevel(level.id)}
                title="删除"
              >
                <Icon type="close" />
              </Button>
            ) : null}
          </div>
        </div>
      );
    });
    return (
      <div className="gift-activity">
        <div className="gift-activity-levels">{levelItems}</div>
        {levels.length < maxLevelNum && (
          <div className="gift-activity-add">
            <Button
              className="activity-add-btn"
              onClick={() => this.addLevel()}
            >
              <Icon type="plus" />
              添加层级
            </Button>
            <span className="activity-add-tip">
              最多{maxLevelNum}级，下单时自动匹配满足的最高层级优惠
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default LevelList;
