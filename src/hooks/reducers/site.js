/**
 * Created by sn on 2019/3/28.
 */
import React from 'react';
import * as TYPES from '@/hooks/mutation-types';

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.SITE_LOAD:
      const data = action.data ? action.data : {};
      return Object.assign({}, state, {
        init: true,
        userInfo: data.userInfo,
        menusTree: data.menusTree,
        logo:data.logo,
        login: true,
      });
    case TYPES.SITE_LOGIN:
      return Object.assign({}, state, {
        login: true,
        msg: action.msg ? action.msg : null
      });
    case TYPES.SITE_LOGOUT:
      return Object.assign({}, state, {
        login: false,
        init: false,
        userInfo: {},
        menusTree: [],
        logo:'',
        msg: action.msg ? action.msg : null
      });
    default:
      return state;
  }
}

export default reducer;
