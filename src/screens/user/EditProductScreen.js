import React, { useState, useCallback, useReducer } from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headerButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { useEffect } from 'react/cjs/react.development';


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
    }
}

const EditProducts = props => {
    const prodId = props.route?.params?.productId;
    let editedProduct;
    if (prodId) {
        editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))
    }



    const [isLoading, setIsLoading] = useState(false);
    const [error, serError] = useState();
    const dispatch = useDispatch();

    const [formState, formDispatch] = useReducer(reducer, {
        inputValues: {
            title: editedProduct?.title ?? '',
            imageUrl: editedProduct?.imageUrl ?? '',
            description: editedProduct?.description ?? '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{ text: 'Okay' }])
        };
    }, [error]);

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }
        setIsLoading(true);
        serError(null);
        try {
            editedProduct ?
                await dispatch(productsActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                ))
                :
                await dispatch(productsActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                ))
            props.navigation.goBack();
        } catch (err) {
            serError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, prodId, formState]);


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


    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item title="Save" iconName="md-checkmark"
                        onPress={() => submitHandler()}
                    />
                </HeaderButtons>
            )
        });
    }, [submitHandler, props.navigation, props.route]);

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct?.title ?? ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id="imageUrl"
                        label="Image Url"
                        errorText="Please enter a valid image url!"
                        keyboardType="default"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct?.imageUrl ?? ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {!editedProduct &&
                        <Input
                            id="price"
                            label="Price"
                            errorText="Please enter a valid price!"
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />}
                    <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProducts;

