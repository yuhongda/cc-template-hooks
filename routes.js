import React, { lazy, useContext, useObserver } from 'react';
import { withRouter, Redirect } from 'react-router'
import { Switch, Route } from 'react-router-dom';
import inject from './src/utils/mobx-react-inject';
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group';

const comps = {
  PetitionList: withRouter(lazy(() => import(/* webpackChunkName: "petitionList" */ './src/web/pages/petitionList/petitionList.jsx'))),
  PetitionDetail: withRouter(lazy(() => import(/* webpackChunkName: "petitionDetail" */ './src/web/pages/petitionDetail/petitionDetail.jsx'))),
  Me: withRouter(lazy(() => import(/* webpackChunkName: "me" */ './src/web/pages/me/me.jsx'))),
  Post: withRouter(lazy(() => import(/* webpackChunkName: "post" */ './src/web/pages/post/post.jsx'))),

}

import Header from './src/web/components/header'
const _HeaderWithRouter = withRouter(Header)
const HeaderWithRouter = inject(props => <_HeaderWithRouter />)

import NavBar from './src/web/components/navBar'
const _NavBarWithRouter = withRouter(NavBar)
const NavBarWithRouter = inject(props => <_NavBarWithRouter />)


const PetitionList = () => (
  <PageWrap>
    <comps.PetitionList/>
  </PageWrap>
)

const PetitionDetail = () => (
  <comps.PetitionDetail/>
)

const Me = () => (
  <PageWrap>
    <comps.Me/>
  </PageWrap>
)

const Post = () => (
  <comps.Post/>
)


const PageWrap = inject(
  ({ store, children }) =>{
      return <div>
                <HeaderWithRouter />
                  {children}
              </div>
    }
)





const routes = inject((props) => {
  const onEnter = () => {
    // if(props.history){
    //   const { history: { location: { pathname } } } = props;
    //   if(/\/petitionList\/.*/.test(pathname)){
    //     props.store.common.setIsShowNavBar(false);
    //   }else{
    //     props.store.common.setIsShowNavBar(true);
    //   }
    // }
  }

  return (
    <TransitionGroup>
      <CSSTransition
        // key={props.history.location.pathname.split('/').slice(1).join('-')}
        timeout={500}
        classNames="fade"
        unmountOnExit
        onEntered={onEnter}
      >
        <Switch>
          <Route exact path='/petitionList' component={PetitionList}/>
          <Route exact path='/petitionList/:id' component={PetitionDetail}/>
          <Route exact path='/me' component={Me}/>
          <Route exact path='/post' component={Post}/>
          <Redirect from='*' to='/petitionList'/>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
});



export default withRouter(routes);
