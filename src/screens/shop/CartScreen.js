import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${cartTotalAmount}</Text>
                </Text>
                <Button color={Colors.accent} title="Order Now" />
            </View>
            <View>
                <Text>CART ITEMS</Text>

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