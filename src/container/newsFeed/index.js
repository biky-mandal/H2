import React, { useState, useEffect } from "react";
import Layout from "../../component/layout";
import { TextField } from "@material-ui/core";
import "./style.css";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { UploadPostAction } from "../../actions/postAction";

/**
 * @author
 * @function Newsfeed
 **/

const Newsfeed = (props) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [postImage, setPostImage] = useState(null);

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

  return (
    <Layout>
      <div className="newsfeed_main_div">
        <div className="sub_newsfeed">
          <div className="left-div"></div>
          <div className="middle-div"></div>
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
                  rows={4}
                />
                <input className="input_file" type="file" onChange={handleImage}/>
                <Row style={{marginTop: 10}}>
                    <Col md={{ span: 12, offset: 0 }}>
                        <button onClick={postCreationForm} className="post_btn">Post</button>
                    </Col>
                </Row>
              </form>
            </div>
            <div className="sub2-right-div"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Newsfeed;
