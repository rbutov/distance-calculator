import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Home from './components/pages/Home';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root'),
);
