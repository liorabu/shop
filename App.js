/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import productsReducer from './src/store/reducers/products';
import cartReducer from './src/store/reducers/cart';
import orderReducer from './src/store/reducers/orders';

import ShopNavigator from './src/navigation/ShopNavigator';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders:orderReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <OverflowMenuProvider>
        <SafeAreaProvider>
          <ShopNavigator />
        </SafeAreaProvider>
      </OverflowMenuProvider>
    </Provider>

  )
}
