/**
 * Created by sn on 2019/3/28.
 */


import * as TYPES from '@/hooks/mutation-types';

export function siteLoad(data) {
  return {type: TYPES.SITE_LOAD, data}
}
export function siteLogin(msg) {
  return {type: TYPES.SITE_LOGIN, msg}
}
export function siteLogout(msg) {
  return {type: TYPES.SITE_LOGOUT, msg}
}
