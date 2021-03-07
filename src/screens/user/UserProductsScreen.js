import React from 'react';
import { FlatList, Button, StyleSheet, Alert, View, Text } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headerButton';
import Colors from '../../constants/Colors';
import * as ProductsAction from '../../store/actions/products';

const UserProductScreen = props => {
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item title="Add" iconName="md-create" onPress={() =>
                        props.navigation.navigate('EditProduct')
                    } />
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item title="Menu" iconName="md-menu" onPress={() =>
                        props.navigation.toggleDrawer()
                    } />
                </HeaderButtons>
            )
        });
    }, [props.navigation, props.route]);
    const userProducts =  useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        return props.navigation.navigate('EditProduct', { productId: id })
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(ProductsAction.deleteProduct(id))
                }
            }
        ])
    }

    if (!userProducts || userProducts.length === 0) {
        return <View style={styles.centered}>
            <Text>No products found. maybe start creating some?</Text>
        </View>
    }
   

    return <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
                editProductHandler(itemData.item.id)
            }}
        >
            <Button
                color={Colors.primary}
                title="Edit"
                onPress={() => {
                    editProductHandler(itemData.item.id)
                }} />
            <Button
                color={Colors.primary}
                title="Delete"
                onPress={deleteHandler.bind(this, itemData.item.id)}
            />
        </ProductItem>}
    />
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserProductScreen;