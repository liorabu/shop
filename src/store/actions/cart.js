export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART='REMOVE_FROM_CART';
export const INCREASE_QUANTITY='INCREASE_QUANTITY';
export const DECREASE_QUANTITY='DECREASE_QUANTITY';

export const addToCart = product => {
    return { type: ADD_TO_CART, product:product };
};

export const removeFromCart = productId=>{
    return { type: REMOVE_FROM_CART, pId:productId };
};

export const increaseQuantity=productId=>{
    return { type: INCREASE_QUANTITY, pId:productId };
};

export const decreaseQuantity=productId=>{
    return { type: DECREASE_QUANTITY, pId:productId };
};