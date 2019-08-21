import React, { Component, useEffect, useState } from "react";
import { observable, computed, toJS, runInAction } from "mobx";
import { autobind } from "core-decorators";
import {
  Button
} from "antd-mobile";
import styles from "./petitionList.m.scss";
import { dateFormat } from "../../misc/util";
import moment from "moment";
import { debounce } from "../../misc/util";
import beforeRoute, { checkUserInfo } from "../../misc/beforeRoute";
import inject, { withHooks } from "../../../utils/mobx-react-inject";
import { observer } from "mobx-react";
import { useLocalStore } from "mobx-react-lite";
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const getSearchConditions = obj => {
  const { store: { petitionList } } = obj;
  return {};
};

export default inject(props => {
  const { store: { petitionList, common } } = props;

  async function initData() {
    const { store: { petitionList } } = props;
		const { params: { orderId } } = props.match;
		const searchConditions = getSearchConditions(props);
		
    Promise.all([
			// petitionList.getPetitionList(searchConditions)
		]).then(() => {
    });
  }

  useEffect(() => {
    initData();
  }, []);

  const seqData = useLocalStore(
      source => ({
        petitionList: petitionList.petitionList
      }),
      props
  );

  const goDetail = (id) => {
    return () => {
      const { history } = props;
      history.push(`/petitionList/${id}`);
    }
  }


  return (
    <div className={styles.petitionList}>
      {/* <for item="item" index="i" of={ petitionList.petitionList }>
        <span>{ subItem && subItem.name }</span>
      </for> */}
      <div className={styles.feed} onClick={goDetail('id')}>
        <div className={styles.feedTitle}>
          <img src={require('../../images/1x1.png')} className={styles.avatar} />
          <span className={styles.username}>小李子</span>
          <span>向</span>
          <span className={styles.username}>小黑</span>
          <span>请求</span>
        </div>
        <div className={styles.feedCnt}>
          <div className={styles.left}>
            <h1>请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治</h1>
            <div className={styles.btnHandsUp}>3,123,123</div>
          </div>
          <div className={styles.right} style={{backgroundImage: `url(${require('../../images/1x1.png')}`}}></div>
        </div>
      </div>
      <div className={styles.feed}>
        <div className={styles.feedTitle}>
          <img src={require('../../images/1x1.png')} className={styles.avatar} />
          <span className={styles.username}>小李子</span>
          <span>向</span>
          <span className={styles.username}>小黑</span>
          <span>请求</span>
        </div>
        <div className={styles.feedCnt}>
          <div className={styles.left}>
            <h1>请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治</h1>
            <div className={cx({
              btnHandsUp: true,
              btnAlreadyHandsUp: true
            })}>3,123,123</div>
          </div>
          <div className={styles.right} style={{backgroundImage: `url(${require('../../images/1x1.png')}`}}></div>
        </div>
      </div>
      <div className={cx({
        feed: true,
        feedSuccessful: true
      })}>
        <div className={styles.feedTitle}>
          <img src={require('../../images/1x1.png')} className={styles.avatar} />
          <span className={styles.username}>小李子</span>
          <span>向</span>
          <span className={styles.username}>小黑</span>
          <span>请求</span>
        </div>
        <div className={styles.feedCnt}>
          <div className={styles.left}>
            <h1>请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治</h1>
            <div className={styles.btnHandsUp}>3,123,123</div>
          </div>
          <div className={styles.right} style={{backgroundImage: `url(${require('../../images/1x1.png')}`}}></div>
        </div>
      </div>
      <div className={styles.feed}>
        <div className={styles.feedTitle}>
          <img src={require('../../images/1x1.png')} className={styles.avatar} />
          <span className={styles.username}>小李子</span>
          <span>向</span>
          <span className={styles.username}>小黑</span>
          <span>请求</span>
        </div>
        <div className={styles.feedCnt}>
          <div className={styles.left}>
            <h1>请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治请求马云把淘宝假货好好整治整治</h1>
            <div className={styles.btnHandsUp}>3,123,123</div>
          </div>
          <div className={styles.right} style={{backgroundImage: `url(${require('../../images/1x1.png')}`}}></div>
        </div>
      </div>
    </div>
  );
});
