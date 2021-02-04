import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemQuantity}>
                {props.deletable && <TouchableOpacity onPress={props.onIncrease} style={styles.increaseButton}>
                    <Ionicons name="add" size={25} color='red' />
                </TouchableOpacity>}
                <Text style={styles.quantity}>{props.item.quantity}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onDecrease} style={styles.increaseButton}>
                    <Entypo name="minus" size={25} color='red' />
                </TouchableOpacity>}
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>{props.item.productTitle}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.item.sum.toFixed(2)}</Text>
                {props.deletable &&
                    (<TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                        <Ionicons name="md-trash" size={23} color='red' />
                    </TouchableOpacity>)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,      
    },
    itemData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    itemQuantity: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
  
    },
    increaseButton: {
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'OpenSans-Regular',
        color: '#888',
        fontSize: 16,
    },
    mainText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,

    },
    deleteButton: {
        marginLeft: 20,
        alignItems: 'flex-end'
    }
});

export default CartItem;