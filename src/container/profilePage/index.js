import React, { useRef, useState } from 'react';
import Layout from '../../component/layout';
import './style.css';
import { FiUser, FiMail, FiPhone, FiInstagram, FiFacebook, FiLinkedin, FiTwitter, FiEdit, FiEdit3 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { FcHighPriority, FcApproval } from 'react-icons/fc';
import DetailSection from '../../component/UI';
import {Modal, Row, Col, Container } from 'react-bootstrap';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


/**
* @author
* @function Profilepage
**/

const Profilepage = (props) => {
    const auth = useSelector(state => state.auth);
    // const childRef = useRef();

    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    // For Modal
    const handleModalOpen = () => {
        setOpen(true);
    }
    const handleModalClose = () => {
        setOpen(false);
    }
    // Upload User data
    const uploadUserData = () => {

    }

    // const openModal = () => {
    //     childRef.current.handleModalOpen();
    // }

    return (
        <Layout>
            <div className="profile-div">
                {/* <AppModal ref={childRef}/> */}
                {/* Modal Start Here */}
                {
                    <Modal className="modal" show={open} onHide={handleModalClose} animation={true}>
                    <Modal.Body className="product-modal-body">
                        <Container style={{marginTop: 20}}>
                            <Row style={{  }}>
                                <Col md={{ span: 10 , offset: 1}}>
                                    <label className="modal_heading">Enter Email</label>
                                    <ValidatorForm useref="form" onSubmit={uploadUserData}>
                                        <TextValidator 
                                            fullWidth
                                            className="input-field"
                                            placeholder="Enter Email"
                                            value={data}
                                            type="text"
                                            variant = "outlined"
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            onChange={(e) => setData(e.target.value)}
                                        />                                                      
                                        <label className="tandc">
                                            Welcome Again! By Logging in you can
                                            explore more and connect with your batchmates.
                                        </label>
                                        <button className="register-btn">
                                            Login
                                        </button>
                                    </ValidatorForm>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="Delete-btn" onClick={handleModalClose}>
                            Close
                        </button>
                        <button className="Update-btn" onClick={handleModalClose}>
                            Import
                        </button>
                    </Modal.Footer>
                    </Modal>
                }
                {/* Left Div */}
                <div className="profile_left_div">
                    <div className="profile_photo_div">
                        <div className="profile_photo">
                            
                        </div>
                        <span className="edit-profile"><FiEdit3/></span>
                    </div>
                    <div className="Profile_details_div">

                        <label className="name-lbl"><span><FiUser/></span>{auth.displayName}</label>

                        <label className="email-lbl">
                            <span><FiMail/></span>
                            {auth.email}
                            {auth.emailVerified ? 
                                <span className="verify"><FcApproval/></span>
                                :
                                <span className="verify"><FcHighPriority/></span>
                            }
                        </label>

                        <label className="email-lbl">
                            <span><FiPhone/></span>
                                847280283
                            <span className="edit-btn" onClick={handleModalOpen}><FiEdit3/></span>
                        </label>

                        <label className="social-link-lbl">Social Links</label>

                        <label className="email-lbl">
                            <span><FiLinkedin/></span>
                            <a href="https://www.instagram.com/biky.me/" target="_blank">LinkedIn</a>
                            <span className="edit-btn"><FiEdit3/></span>
                        </label>

                        <label className="name-lbl">
                            <span><FiInstagram/></span>
                            <a href="https://www.instagram.com/biky.me/" target="_blank">Instagram</a>
                            <span className="edit-btn"><FiEdit3/></span>
                        </label>

                        <label className="email-lbl">
                            <span><FiFacebook/></span>
                            <a href="https://www.instagram.com/biky.me/" target="_blank">Facebook</a>
                            <span className="edit-btn"><FiEdit3/></span>
                        </label>

                        <label className="email-lbl">
                            <span><FiTwitter/></span>
                            <a href="https://www.instagram.com/biky.me/" target="_blank">Twitter</a>
                            <span className="edit-btn"><FiEdit3/></span>
                        </label>
                    </div>
                </div>

                {/* Right Div */}
                <div className="profile_right_div">
                    <div className="profile_right_div_scrollable">
                        <DetailSection heading="Branch At JEC" body="Choose Your Branch"/>
                        <DetailSection heading="Batch" body="2018 to 2022"/>
                        <DetailSection heading="Home Address" body="Please Enter Your Home Address..Like Dibrugarh, Assam"/>
                        <DetailSection heading="Current Address" body="Please Enter Your Current Address..Guwahati, Assam"/>
                        <DetailSection heading="Occupation" body="Please Enter Your Occupation in brief."/>
                        <DetailSection heading="PassOut Year Room no." body="Please Enter Your Last year Hostel Room No"/>
                    </div>
                </div>
            </div>
        </Layout>
    )

}

export default Profilepage