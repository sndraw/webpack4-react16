/**
 * Created by sn on 2019/3/18.
 */
const site={
  getSiteInfo: () => {
    return {
      code: 200,
      msg: '请求成功',
      data: {
        news: [
          {
            id: '1',
            title: 'Tom',
            content: 'Tom is working!'
          },
          {
            id: '2',
            title: 'Jerry',
            content: 'Jerry is fishing!'
          }
        ],
        title:"react个人网站",
        logo:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
        menusTree: [],
        userInfo:{
          id: "1",
          nick: "管理员",
          username: "admin",
          status: 1,
          create_time: "2014-05-23 15:49:05"
        }
      }
    }
  }

}

export  default site
