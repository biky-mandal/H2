import { firebaseApp } from "../backend/fbConfig";
import { postConstants } from "../store/constant";

export const UploadPostAction = (post, image) => {
  return async (dispatch) => {
    dispatch({
      type: postConstants.CREATE_POST_REQUEST,
    });

    await firebaseApp
      .storage()
      .ref(`images/${image.name}`)
      .put(image)
      .on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          firebaseApp
            .storage()
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              const timeInMilliSeconds = new Date().getTime().toString();

              const user = firebaseApp.auth().currentUser;
              if (user) {
                const db = firebaseApp.firestore();
                db.collection("posts").doc(timeInMilliSeconds).set({
                  email : user.email,
                  imageUrl : url,
                  post: post
                }, {merge : true})
                .then(() => {
                  dispatch({
                      type: postConstants.CREATE_POST_SUCCESS
                  })
                  console.log("Post Created!")
                }).catch(() => {
                  dispatch({
                      type: postConstants.CREATE_POST_FAILURE
                  })
                  console.log("Post Creation Failed!")
                })
              }
            });
        }
      );
  };
};
