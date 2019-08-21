import React, { Component, useEffect, useState } from "react";
import { observable, computed, toJS, runInAction } from "mobx";
import { autobind } from "core-decorators";
import {
  Button
} from "antd-mobile";
import styles from "./me.m.scss";
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
  const { store: { me, common } } = props;

  async function initData() {
    const { store: { me } } = props;
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
    <div>
      me
    </div>
  ));
});
