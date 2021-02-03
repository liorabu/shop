import React from 'react';
import {  FlatList, StyleSheet } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as CartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/headerButton';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

const ProductsOverviewScreen = props => {
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight:() =>(<HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title="Cart" iconName="cart-outline" onPress={()=>
               props.navigation.navigate('Cart')} />
            </HeaderButtons>)
        });
    }, [props.navigation, props.route]);


    const products = useSelector(state => state.products.availableProducts);
    const dispatch=useDispatch();

    return <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData =>
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={()=>{
                    props.navigation.navigate('ProductDetails',{productId:itemData.item.id,title:itemData.item.title})
                }}
                onAddToCart={() => {
                    dispatch(CartActions.addToCart(itemData.item));
                 }}
            />}
    />
};

const styles = StyleSheet.create({

});

export default ProductsOverviewScreen;