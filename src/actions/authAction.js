import { firebaseApp } from '../backend/fbConfig';
import {authConstants} from '../store/constant';
import firebase from 'firebase';

//////////////////// User is Logged in Or Not ///////////////
export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if(token){
            await firebaseApp.auth()
                .onAuthStateChanged((user) => {
                    const email = user.email;
                    const emailVerified = user.emailVerified;
                    const displayName = user.displayName;
    
                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        payload: {
                            token, email, emailVerified, displayName
                        }
                    });
                })
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
                user.getIdToken().then((token) => {

                    const email = user.email;
                    const emailVerified = user.emailVerified;
                    const displayName = user.displayName;

                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('displayName', displayName);

                    dispatch({
                        type: authConstants.REGISTER_SUCCESS,
                        payload: {
                            token, email, emailVerified, displayName
                        }
                    })
                }).catch((error) => {
                    console.log(error);
                    dispatch({
                        type: authConstants.REGISTER_FAILURE
                    })
                });
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
                user.getIdToken().then((token) => {

                    const email = user.email;
                    const emailVerified = user.emailVerified;
                    const displayName = user.displayName;

                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('displayName', displayName);


                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        payload: {
                            token, email, emailVerified, displayName
                        }
                    })
                }).catch((error) => {
                    console.log(error);
                    dispatch({
                        type: authConstants.LOGIN_FAILURE
                    })
                });
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
                if(user){
                    const email = user.email;
                    const emailVerified = user.emailVerified;
                    const displayName = user.displayName;

                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('displayName', displayName);

                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        payload: {
                            token, email, emailVerified, displayName
                        }
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: authConstants.LOGIN_FAILURE
                })
                console.log(error);
            })
    }
}