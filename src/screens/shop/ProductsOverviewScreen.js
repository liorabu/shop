import React, { useState, useEffect, useCallback } from 'react';
import { Button, FlatList, ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as CartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/headerButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [err, setErr] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setErr(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setErr(err.message)
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setErr]);

    const selectedItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails',
            { productId: id, title: title })
    }

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => setIsLoading(false))
    }, [dispatch, loadProducts]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadProducts);
        return unsubscribe;
    }, [loadProducts, dispatch])



    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title="Cart" iconName="cart-outline" onPress={() =>
                    props.navigation.navigate('Cart')} />
            </HeaderButtons>),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item title="Menu" iconName="md-menu" onPress={() =>
                        props.navigation.toggleDrawer()
                    } />
                </HeaderButtons>
            )
        });
    }, [props.navigation, props.route]);

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }
    if (err) {
        return <View style={styles.centered}>
            <Text>An error occurred!</Text>
            <Button title="try again" onPress={loadProducts} />
        </View>
    }

    if (!isLoading && products.length === 0) {
        return <View style={styles.centered}>
            <Text>No products found! Maybe stert adding some!</Text>
        </View>
    }
    
    return <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData =>
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    selectedItemHandler(itemData.item.id, itemData.item.title)
                }}
            >
                <Button color={Colors.primary} title="View Details" onPress={() => {
                    selectedItemHandler(itemData.item.id, itemData.item.title)
                }} />
                <Button color={Colors.primary} title="To Cart" onPress={() => {
                    dispatch(CartActions.addToCart(itemData.item));
                }} />
            </ProductItem>}
    />
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductsOverviewScreen;