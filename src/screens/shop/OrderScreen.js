import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headerButton';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = props => {
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft:()=>(
                <HeaderButtons HeaderButtonComponent={HeaderButton} >
                    <Item title="Menu" iconName="md-menu" onPress={()=>
                     props.navigation.toggleDrawer()
                    }/>
                </HeaderButtons>
            )
        });
    }, [props.navigation, props.route]);
    const orders = useSelector(state => state.orders.orders);
    return (
        <FlatList
            data={orders}
            renderItem={
                itemData => <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate}/>
            }
        />
    )
};

const styles = StyleSheet.create({

})
export default OrderScreen;