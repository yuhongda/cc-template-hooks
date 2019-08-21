import { types } from "mobx-state-tree";
import axios from "axios";
import { Toast } from 'antd-mobile';
import queryParams from "../../utils/queryParams";
import moment from "moment";
import { Category, Brand } from "../commonStore";
import { toJS } from "mobx";

const PetitionDetailStore = types
  .model("PetitionDetailStore", {})
  .volatile(self => ({
    petitionDetail: null
  }))
  .views(self => {
    return {};
  })
  .actions(self => {
    return {
      afterCreate() {
        self.petitionDetail = [];
      },
      getPetitionDetail(params, cb) {
        return axios({
          method: 'get',
          url: `${__HOST}petitionDetail/getPetitionDetail`,
          data: params
        }).then(function (response) {
          if(cb){
            cb(response);
          }else{
            self.setPetitionDetail(response);
          }
        }).catch(function (error) {
          Toast.fail("获取数据异常:" + error, 3);
        });
      },
      setPetitionDetail(result) {
        if (result.success) {
          self.petitionDetail = (result.data && result.data.rows) || [];
        } else {
          self.petitionDetail = [];
          Toast.fail("获取数据异常:" + error, 3);
        }
      }
    };
  });

export default PetitionDetailStore;
