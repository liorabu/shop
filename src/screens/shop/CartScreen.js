import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);

    // transport the object to array
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return transformedCartItems;
    });
    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button
                    color={Colors.accent}
                    title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={() =>
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount))}
                />
            </View>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.id}
                    renderItem={itemData => <CartItem
                        item={itemData.item}
                        onRemove={() => { dispatch(removeFromCart(itemData.item.productId)) }}
                        onIncrease={() => { dispatch(increaseQuantity(itemData.item.productId)) }}
                        onDecrease={() => { dispatch(decreaseQuantity(itemData.item.productId)) }}
                    />}
                />

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',

        //in IOS
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 8,

        //in ANDROID
        elevation: 5,
    },
    summaryText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
})

export default CartScreen;