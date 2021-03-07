import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import AuthNavigator from '../navigation/AuthNavigator';
import ShopNavigator from '../navigation/ShopNavigator';


import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const isLogedIn = useSelector(state => !!state.auth.isLogedIn);

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                return (
                    setIsLoading(false)
                )
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                return (
                    setIsLoading(false)
                )
            }
            const experationTime=expirationDate.getTime()-new Date().getTime();
            dispatch(authActions.authenticate(userId, token,experationTime));
            return (
                setIsLoading(false)
            )
        };
        tryLogin()
    }, [dispatch, isLogedIn]);

    // return (
    //     isLoading ?
    //         <View style={styles.screen}>
    //             <ActivityIndicator size="large" color={Colors.primary} />
    //         </View>
    //         :
    //         isLogedIn ?
    //             <ShopNavigator />
    //             :
    //             <AuthNavigator />
    // )

    if (isLoading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (isLogedIn) {
        return <ShopNavigator />
    }

    return <AuthNavigator />;
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen;
