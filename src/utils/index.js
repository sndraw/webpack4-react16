/**
 * Created by sn on 2019/3/18.
 */

const utils = {
  //截取url参数
  getUrlParam: (url, paramName) => {
    let arrObj = url.split("?");
    if (arrObj.length > 1) {
      let arrPara = arrObj[1].split("&");
      let arr;

      for (let i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        if (arr != null && arr[0] == paramName) {
          return arr[1];
        }
      }
      return "";
    }
    else {
      return "";
    }
  }
}
export  default  utils;
