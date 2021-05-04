import React, { useState, useEffect } from "react";
import Layout from "../../component/layout";
import { TextField } from "@material-ui/core";
import "./style.css";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UploadPostAction, createOkAction } from "../../actions/postAction";
import img from '../../Images/169.jpg';
import {FiCheck, FiMessageSquare, FiX, FiSend} from 'react-icons/fi';

/**
 * @author
 * @function Newsfeed
 **/

const Newsfeed = (props) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [commentOn, setCommetOn] = useState(false);
  const [comment, setComment] = useState('');

  const poststate = useSelector(state => state.poststate);

  const handleImage = (e) => {
    if(e.target.files[0]){
        setPostImage(e.target.files[0]);
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
  }

  const comentDivClicked = () => {
    setCommetOn(true)
  }

  const closeCommentSection = () => {
    setCommetOn(false)
  }
  const okButtonClicked = (e) => {
    // Getting Id from Post
    // const postTime = document.getElementById("posttimeid").innerHTML
    const idOfPostFromClick = e.target.parentElement.parentElement.parentElement.id;
    if(idOfPostFromClick){
      console.log(idOfPostFromClick);
      dispatch(createOkAction(idOfPostFromClick));
    }
  }

  return (
    <Layout>
      <div className="newsfeed_main_div">
        <div className="sub_newsfeed">
          <div className="left-div"></div>
          {/* **************************************** */}
          <div className="middle-div">
            <div className="post-div-main-top">
              <label>All Updated POST will Appear Here.</label>
            </div>

            {
              commentOn ? 
                <div id="comment-box" className="comment_section_div">
                  <div className="comment_section_top">
                    <label>Comments</label>
                    <span onClick={closeCommentSection}><FiX/></span>
                  </div>
                  <div className="comment_section_middle">

                  </div>
                  <div className="comment_section_bottom">
                    <input
                      className="comment_input"
                      placeholder="post a Comment"
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <span><FiSend/></span>
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
                            <label className="count">123</label>
                          </div>
                          <div className="comment_div" onClick={comentDivClicked}>
                            <label><span><FiMessageSquare/></span>Comment</label>
                            <label className="count">26</label>
                          </div>
                      </div>
                    </div>
                  );
                }) : <label>Loading...</label>
            }
          </div>
          {/* ************************************** */}
          <div className="right-div">
            <div className="sub1-right-div">
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
                      <label className="tandc">
                        The post will be seen by all hostel Boarders So think
                        twice before posting any thing. And Choose Your Image of 
                        ratio <span>16:9</span>
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
