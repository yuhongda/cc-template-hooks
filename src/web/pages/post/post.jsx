import React, { Component, useEffect, useState } from "react";
import { observable, computed, toJS, runInAction } from "mobx";
import { autobind } from "core-decorators";
import { Upload } from "antd";
import {
  Button,
  Flex,
  Icon,
  Toast
} from "antd-mobile";
import styles from "./post.m.scss";
import { dateFormat } from "../../misc/util";
import moment from "moment";
import { debounce } from "../../misc/util";
import beforeRoute, { checkUserInfo } from "../../misc/beforeRoute";
import inject, { withHooks } from "../../../utils/mobx-react-inject";
import { observer } from "mobx-react";
import { useComputed, useObservable, useObserver } from "mobx-react-lite";

const getSearchConditions = obj => {
  const { store: { me } } = obj;
  return {};
};

export default inject(props => {
  const { store: { post, common } } = props;
  const [ isViewMode, setIsViewMode ] = useState(false);
  const [ didEditSendTo, setDidEditSendTo ] = useState(false);
  const sendToInputRef = React.createRef();
  const [ isUploading, setIsUploading ] = useState(false);


  async function initData() {
    const { store: { post } } = props;
		const { params: { orderId } } = props.match;
		const searchConditions = getSearchConditions(props);
		
    Promise.all([
		]).then(() => {
    });
  }

  useEffect(() => {
    initData();
  }, []);

  function onTitleChange(e) {
    console.log(e.target.value)
  }

  function onSendToChange(e) {
    console.log(e.target.value)
  }

  function onSendToBlur(e) {
    setIsViewMode(true);
    setDidEditSendTo(true);
  }

  function onViewModeClick(e) {
    setIsViewMode(false);
  }

  useEffect(
    () => {
      if(sendToInputRef.current && didEditSendTo){
        sendToInputRef.current.focus();
      }
    },
    [isViewMode]
  )

  const onPicChange = (info) => {
    if (info.file.status === 'uploading') {
      setIsUploading(true);
    }
    if (info.file.status === 'done') {
      setIsUploading(false);

      const { file: { response } } = info;

      if(response){
        console.log(response)
        post.setPicList([...post.picList, response.url])
      }else{
        Toast.fail("上传失败:" + response.message, 3);
      }
    }
  };

  function onPicDeleteClick(pic){
    return (e) => {
      const _picList = post.picList;
      const resultPicList = _picList.filter(p => p != pic);
      post.setPicList(resultPicList);
    }
  }

  return useObserver(() => (
    <div className={styles.post}>
      <div className={styles.btnBar}>
        <Flex>
          <Flex.Item className={styles.left}>
            <a onClick={()=>history.back()}>取消</a>
          </Flex.Item>
          <Flex.Item align="end" className={styles.right}>
            <Button type="primary" size="small" inline>发起请求</Button>
          </Flex.Item>
        </Flex>
      </div>
      <div className={styles.title}>
        <input value="" placeholder="输入你的请求" onChange={onTitleChange} />
      </div>
      <div className={styles.note}>
        <p>例：我请求立马换编剧重拍权游第八季</p>
        <ul>
          <li>· 请求的事情表述清晰才会有更多人举手</li>
          <li>· 填写明确向谁请求更容易通过审核</li>
          <li>· 插入封面图更容易排在前面</li>
        </ul>
        <span className={styles.closeBtn}>
          <Icon type="cross" />
        </span>
      </div>
      <div className={styles.sendTo}>
        {
          isViewMode
          ? <div className={styles.viewMode} onClick={onViewModeClick}>向 <span className={styles.highlight}>马云</span> 请求</div>
          : <input value="" placeholder="你想向谁请求" onChange={onSendToChange} onBlur={onSendToBlur} ref={sendToInputRef}/>
        }
      </div>
      <div className={styles.description}>
        <textarea placeholder="描述为什么发起请求，让更多人为你举手"></textarea>
      </div>
      <div className={styles.picList}>
        <for item="pic" index="index" of={ post.picList }>
          <div key={index} className={styles.picItem}>
            <span className={styles.del} onClick={onPicDeleteClick(pic)}></span>
            <img src={pic}/>
          </div>
        </for>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          showUploadList={false}
          onChange={onPicChange}
        >
          <div className={styles.uploadBtn}>
            {
              isUploading ? <Icon type="loading" /> : <Icon type="plus" />
            }
            <div className="ant-upload-text">无图无真相</div>
          </div>
        </Upload>
      </div>
    </div>
  ));
});
