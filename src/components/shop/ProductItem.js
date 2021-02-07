import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../UI/Card';

const ProductItem = props => {
    return (
        <Card style={styles.product}>
            <TouchableOpacity onPress={props.onViewDetail} onPress={props.onSelect} useForeground >
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
            </TouchableOpacity>
        </Card>
    )
};

const styles = StyleSheet.create({
    product: {
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
        height: '17%',
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
        height: '23%',
        paddingHorizontal: 20
    }

});
export default ProductItem;