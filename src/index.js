import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './styles.less';
import stores from './stores';

configure({
  enforceActions: 'strict',
  isolateGlobalState: true,
});

/**
 * @author Ryazanov I.A
 * AppRouter root
 */
const AppContainer = () => (
  <BrowserRouter>
    <Provider {...stores}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render((<AppContainer />), document.getElementById('#app'));

