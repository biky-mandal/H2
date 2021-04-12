import { firebaseApp } from '../backend/fbConfig';
import {authConstants} from '../store/constant';
import firebase from 'firebase';

//////////////////// User is Logged in Or Not ///////////////
export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if(token){
            const user = firebaseApp.auth().currentUser
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
    }
}
/////////////////////// Register Action /////////////////////
export const RegisterAction = (userEmail, userPassword, userName) => {
    return async dispatch => {
        dispatch({
            type: authConstants.REGISTER_REQUEST
        })
        await firebaseApp.auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            if(user){
                user.updateProfile({
                    displayName: userName
                })
                const token = user.getIdToken();
                localStorage.setItem('token', token);

                dispatch({
                    type: authConstants.REGISTER_SUCCESS,
                    payload: {
                        token, user
                    }
                })
            }
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: authConstants.REGISTER_FAILURE
            })
        })
    }
}

/////////////////////// Login Action ////////////////////////
export const LoginAction = (userEmail, userPassword) => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        })
        await firebaseApp.auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            if(user){
                const token = user.getIdToken();
                localStorage.setItem('token', token);

                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                })
            }
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: authConstants.LOGIN_FAILURE
            })
        })
    }
}

////////////////////// Logout Action ////////////////////
export const LogoutAction = () => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })

        await firebaseApp.auth().signOut()
        .then(() => {
            // Clearing localStorage
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            })
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: authConstants.LOGOUT_FAILURE
            })
        })
    }
}

//////////////// Login With Google ////////////////////////////////

export const LoginWithGoogleAction = () => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        })

        const provider = new firebase.auth.GoogleAuthProvider();
        await firebaseApp.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                localStorage.setItem('token', token);
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        user, token
                    }
                })
            })
            .catch((error) => {
                dispatch({
                    type: authConstants.LOGIN_FAILURE
                })
                console.log(error);
            })
    }
}