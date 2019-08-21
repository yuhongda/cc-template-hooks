import React, { useContext, useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import {
  CSSTransition
} from 'react-transition-group';


export let storeContext = null;

export const setStore = newStore => {
  storeContext = newStore;
};

const inject = baseComponent => {
  const component = ownProps => {
    if (storeContext === null){
      throw new Error('Please, use setStore before your ReactDOM.render call');
    }
    
    const store = useContext(storeContext);
    
    useEffect(
      () => {
        if(ownProps.history){
          const { history: { location: { pathname } } } = ownProps;
          /**
           * navbar key map，用于定位当前页导航高亮
           * { key: 页面url， value: 高亮key}
           */
          const navKeyMap = {
            '/petitionList': 'petitionList',
            '/post': 'post',
            '/me': 'me',
          }
    
          for (const key in navKeyMap) {
            if (pathname.indexOf(key) != -1) {
              store.common.setCurrentMenuKey(navKeyMap[key]);
              return;
            }
          }
        }
      },
      []
    );

    useEffect(
      () => {
        if(ownProps.history){
          const { history: { location: { pathname } } } = ownProps;
          
          // 这里面的url都要隐藏navbar
          const regexArray = [
            /\/petitionList\/.*/,
            /\/post/
          ];
          if(regexArray.filter(regex => regex.test(pathname)).length > 0){
            store.common.setIsShowNavBar(false);
          }else{
            store.common.setIsShowNavBar(true);
          }
        }
      },
      []
    );

    const [isShow, setIsShow] = useState(false);
    setTimeout(() => {
      setIsShow(true);
    }, 0);

    return useObserver(() =>
      <CSSTransition
        in={isShow}
        timeout={500}
        classNames="fade"
      >
        {baseComponent({ ...ownProps, store })}
      </CSSTransition>
    );
  };
  component.displayName = baseComponent.name;
  return component;
};


export function withHooks(Comp) {
  return inject(props => {
      return <Comp {...props} />;
  })
}

export default inject;
