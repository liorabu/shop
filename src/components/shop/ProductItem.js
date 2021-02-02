import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = props => {
    return (
        <View style={styles.product}>
            <TouchableOpacity onPress={props.onViewDetail} useForeground >
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail} />
                <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart} />
            </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    product: {
        //in IOS
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 8,

        //in ANDROID
        elevation: 5,

        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        overflow:'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4,
        fontFamily:'OpenSans-Bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily:'OpenSans-Regular'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }

});
export default ProductItem;