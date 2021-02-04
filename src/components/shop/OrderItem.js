import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return <View style={styles.OrderItem}>
        <View style={styles.summary}>
            <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button
            color={Colors.primary}
            title={showDetails? "Hide Details" :"Show Details"}
            onPress={() => {
                setShowDetails(prevState => !prevState)
            }}
        />
        {showDetails && <View style={{width:'100%'}}>
            {props.items.map(cartItem=>
            <CartItem key={cartItem.productId} item={cartItem}/>
            )}
        </View> }
    </View>
};
const styles = StyleSheet.create({
    OrderItem: {
        //in IOS
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 8,

        //in ANDROID
        elevation: 5,

        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        color: '#888'
    }
});

export default OrderItem;