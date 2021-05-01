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
                <div className="section parallax image1"> 
                    <h1>Some Text</h1>
                </div>
                <div className="section static">
                    <h1>No Backgorund section</h1>
                </div>

                <div className="section parallax image2"> 
                    <h1>Some Text</h1>
                </div>
                <div className="section static">
                    <h1>No Backgorund section</h1>
                </div>
                <div className="section parallax image3"> 
                    <h1>Some Text</h1>
                </div>
                <div className="section static">
                    <h1>No Backgorund section</h1>
                </div>
            </div>
        </Layout>
    )

}

export default Homepage