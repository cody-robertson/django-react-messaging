import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import Messaging from './app/messaging/components/Messaging';
import configureStore from './store';

const store = configureStore({});
const App = () => (
  <Provider store={store}>
    <Messaging />
  </Provider>
);

export default hot(App);
