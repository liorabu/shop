import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OrderNavigator from './OrderNavigation';
import ProductsNavigator from './ProductsNavigator';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const ShopNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor:Colors.primary,
                labelStyle:{
                    fontWeight:'bold',
                },
            }
            }>
                <Drawer.Screen
                 name="products"
                  component={ProductsNavigator}

                  options={{
                      drawerIcon:({color}) =><Ionicons name="md-cart" size={23}  color={color}/> 
                  }}
                />
                <Drawer.Screen 
                name="orders" 
                component={OrderNavigator} 
                options={{
                    drawerIcon:({color}) =><Ionicons name="md-list" size={23}  color={color}/> 
                }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
export default ShopNavigator;