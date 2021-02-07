import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const AdminNavigator = () => {
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
                name="UserProducts"
                component={UserProductsScreen}
                options={() => ({
                    title: 'Your products',
                })}
            />
             <Stack.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={({ route }) => ({ title: route?.params?.productId?'Edit':'Add' })}
            />
        </Stack.Navigator>
  )
}

export default AdminNavigator;