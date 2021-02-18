import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headerButton';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import * as OrdersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item title="Menu" iconName="md-menu" onPress={() =>
                        props.navigation.toggleDrawer()
                    } />
                </HeaderButtons>
            )
        });
    }, [props.navigation, props.route]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(OrdersActions.fetchOrders()).then(() => {
            setIsLoading(false)
        }
        );
    }, [dispatch, setIsLoading]);

    if (isLoading) {
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color={Colors.primary} />
            </View>
    }
    console.log(orders)

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={
                itemData =>
                    <OrderItem
                        amount={itemData.item.totalAmount}
                        date={itemData.item.readableDate}
                        items={itemData.item.items}
                    />
            }
        />
    )
};

const styles = StyleSheet.create({

})
export default OrderScreen;