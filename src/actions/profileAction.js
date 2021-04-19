import { firebaseApp } from '../backend/fbConfig';
import { profileConstants } from '../store/constant';

export const GetProfileAction = () => {
    return async dispatch => {
        dispatch({
            type: profileConstants.GET_USER_PROFILE_REQUEST
        })

        const user = firebaseApp.auth().currentUser
        console.log(user)
        if(user){
            console.log(user.email)
            const db = firebaseApp.firestore();
            const ref = db.collection('users').doc(user.email);
            const doc = await ref.get();
            if (!doc.exists) {
                console.log('No such document!');
                dispatch({
                    type: profileConstants.GET_USER_PROFILE_FAILURE
                })
            } else {
                console.log('Document data:', doc.data());
                const profile = doc.data();
                dispatch({
                    type: profileConstants.GET_USER_PROFILE_SUCCESS,
                    payload: {
                        userDetails: profile
                    }
                })
            }
        }
    }
}

export const UploadProfilePictureAction = (profileImage) => {
    return async dispatch => {
        dispatch({
            type: profileConstants.UPLOAD_PROFILE_PHOTO_REQUEST
        })

        await firebaseApp
        .storage()
        .ref(`profilePictures/${profileImage.name}`)
        .put(profileImage)
        .on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                firebaseApp.storage().ref("profilePictures")
                .child(profileImage.name)
                .getDownloadURL()
                .then(url => {
                    firebaseApp.auth().currentUser.updateProfile({
                        photoURL: url
                    }).then(() => {
                        localStorage.setItem('photoURL', url);
                        dispatch({
                            type: profileConstants.UPLOAD_PROFILE_PHOTO_SUCCESS,
                            payload: url
                        })
                    }).catch(function(error) {
                        console.log('photoUrl Not Updated!')
                    });
                });
            }
        )
    }
}

export const UploadDataAction = (data) => {
    return async dispatch => {
        dispatch({
            type: profileConstants.UPLOAD_DATA_REQUEST
        })
        const user = firebaseApp.auth().currentUser
        if(user){
            const db = firebaseApp.firestore();
            await db.collection('users').doc(user.email).set({
                    phoneNumber : data
                }, {merge: true})
                .then(() => {
                    dispatch({
                        type: profileConstants.UPLOAD_DATA_SUCCESS
                    })
                    console.log("Updated!")
                }).catch(() => {
                    console.log("Something Went Wrong!")
                    dispatch({
                        type: profileConstants.UPLOAD_DATA_FAILURE
                    })
                })
        }
    }
}