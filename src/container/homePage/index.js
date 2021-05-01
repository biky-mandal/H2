import React from 'react';
import Layout from '../../component/layout';
import './style.css';

/**
* @author
* @function Homepage
**/

const Homepage = (props) => {
    return (
        <Layout>
            <div className="wrapper">
                <div className="section section-bg parallax image1"> 
                    <div className="left-div-box">
                        <label className="main-label">Hostel Dui</label>
                        <label className="tag-lbl">Home away from Home. 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna 
                            aliqua.
                        </label>
                        <button className="about_us_in_home">Know More</button>
                    </div>
                </div>
                <div className="section static1">
                    <h1>No Backgorund section</h1>
                </div>

                <div className="section parallax parallax-2 image2"> 
                    <label className="Quote-tag">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed
                    </label>
                </div>
                <div className="section2 static2">
                    <h1>No Backgorund section</h1>
                </div>
                <div className="section parallax image3"> 
                    <h1>Some Text</h1>
                </div>
                <div className="section static3">
                    <h1>No Backgorund section</h1>
                </div>
            </div>
        </Layout>
    )

}

export default Homepage