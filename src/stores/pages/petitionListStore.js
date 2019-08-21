import { types } from "mobx-state-tree";
import axios from "axios";
import { Toast } from 'antd-mobile';
import queryParams from "../../utils/queryParams";
import moment from "moment";
import { Category, Brand } from "../commonStore";
import { toJS } from "mobx";

const PetitionListStore = types
  .model("PetitionListStore", {})
  .volatile(self => ({
    petitionList: null
  }))
  .views(self => {
    return {};
  })
  .actions(self => {
    return {
      afterCreate() {
        self.petitionList = [];
      },
      getPetitionList(params, cb) {
        return axios({
          method: 'get',
          url: `${__HOST}petitionList/getPetitionList`,
          data: params
        }).then(function (response) {
          if(cb){
            cb(response);
          }else{
            self.setPetitionList(response);
          }
        }).catch(function (error) {
          Toast.fail("获取数据异常:" + error, 3);
        });
      },
      setPetitionList(result) {
        if (result.success) {
          self.petitionList = (result.data && result.data.rows) || [];
        } else {
          self.petitionList = [];
          Toast.fail("获取数据异常:" + error, 3);
        }
      }
    };
  });

export default PetitionListStore;
