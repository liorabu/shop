import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import OrderNavigator from './OrderNavigation';
import ProductsNavigator from './ProductsNavigator';
import AdminNavigator from './AdminNavigator';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth'

const Drawer = createDrawerNavigator();


const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: Colors.primary,
                    inactiveTintColor: Colors.accent,
                    labelStyle: {
                        fontWeight: 'bold',
                    },
                }}
                drawerContent={props => {
                    return <View style={{ flex: 1 }}>
                        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                            <DrawerItemList {...props} />
                            <Button title="Logout" color={Colors.primary} onPress={() => {
                                dispatch(authActions.logout())
                            }} />
                        </SafeAreaView>
                    </View>
                }

                }
            >
                <Drawer.Screen
                    name="products"
                    component={ProductsNavigator}

                    options={{
                        drawerIcon: ({ color }) => <Ionicons name="md-cart" size={23} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="orders"
                    component={OrderNavigator}
                    options={{
                        drawerIcon: ({ color }) => <Ionicons name="md-list" size={23} color={color} />
                    }} />
                <Drawer.Screen
                    name="Admin"
                    component={AdminNavigator}
                    options={{
                        drawerIcon: ({ color }) => <Ionicons name="md-create" size={23} color={color} />
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
export default ShopNavigator;