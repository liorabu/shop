/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useEffect, useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import productsReducer from './src/store/reducers/products';
import cartReducer from './src/store/reducers/cart';
import orderReducer from './src/store/reducers/orders';
import authReducer from './src/store/reducers/auth';

import StartupScreen from './src/screens/StartupScreen';
import ShopNavigator from './src/navigation/ShopNavigator';

import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App = () => {

  return (
    <Provider store={store}>
      <OverflowMenuProvider>
        <SafeAreaProvider>
           <StartupScreen />
        </SafeAreaProvider>
      </OverflowMenuProvider>
    </Provider>

  )
}

export default App;


