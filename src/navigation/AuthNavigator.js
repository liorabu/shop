import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <NavigationContainer>
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
                }}>
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={() => ({
                        title: 'Authenticate',
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthNavigator;