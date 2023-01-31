import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store';
import App from './App';

// import authenticated action from  Login action
import { authenticated } from './actions/login';

import registerServiceWorker from './registerServiceWorker';

// import './css/bootstrap.min.css';
// import './css/font-awesome.min.css';
// import './css/style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

/*
 Check if user token exists
 then dispatch AUTHENTICATED Action
*/
const user = localStorage.getItem('token');

if (user) {
  store.dispatch(authenticated(true));
}
/*
Stateless Router
Component Setup
*/


const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <App/>
        </Router>
      </PersistGate>
    </Provider>
  );
};

render(<Root />, document.querySelector('#root'));
registerServiceWorker();
