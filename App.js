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

import ProductsNavigator from './src/navigation/ShopNavigator';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <OverflowMenuProvider>
        <SafeAreaProvider>
          <ProductsNavigator />
        </SafeAreaProvider>
      </OverflowMenuProvider>
    </Provider>

  )
}
