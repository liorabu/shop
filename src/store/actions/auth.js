import AsyncStorage from '@react-native-community/async-storage';
import { signUpApi, signInApi } from '../../api/firebase';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        // dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token })
    }
}

export const signup = (email, password) => {
    try {
        return async dispatch => {
            const response = await fetch(signUpApi,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                });
            if (!response.ok) {
                const errResData = await response.json();
                let message = 'Something went wrong!';
                const errorId = errResData.error.message;
                if (errorId === 'EMAIL_EXISTS') {
                    message = 'This email allready exists!'
                }
                throw new Error(message)
            }
            const resData = await response.json();
            dispatch(
                authenticate(
                    resData.idToken,
                    resData.localId,
                    parseInt(resData.expiresIn) * 1000
                )
            );
            const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
            saveDataToStorage(resData.idToken, resData.localId, expirationDate);
        }
    } catch (err) {
        console.log(err)
    }
}

export const login = (email, password) => {
    try {
        return async dispatch => {
            const response = await fetch(signInApi,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                });
            if (!response.ok) {
                const errResData = await response.json();
                let message = 'Something went wrong!';
                const errorId = errResData.error.message;
                if (errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD') {
                    message = 'invalid email or password'
                }
                throw new Error(message)
            }
            const resData = await response.json();
            dispatch(
                authenticate(
                    resData.idToken,
                    resData.localId,
                    parseInt(resData.expiresIn) * 1000
                )
            );
            const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
            saveDataToStorage(resData.idToken, resData.localId, expirationDate);
        }
    } catch (err) {
        console.log(err)
    }
}

export const logout = () => {
    // clearLogOutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
}

const clearLogOutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer => setTimeout(() => {
            dispatch(logout())
        }, expirationTime);

    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        })
    );
}

