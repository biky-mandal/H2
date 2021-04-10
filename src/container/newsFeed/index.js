import React, { useState, useEffect } from 'react';
import Layout from '../../component/layout';
import { TextField } from '@material-ui/core';
import './style.css'

/**
* @author
* @function Newsfeed
**/

const Newsfeed = (props) => {
    const [post, setPost] = useState('');

    return (
        <Layout>
            <div className="newsfeed_main_div">
                <div className="sub_newsfeed">
                    <div className="left-div">

                    </div>
                    <div className="middle-div">

                    </div>
                    <div className="right-div">
                        <div className="sub1-right-div">
                            <form noValidate autoComplete="off">
                                <label className="create_post_lbl">
                                    Create Post
                            </label>
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
                            </form>
                        </div>
                        <div className="sub2-right-div">

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}

export default Newsfeed