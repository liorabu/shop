import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headerButton';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/actions/products';

const EditProducts = props => {

    const prodId = props.route?.params?.productId;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const [title, setTitle] = useState(editedProduct?.title ?? '');
    const [imageUrl, setImageUrl] = useState(editedProduct?.imageUrl ?? '');
    const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
    const [description, setDescription] = useState(editedProduct?.description ?? '');

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        {
            editedProduct ?
                dispatch(updateProduct(prodId, title, description, imageUrl))
                :
                dispatch(createProduct(title, description, imageUrl, +price))
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price]);


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

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                    />
                </View>
                {!editedProduct && <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={text => setPrice(text)}
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'OpenSans-Bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    }
});

export default EditProducts;

