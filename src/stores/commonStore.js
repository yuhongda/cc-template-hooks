import { types } from "mobx-state-tree"
import axios from "axios";
import { Toast } from 'antd-mobile';
import { toJS } from 'mobx'
import Cookies from 'js-cookie';

export const CommonStore = types.model("CommonStore", {
})
.volatile(self => ({
  userInfo: null,
  currentMenuKey: null,
  isShowNavBar: true,
}))
.views(self => {
  return {

  };
})
.actions(self => {
  return {
    oauthWeibo(params) {
      return axios({
        method: 'get',
        url: `${__HOST_OAUTH}weibo/oauth`,
        data: params
      }).then(function (response) {
        if (response.success) {
          window.location.href = response.data.url;
        } else {
          Toast.fail("微信授权异常:" + error, 3);
        }
      }).catch(function (error) {
          Toast.fail("微信授权异常:" + error, 3);
      });
    },
    getUserWeibo(params){
      const accessKey = Cookies.get('access_key');
      const accessSecret = Cookies.get('access_secret');

      return axios({
        method: 'post',
        url: `${__HOST_OAUTH}weibo/getUser`,
        data: {
          accessKey,
          accessSecret
        },
      }).then(function (response) {
        if (response.success) {
          console.log(response)
        } else {
          Toast.fail("微信授权异常:" + error, 3);
        }
      }).catch(function (error) {
          Toast.fail("微信授权异常:" + error, 3);
      });
    },
    setCurrentMenuKey(key){
      self.currentMenuKey = key;
    },
    setIsShowNavBar(key){
      self.isShowNavBar = key;
    },
    
    afterCreate(){
      // self.userInfo = {
      //   pin: 'silverage',
      //   nickname: '管理员'
      // }
      self.currentMenuKey = 'petitionList'
    },
  };
});
