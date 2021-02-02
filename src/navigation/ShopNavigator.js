import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';;
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const ProductsNavigator = () => {
   return <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary },
                headerTintColor: 'white',
                headerTitleAlign:'center',
                headerTitleStyle:{
                    fontFamily:'OpenSans-Bold'
                } ,
                headerBackTitleStyle:{
                    fontFamily:'OpenSans-Regular'
                }
            }}
        >
            <Stack.Screen 
            name="ProductsOverview" 
            component={ProductsOverviewScreen}
            options={() => ({
                title: 'All products',      
              })}
            />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen 
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={({ route }) => ({ title: route.params.title })}
            />
            
        </Stack.Navigator>
    </NavigationContainer>
};
export default ProductsNavigator;