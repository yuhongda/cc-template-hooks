import 'whatwg-fetch';
import 'es6-weak-map/implement';
import arrayFrom from 'array-from';
if (!Array.from) Array.from = arrayFrom;
import 'console-polyfill';
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { observer, Provider} from 'mobx-react';
import routes from './routes';
import hotReloadRoutes from './hotReloadRoutes';
import './src/web/css/app.scss'
import RootStore from './src/stores/rootStore';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Loading from './src/web/components/spin'
import inject, { setStore } from './src/utils/mobx-react-inject';
const rootStore = RootStore.create({});
const StoreContext = React.createContext()
setStore(StoreContext)


import Header from './src/web/components/header'
const _HeaderWithRouter = withRouter(Header)
const HeaderWithRouter = inject(props => <_HeaderWithRouter />)

import NavBar from './src/web/components/navBar'
const _NavBarWithRouter = withRouter(NavBar)
const NavBarWithRouter = inject(props => <_NavBarWithRouter />)

const App = (props) => {

  // const [state, setState] = useState(rootStore);
  // const contextValue = useMemo(() => [state, setState], [state]);

  return <StoreContext.Provider value={rootStore}>
          <HashRouter>
            <Suspense fallback={Loading}>
              <props.appRoutes/>
              <NavBarWithRouter />
            </Suspense>
          </HashRouter>
        </StoreContext.Provider>
}

const renderApp = appRoutes => {
  ReactDOM.render(
    <App appRoutes={appRoutes}/>,
    document.getElementById('app')
  );
};
renderApp(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    // hotReloadRoutes(routes, nextRoutes);
    renderApp(newRoutes);
  });
}
