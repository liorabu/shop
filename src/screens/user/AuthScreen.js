import React, { useState, useEffect,useCallback, useReducer } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FORM_INPUT_UPDATE':
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            };
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            };
            let updatedFormIsValid = true;
            for (const key in updatedValidities) {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
            }
            return {
                ...state,
                formIsValid: updatedFormIsValid,
                inputValidities: updatedValidities,
                inputValues: updatedValues
            };
        default:
            return state;
    };
};

const AuthScreen = props => {
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [formState, formDispatch] = useReducer(reducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(()=>{
        if(error){
            Alert.alert('An Error Occurred!',error,[{text:'ok'}])
        }
    },[error])

    const authHandler = async () => {
        let action;
        {
            isSignUp
                ?
                action = authActions.signup(
                    formState.inputValues.email,
                    formState.inputValues.password
                )
                :
                action = authActions.login(
                    formState.inputValues.email,
                    formState.inputValues.password
                );
            setError(null)
            setIsLoading(true);
            try {
                await dispatch(action);
            } catch (err) {
                setError(err.message)
                setIsLoading(false);
            }  
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            formDispatch({
                type: 'FORM_INPUT_UPDATE',
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [formDispatch]
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label='E-Mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText='Please enter a valid email address.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id="password"
                            label='password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorText='Please enter a valid password.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading
                                ?
                                <ActivityIndicator size='small' color={Colors.primary} />
                                :
                                <Button
                                    title={isSignUp ? 'Sign Up' : 'Login'}
                                    color={Colors.primary}
                                    onPress={authHandler}
                                />
                            }
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                                color={Colors.accent}
                                onPress={() => {
                                    setIsSignUp(prevState => !prevState);
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;