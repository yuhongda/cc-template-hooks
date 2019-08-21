import { types } from "mobx-state-tree";
import axios from "axios";
import { Toast } from 'antd-mobile';
import queryParams from "../../utils/queryParams";
import moment from "moment";
import { Category, Brand } from "../commonStore";
import { toJS } from "mobx";

const MeStore = types
  .model("MeStore", {})
  .volatile(self => ({
    me: null
  }))
  .views(self => {
    return {};
  })
  .actions(self => {
    return {
      afterCreate() {
        self.me = [];
      },
      getMe(params, cb) {
        return axios({
          method: 'get',
          url: `${__HOST}me/getMe`,
          data: params
        }).then(function (response) {
          if(cb){
            cb(response);
          }else{
            self.setMe(response);
          }
        }).catch(function (error) {
          Toast.fail("获取数据异常:" + error, 3);
        });
      },
      setMe(result) {
        if (result.success) {
          self.me = (result.data && result.data.rows) || [];
        } else {
          self.me = [];
          Toast.fail("获取数据异常:" + error, 3);
        }
      }
    };
  });

export default MeStore;
