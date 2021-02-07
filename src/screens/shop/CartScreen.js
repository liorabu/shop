import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Card from '../../components/UI/Card';


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
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text>
                </Text>
                <Button
                    color={Colors.accent}
                    title="Order Now"
                    disabled={cartItems.length === 0}
                    
                    onPress={() =>
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount))}
                />
            </Card>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.id}
                    renderItem={itemData => <CartItem
                        key={itemData.item.id}
                        item={itemData.item}
                        deletable={true}
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