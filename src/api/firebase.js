export const firebase = 'https://shop-d201f-default-rtdb.firebaseio.com/';


export const ordersDB=(userId) =>{
    return `https://shop-d201f-default-rtdb.firebaseio.com/orders/${userId}.json`;
} 
export const addOrdersDB =(userId,token)=>{
    return `https://shop-d201f-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`;
    } 


export const productsDB = 'https://shop-d201f-default-rtdb.firebaseio.com/products.json';

export const newProduct = (token) => {
    return `https://shop-d201f-default-rtdb.firebaseio.com/products.json?auth=${token}`;
}

export const editProduct = (id, token) => {
    return `https://shop-d201f-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`;
}

const webKey = 'AIzaSyDjN4uNwEsOXyVUqzoNJwAgbybnuQbSQkw';
export const signUpApi = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webKey}`;
export const signInApi = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webKey}`;