import React, { useEffect } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import { Link } from 'react-router-dom';
import styles from './navBar.m.scss';
import inject from '../../../utils/mobx-react-inject'
import { useComputed, useObservable, useObserver } from "mobx-react-lite";
import { Flex } from 'antd-mobile';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { isIphoneX } from '../../misc/util';

export default inject(props => {
  const { store: { common } } = props;

  const navChanged = (key) => {
    return (e) => {
      const { store: { common }, history } = props;
      common.setCurrentMenuKey(key.split('/')[1]);
      history.push(key);
    }
  }

  return useObserver(() => (
    <div className={cx({
      siteNav: true,
      isIphoneX: isIphoneX()
    })} style={{display: `${common.isShowNavBar ? 'block' : 'none'}`}}>
      <Flex>
        <Flex.Item onClick={navChanged('/petitionList')}>
          <img src={require(`../../images/navbar-petitions-${common.currentMenuKey == 'petitionList' ? 'on' : 'off'}.png`)} alt="" />
          <p>请求</p>
        </Flex.Item>
        <Flex.Item className={styles.postBtn} onClick={navChanged('/post')}>
          <img src={require(`../../images/navbar-post.png`)} alt="" />
          <p>发起请求</p>
        </Flex.Item>
        <Flex.Item onClick={navChanged('/me')}>
          <img src={require(`../../images/navbar-me-${common.currentMenuKey == 'me' ? 'on' : 'off'}.png`)} alt="" />
          <p>我的</p>
        </Flex.Item>
      </Flex>
    </div>
  ));
});
