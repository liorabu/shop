import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const ProdTitle = addedProduct.title;
            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    ProdTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, ProdTitle, prodPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            }
        case REMOVE_FROM_CART:
            const selectedItem = state.items[action.pId]
            const updatedCartItems = { ...state.items };

            delete updatedCartItems[action.pId]
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedItem.sum
            }
        case INCREASE_QUANTITY:
            let itemToUpdate = state.items[action.pId]
            itemToUpdate.quantity += 1;
            itemToUpdate.sum += itemToUpdate.productPrice
            return {
                ...state,
                items: { ...state.items, [action.pId]: itemToUpdate },
                totalAmount: state.totalAmount + itemToUpdate.productPrice
            }
        case DECREASE_QUANTITY:
            itemToUpdate = state.items[action.pId]
            if (itemToUpdate.quantity > 1) {
                itemToUpdate.quantity -= 1;
                itemToUpdate.sum -= itemToUpdate.productPrice
                return {
                    ...state,
                    items: { ...state.items, [action.pId]: itemToUpdate },
                    totalAmount: state.totalAmount - itemToUpdate.productPrice
                }
            }
        case ADD_ORDER:
            return initialState;
        default:
            return state;
    }

};