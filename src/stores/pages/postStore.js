import { types } from "mobx-state-tree";
import axios from "axios";
import { Toast } from 'antd-mobile';
import queryParams from "../../utils/queryParams";
import moment from "moment";
import { Category, Brand } from "../commonStore";
import { toJS } from "mobx";

const PostStore = types
  .model("PostStore", {})
  .volatile(self => ({
    picList: null
  }))
  .views(self => {
    return {};
  })
  .actions(self => {
    return {
      afterCreate() {
        self.picList = [];
      },
      getPost(params, cb) {
        return axios({
          method: 'get',
          url: `${__HOST}post/getPost`,
          data: params
        }).then(function (response) {
          if(cb){
            cb(response);
          }else{
            self.setPost(response);
          }
        }).catch(function (error) {
          Toast.fail("获取数据异常:" + error, 3);
        });
      },
      setPost(result) {
        if (result.success) {
          self.Post = (result.data && result.data.rows) || [];
        } else {
          self.Post = [];
          Toast.fail("获取数据异常:" + error, 3);
        }
      },
      setPicList(value){
        self.picList = value;
      }
    };
  });

export default PostStore;
