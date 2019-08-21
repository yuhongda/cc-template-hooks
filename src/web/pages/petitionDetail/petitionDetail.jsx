import React, { Component, useEffect, useState } from "react";
import { observable, computed, toJS, runInAction } from "mobx";
import { autobind } from "core-decorators";
import {
  Button
} from "antd-mobile";
import styles from "./petitionDetail.m.scss";
import { dateFormat } from "../../misc/util";
import moment from "moment";
import { debounce } from "../../misc/util";
import beforeRoute, { checkUserInfo } from "../../misc/beforeRoute";
import inject, { withHooks } from "../../../utils/mobx-react-inject";
import { observer } from "mobx-react";
import { useComputed, useObservable, useObserver } from "mobx-react-lite";
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { isIphoneX } from '../../misc/util';

const getSearchConditions = obj => {
  const { store: { petitionDetail } } = obj;
  return {};
};

export default inject(props => {
  const { store: { petitionDetail, common } } = props;

  async function initData() {
    const { store: { petitionDetail } } = props;
		const { params: { orderId } } = props.match;
		const searchConditions = getSearchConditions(props);

    Promise.all([
		]).then(() => {
    });
  }

  useEffect(() => {
    initData();
  }, []);


  return useObserver(() => (
    <div className={styles.petitionDetail}>
      <div className={styles.banner} style={{backgroundImage: 'url(https://img.ltn.com.tw/Upload/liveNews/BigPic/600_phpgfwHnP.jpg)'}}>
        <p>2019.05.06</p>
        <h1>中国区请求立马换编剧重拍权游第八季中国区请求立马换编剧重拍权游第八季中国区请求立马换编剧重拍权游第八季中国区请求立马换编剧重拍权游第八季</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.feedTitle}>
          <img src={require('../../images/1x1.png')} className={styles.avatar} />
          <span className={styles.username}>小李子</span>
          <span>向</span>
          <span className={styles.username}>小黑</span>
          <span>请求</span>
        </div>
        <p>首先权游是我最爱的剧，正是太喜欢才吐槽，类似不喜欢不要看，你行你上这种回复可以省省了，up主虽然没什么水平，但是不吐槽是不可能的，吐槽可是生活一大乐趣
        下面我开始了……</p>
        <p>1.战神囧雪诺不需要战术！</p>
        <p>回想第六季雪诺孤身陷阵，勇气可嘉，但没有光环真就没了，最后鹰骑救场，反败为胜，气的小剥皮想剥了他们家斥候的皮，这么多骑士在附近怎么就没个人吱个声？斥候是干什么吃的？</p>
        <p>2.还记得小萝卜放斥候混淆敌方视听，从而偷袭詹姆成功，可见斥候多么重要，到了第八季，斥候这个兵种估计主动辞职了，夜王有多少人？很多！具体多少？管他呢，冲就完事了，然后骑兵全体白给。</p>
        <p>你赢了，龙被你吼死了，伏斯洛达～</p>
        <div className={styles.picWrap}>
          <img src={'https://img.ltn.com.tw/Upload/liveNews/BigPic/600_phpgfwHnP.jpg'} className={styles.avatar} />
        </div>
        <div className={styles.picWrap}>
          <img src={'https://img.ltn.com.tw/Upload/liveNews/BigPic/600_phpgfwHnP.jpg'} className={styles.avatar} />
        </div>
      </div>
      <div className={cx({
        btnWrap: true,
        isIphoneX: isIphoneX()
      })}>
        <p>让我们达到500吧</p>
        <div className={cx({
          btnHandsUp: true,
          btnAlreadyHandsUp: false
        })}><span className={styles.num}>3,123,123 人举手</span><span className={styles.progress} style={{width: '50%'}}></span></div>
      </div>
    </div>
  ));
});
