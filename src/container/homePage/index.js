import React from 'react';
import Layout from '../../component/layout';
import './style.css';
import Typical from 'react-typical';
import webbg1 from '../../Images/desktopbg1.jpeg';
import p1 from '../../Images/post1.png';
import p2 from '../../Images/post2.png';
import p3 from '../../Images/post3.png';
import p4 from '../../Images/phonebg1.jpeg'
import {FiArrowRight} from 'react-icons/fi'
import { NavLink } from 'react-router-dom';

/**
* @author
* @function Homepage
**/

const Homepage = (props) => {
    return (
        <Layout>
            <div className="wrapper">
                <div className="mid-div-box">
                    <div className="homepage_header_main_div">
                        <div className="main-label">Welcome to</div>
                        <label className="main-label1">
                        <Typical
                            steps={['', 2000, 'Hostel Dui', 5000, '', 2000, 'Official', 5000]}
                            loop={Infinity}
                            wrapper="label"
                        />
                        </label>
                    </div>
                    <label className="tag-lbl">Home away from Home. 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua.
                    </label>
                    <NavLink to="profile" className="about_us_in_home">Update Profile</NavLink>
                </div>
                <div className="_div1">
                    <div className="left_div1">
                        <label className="card_header">Hostel</label>
                        <label className="card_desc">
                            Know more about the current Situation of the Hostel.
                        </label>
                        <NavLink className="go_in_link" to="profile">know more<span><FiArrowRight/></span></NavLink>
                    </div>
                    <div className="right_div1">
                        <img src={p1} alt="p1"/>
                    </div>
                </div>

                <div className="_div2">
                    <div className="left_div2">
                        <img src={p3} alt="p3"/>
                    </div>
                    <div className="right_div2">
                        <label className="ldv_h_l"></label>
                    </div>
                </div>

                <div className="_div1">
                    <div className="left_div1">
                        <label className="card_header">Batchmates</label>
                        <label className="card_desc">
                            Find Out Your Batchmates and help us to maintain record of all Hostel Boarders
                        </label>
                        <NavLink className="go_in_link" to="profile">find your batchmates<span><FiArrowRight/></span></NavLink>
                    </div>
                    <div className="right_div1">
                        <img src={p2} alt="p2"/>
                    </div>
                </div>

                <div className="Short_Card_Div">
                    <div className="card">
                        <div className="card_top_div">
                            <img src={p1} alt="p1"/>
                        </div>
                        <div className="card_bottm_div">
                            <label className="card_header">Hostel</label>
                            <label className="card_desc">
                                Know more about the current Situation of the Hostel.
                            </label>
                            <NavLink className="go_in_link" to="profile">know more<span><FiArrowRight/></span></NavLink>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card_top_div">
                            <img src={p2} alt="p2"/>
                        </div>
                        <div className="card_bottm_div">
                            <label className="card_header">Batchmates</label>
                            <label className="card_desc">
                                Find Out Your Batchmates and help us to maintain record of all Hostel Boarders
                            </label>
                            <NavLink className="go_in_link" to="profile">find your batchmates<span><FiArrowRight/></span></NavLink>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card_top_div">
                            <img src={p3} alt="p3"/>
                        </div>
                        <div className="card_bottm_div">
                            <label className="card_header">Explore Feed</label>
                            <label className="card_desc">
                                Explore the Feed. We Keep You Updated About The Hostel.
                            </label>
                            <NavLink className="go_in_link" to="newsfeed">explore feed <span><FiArrowRight/></span></NavLink>
                        </div>
                    </div>
                </div>

                <div className="Quicbar">

                </div>

            </div>
        </Layout>
    )

}

export default Homepage