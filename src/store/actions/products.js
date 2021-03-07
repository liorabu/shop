import { productsDB, editProduct, newProduct } from '../../api/firebase';
import Product from '../../models/product';

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch,getState) => {
      
        const userId=getState().auth.userId;
        console.log(userId)
        try {
            const response = await fetch(productsDB);

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            let resData = await response.json();
            const loadedProducts = [];
            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    resData[key].ownerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ));
            }
            dispatch({ type: SET_PRODUCTS, products: loadedProducts ,userOProducts:loadedProducts.filter(prod=>prod.ownerId===userId)})
        } catch (err) {
            throw err;
        }
    }
}

export const deleteProduct = productId => {
    return async (dispatch,getState) => {
        const token= getState().auth.token;
        const deleteProductDB = await editProduct(productId,token);
       const response=  await fetch(deleteProductDB, {
            method: 'DELETE',
        });

        if(!response.ok){
            throw new Error('Somthing went weong!');
        }
        dispatch({ type: DELETE_PRODUCT, pId: productId });
    }
};

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch,getState) => {
        const token= getState().auth.token;
        const userId = getState().auth.userId;
        const createProductDB = await newProduct(token,userId);
        try {
            const response = await fetch(createProductDB, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price,
                    ownerId:userId
                })
            });
            const resData = await response.json();
            dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    id: resData.name,
                    title,
                    description,
                    imageUrl,
                    price,
                    ownerId:userId
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch,getState) => {
        const token= getState().auth.token;
        const EditProductDB = await editProduct(id ,token);
       const response= await fetch(EditProductDB, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        });
        if(!response.ok){
            throw new Error('Somthing went weong!');
        }
        dispatch({
            type: UPDATE_PRODUCT,
            pId: id,
            productData: {
                title,
                description,
                imageUrl,
            }
        });
    };
};
