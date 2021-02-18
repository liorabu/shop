export const firebase='https://shop-d201f-default-rtdb.firebaseio.com/';
export const productsDB='https://shop-d201f-default-rtdb.firebaseio.com/products.json';
export const ordersDB='https://shop-d201f-default-rtdb.firebaseio.com/orders/u1.json';

export const editProduct=id=>{
    return `https://shop-d201f-default-rtdb.firebaseio.com/products/${id}.json`;
}