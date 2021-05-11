import React, { useState, useEffect, useRef } from "react";
import Layout from "../../component/layout";
import { TextField } from "@material-ui/core";
import "./style.css";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UploadPostAction, createOkAction, createCommentAction, GetPostAction } from "../../actions/postAction";
import {FiCheck, FiMessageSquare, FiX, FiSend} from 'react-icons/fi';
import Snackbar from '../../component/snackbar';

/**
 * @author
 * @function Newsfeed
 **/

const Newsfeed = (props) => {
  const dispatch = useDispatch();

  const childref = useRef();

  const [post, setPost] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [commentOn, setCommetOn] = useState(false);
  const [comment, setComment] = useState(null);
  const [postId, setPostId] = useState();

  const poststate = useSelector(state => state.poststate);

  const getUpdatedPost = () => {
    dispatch(GetPostAction());
    console.log("Ok")
  }

  // It will Refresh the Page Every time whenever the Post Is CHanges
  useEffect(() => {

  },[poststate])

  useEffect(() => {

  }, []);

  const showSnack = () => {
    childref.current.showSnackBar()
  }

  const handleImage = (e) => {
    if(e.target.files[0]){
        setPostImage(e.target.files[0]);
        let src = URL.createObjectURL(e.target.files[0]);
        let preview = document.getElementById("selected_img");
        preview.src = src;
        preview.style.display = "block";
    }
  }

  const postCreationForm = (e) => {
    e.preventDefault();
    if(post && postImage){
      console.log("Form submission Worked!")
      dispatch(UploadPostAction(post, postImage))
    }
    setPost('');
    setPostImage(null);
    setTimeout(getUpdatedPost, 2000);
    showSnack();

  }

  const comentDivClicked = (e) => {
    setCommetOn(true);
    const idOfPostFromClick = e.target.parentElement.parentElement.parentElement.id;
    console.log(idOfPostFromClick);
    // Setting The Id Of The Post For Future Reference.
    setPostId(idOfPostFromClick)
    setTimeout(getUpdatedPost, 2000);
  }

  const closeCommentSection = () => {
    setCommetOn(false)
  }
  

  // When Someone click on oK Button This Function Runs

  const okButtonClicked = (e) => {
    // Getting Id from Post
    const idOfPostFromClick = e.target.parentElement.parentElement.parentElement.id;
    if(idOfPostFromClick){
      console.log(idOfPostFromClick);
      dispatch(createOkAction(idOfPostFromClick));
    }
    showSnack();
    setTimeout(getUpdatedPost, 3000);
  }

  
  // When Someone Send Comment

  const commentSendButtonCLicked = () => {
    if(postId && comment){
      const data = {
        postId: postId,
        comment: comment
      }
      dispatch(createCommentAction(data));
      setComment('');
      showSnack();
      setTimeout(getUpdatedPost, 2000);
    }else{
      
    }
  }

  
  return (
    <Layout>
      <div className="newsfeed_main_div">
        <div className="sub_newsfeed">
          {/* SnackBar  **********************/}
          {/* <div className="snackbar">
            <div>{poststate.message}</div>
          </div> */}
          <Snackbar ref={childref} message={poststate.message}/>

          {/* ******************** */}
          <div className="left-div"></div>
          {/* **************************************** */}
          <div className="middle-div">
            {
              commentOn ? 
                <div id="comment-box" className="comment_section_div">
                  <div className="comment_section_top">
                    <label>Comments</label>
                    <span onClick={closeCommentSection}><FiX/></span>
                  </div>
                  <div className="comment_section_middle">
                    {
                      poststate.posts ? 
                      poststate.posts.map(post => {
                        // Filtering With the Selected Div
                        if(post.id === postId){
                          // Now Mapping the COmments Array
                          return post.Comments.map(com => {
                            return(
                              <div key={com.comment} className="each_comment_div">
                                <div className="each_comment_div_left">
                                  <div className="left_profile_pic"><img src={com.userphotoUrl}/></div>
                                </div>
                                <div className="each_comment_div_right">
                                  <label className="comment_user_name">{com.userName}<span> . </span><span>{com.commentTime}</span></label>
                                  <label className="comment">{com.comment}</label>
                                </div>
                              </div>
                            );
                          })
                        }
                      })
                      :
                      null
                    }
                  </div>
                  <div className="comment_section_bottom">
                    <input
                      className="comment_input"
                      placeholder="post a Comment"
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <span onClick={commentSendButtonCLicked}><FiSend/></span>
                  </div>
                </div>
              :
                poststate.posts ? 
                poststate.posts.map(post => {
                  return(
                    <div id={post.id} className="post_div" key={Math.random()}>
                      <div className="post_top">
                        <div className="profile_photo_in_feed_div">
                          <img src={post.userphotoUrl}/>
                        </div>
                        <div className="name_and_time_div">
                          <label className="profileName_lbl_in_post">{post.username}</label>
                          <label className="date_of_post">{post.postTime}</label>
                        </div>
                      </div>
                      <div className="post_bottom">
                        <label className="post_lbl">
                          {post.post}
                        </label>
                      </div>
                      <div className="post_mid"> 
                        <img src={post.imageUrl}/>
                      </div>
                      <div className="like_and_comment_box">
                          <div className="like_div" onClick={okButtonClicked}>
                            <label><span><FiCheck/></span>ok</label>
                            <label className="count"><span> . </span>{post.Likes.length}</label>
                          </div>
                          <div className="comment_div" onClick={comentDivClicked}>
                            <label><span><FiMessageSquare/></span>Comment</label>
                            <label className="count">{post.Comments.length}</label>
                          </div>
                      </div>
                    </div>
                  );
                }) 
                :             
                <div className="post-div-main-top">
                  <label>All Updated POST will Appear Here.</label>
                </div>
            }
          </div>
          {/* ************************************** */}
          <div className="right-div">
            <div className="sub1-right-div">
              <label className="create_post_lbl">Create A Post</label>
              <form noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Write what's in your mind!"
                  variant="outlined"
                  className="inpt-post"
                  multiline
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  rows={6}
                />
                <input className="input_file" type="file" onChange={handleImage}/>
                
                <Row style={{marginTop: 10}}>
                    <Col md={{ span: 12, offset: 0 }}>
                      <img id="selected_img" src="https://i.ibb.co/ZVFsg37/default.png" />
                    </Col>
                </Row>
                <Row style={{marginTop: 10}}>
                    <Col md={{ span: 12, offset: 0 }}>
                      <label className="tandc1">
                        The post will be seen by all hostel Boarders So think
                        twice before posting any thing. You Can Include One Image At a Time. <span>Selected Image Will Appear on Top.</span>
                      </label>
                      <button onClick={postCreationForm} className="post_btn">Post</button>
                    </Col>
                </Row>
              </form>
            </div>
          </div>
          {/* **************************************** */}
        </div>
      </div>
    </Layout>
  );
};

export default Newsfeed;
