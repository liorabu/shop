import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrderScreen from '../screens/shop/OrderScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const OrderNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'OpenSans-Bold'
                },
                headerBackTitleStyle: {
                    fontFamily: 'OpenSans-Regular'
                }
            }} >
            
            <Stack.Screen
                name="Orders"
                component={OrderScreen}
            />
        </Stack.Navigator>
    )
}

export default OrderNavigation;