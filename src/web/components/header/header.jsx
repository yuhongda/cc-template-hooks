import React, { useEffect } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import { Link } from 'react-router-dom';
import styles from './header.m.scss';
import inject from '../../../utils/mobx-react-inject'
import { useComputed, useObservable, useObserver } from "mobx-react-lite";


function withHooks(Comp) {
  return inject(props => {
    return <Comp {...props} />;
  })
}

export default inject(props => {
  const { store: { common } } = props;

  return useObserver(() => (
    <header className={styles.siteHeader}></header>
  ));
});
