import React from 'react';
import { Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as CartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/headerButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
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

    const selectedItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetails',
            { productId: id, title: title })
    }


    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return <FlatList
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

export default ProductsOverviewScreen;