import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
    toke: null,
    userId: null,
    isLogedIn:false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                isLogedIn:true
            }
        case LOGOUT:
            return initialState;
        default:
            return state
    }
}