/**
 * Created by sn on 2019/3/30.
 */
import React from 'react';
import * as TYPES from '@/hooks/mutation-types';

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.LOGIN_LOAD:
      const data = action.data ? action.data : {};
      return Object.assign({}, state, data);
    default:
      return state;
  }
}

export default reducer;
