import React from "react";

import { Table } from "antd";

import "./index.scss";

// 赠品列表-组件
class GiftList extends React.Component {
  constructor(props) {
    super(props);
    const { gifts, levelId } = props;
    this.state = {
      levelId: levelId || "", // 层级ID
      gifts: gifts || [] // 赠品列表
    };
  }
  componentWillUpdate(nextProps, nextState) {
    const { changeData } = this.props;
    const { gifts } = nextState;
    changeData && changeData(gifts);
  }

  // 删除赠品
  removeGift = k => {
    const { gifts } = this.state;
    this.setState({
      gifts: gifts.filter(item => item.id !== k)
    });
  };
  // 修改赠品数量
  changeGiftNum = (k, num) => {
    const { gifts } = this.state;
    const selectedGift = gifts.find(item => item.id === k);
    selectedGift.num = num;
  };
  render() {
    const { gifts, levelId } = this.state;
    const columns = [
      {
        title: "商品Id",
        dataIndex: "id",
        key: "id",
        colSpan: 0
      },
      {
        title: "商品名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "型号",
        dataIndex: "itemCode",
        key: "itemCode"
      },
      {
        title: "数量",
        dataIndex: "num",
        key: "num"
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (quantity, row) => {
          return quantity.id;
        }
      }
    ];
    return (
      <Table
        key={levelId}
        rowKey={r => {
          return levelId + "-gift-" + r.id;
        }}
        dataSource={gifts}
        columns={columns}
      />
    );
  }
}

export default GiftList;
