export const ADD_ORDER = 'ADD_ORDER';
import { ordersDB,addOrdersDB } from '../../api/firebase';
import Order from '../../models/order';
export const SET_ORDERS='SET_ORDERS';


export const fetchOrders=()=>{
    return async (dispatch,getState)=>{
        try {
            const userId = getState().auth.userId;
            const ordersApi= await ordersDB(userId);
            const response = await fetch(ordersApi);

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const resData = await response.json();
            const loadedOrders = [];
            for (const key in resData) {
                loadedOrders.push(new Order(
                    key,
                    resData[key].catrItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ));
            }
            dispatch({ type: SET_ORDERS, orders: loadedOrders })
        } catch (err) {
            throw err;
        }
    };
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch,getState) => {
        const date = new Date();
        const token=getState().auth.token;
        const userId=getState().auth.userId;
        const addOrderApi=addOrdersDB(userId,token)
        const response = await fetch(addOrderApi, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        dispatch({
            id: resData.name,
            type: ADD_ORDER,
            orderData: { items: cartItems, amount: totalAmount, date: date }
        });


    }

}