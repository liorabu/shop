import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.products.filter(product => product.ownerId === 'u1')
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(pro => pro.id != action.pId),
                availableProducts: state.availableProducts.filter(pro => pro.id != action.pId),
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: [...state.availableProducts, newProduct],
                userProducts: [...state.userProducts, newProduct]
            }
        case UPDATE_PRODUCT:
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pId);
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pId);

                const updatedProduct = new Product(
                    action.pId,
                    state.userProducts[productIndex].ownerId,
                    action.productData.title,
                    action.productData.imageUrl,
                    action.productData.description,
                    state.userProducts[productIndex].price
                )
                const updatedUserProducts=[...state.userProducts];
                updatedUserProducts[productIndex]=updatedProduct;
                const updatedAvailableProducts=[...state.availableProducts];
                updatedAvailableProducts[availableProductIndex]=updatedProduct;
                return {
                    ...state,
                    availableProducts:updatedUserProducts,
                    userProducts:updatedUserProducts
                }
        };
    
    return state;
};

