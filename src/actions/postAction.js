import { firebaseApp } from "../backend/fbConfig";
import { postConstants } from "../store/constant";
import firebase from 'firebase';

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
      // .limit(10)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot.docs.c);
        // Getting Three Document POST in an array
        const documents = querySnapshot.docs.map(doc => doc.data())
        console.log(documents);
        // Here I get The posts 
        // To get The Likes and comments in the Post We Then ,
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
                  postTime: postTime,
                  Likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
                  Comments: firebase.firestore.FieldValue.arrayUnion({
                    comment: `This Post is Created By ${user.displayName}`,
                    userphotoUrl: user.photoURL,
                    userName: user.displayName,
                    commentTime: postTime
                  })
                })
                .then(() => {
                  dispatch({
                      type: postConstants.CREATE_POST_SUCCESS,
                      payload: {
                        message: "Post Created!"
                      }
                  })
                  console.log("Post Created!")
                }).catch((err) => {
                  console.log(err);
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
    dispatch({
      type: postConstants.CREATE_OK_REQUEST
    })
    const user = firebaseApp.auth().currentUser
    // console.log(postId)
    if(user){
      await firebaseApp.firestore()
      .collection('posts')
      .doc(postId)
      .update({
        Likes: firebase.firestore.FieldValue.arrayUnion(user.uid)
      }).then(() => {
        const message = "Ok! UpVoted."
        console.log("Liked")
        dispatch({
          type: postConstants.CREATE_OK_SUCCESS,
          payload: {
            message : message
          }
        })
      }).catch((err) => {
        console.log(err);
        dispatch({
          type: postConstants.CREATE_OK_FAILURE
        })
      })
    }
  }
}

export const createCommentAction = (data) => {
  return async dispatch => {
    dispatch({
      type: postConstants.CREATE_COMMENT_REQUEST
    })
    const user = firebaseApp.auth().currentUser;
    if(user){
      const commentTime = GetFormattedDate();
      console.log(data.postId);
      await firebaseApp.firestore()
        .collection('posts')
        .doc(data.postId)
        .update({
          Comments: firebase.firestore.FieldValue.arrayUnion({
            comment: data.comment,
            userphotoUrl: user.photoURL,
            userName: user.displayName,
            commentTime: commentTime
          })
        }).then(() => {
          const message = "Comment Posted!"
          console.log(message);
          dispatch({
            type: postConstants.CREATE_COMMENT_SUCCESS,
            payload: {
              message: message
            }
          })
        }).catch((err) => {
          console.log(err);
          dispatch({
            type: postConstants.CREATE_COMMENT_FAILURE
          })
        })
    }
  }
}