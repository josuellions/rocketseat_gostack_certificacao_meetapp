/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persitor } from './store';

import App from '~/App';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persitor}>
        <StatusBar barStyle="light-content" backgroundColor="#18161f" />
        <App />
      </PersistGate>
    </Provider>
  );
}
