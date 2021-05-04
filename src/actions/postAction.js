import { firebaseApp } from "../backend/fbConfig";
import { postConstants } from "../store/constant";

// FUnction to get the date
function GetFormattedDate() {
  let todayTime = new Date();
  const months = [
    "January","February","March","April",
    "May","June","July","August","September",
    "October","November","December"
  ];
  let month = months[todayTime.getMonth()];
  let day = todayTime.getDate().toString();
  let year = todayTime.getFullYear().toString();
  
  let hours = todayTime.getHours().toString();
  let minute = todayTime.getMinutes().toString();

  return day + " " + month + " " + year + " at " + hours + ":" + minute;
}

export const GetPostAction = () => {
  return async dispatch => {
    dispatch({
      type: postConstants.GET_POST_REQUEST
    })

    const user = firebaseApp.auth().currentUser
    if(user){
      const db = firebaseApp.firestore();
      await db
      .collection('posts')
      .orderBy('id', 'desc')
      .limit(3)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.docs.c);
        const documents = querySnapshot.docs.map(doc => doc.data())
        console.log(documents);
        dispatch({
          type: postConstants.GET_POST_SUCCESS,
          payload: {
            posts : documents
          }
        })
      }).catch(err => {
        console.log(err);
        dispatch({
          type: postConstants.GET_POST_FAILURE
        })
      })
    }
  }
}


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

              const postTime = GetFormattedDate();

              const user = firebaseApp.auth().currentUser;
              if (user) {
                console.log(user);
                const db = firebaseApp.firestore();
                db.collection("posts").doc(timeInMilliSeconds).set({
                  username: user.displayName,
                  userphotoUrl: user.photoURL,
                  email : user.email,
                  imageUrl : url,
                  post: post,
                  id: timeInMilliSeconds,
                  postTime: postTime
                })
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


export const createOkAction = (postId) => {
  return async dispatch => {
    const timeInMilliSeconds = new Date().getTime().toString();
    const user = firebaseApp.auth().currentUser
    console.log(postId)
    if(user){
      await firebaseApp.firestore()
      .collection('posts')
      .doc(postId)
      .collection('likes')
      .doc(timeInMilliSeconds)
      .set({
        userId: user.uid,
        id: timeInMilliSeconds
      }).then(() => {
        console.log("Liked")
      })
    }
  }
}