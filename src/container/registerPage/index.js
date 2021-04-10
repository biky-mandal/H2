import React, { useState } from 'react';
import { Row,Col, Container, Form } from 'react-bootstrap';
import Layout from '../../component/layout';
import Input from '../../component/UI';
import loginbg from '../../Images/login1.png';
import './style.css';
import {RegisterAction} from '../../actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function Registerpage
**/

const Registerpage = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userName, setUserName] = useState('');

    if(auth.authenticate){
        return <Redirect to={'/'} />
    }

    const registerUser = (e) => {
        e.preventDefault();
        dispatch(RegisterAction(userEmail, userPassword, userName));  
    }

    return (
        <Layout>
                <div className="register-bg">
                    <div className="register_top_div">
                            <img src={loginbg} alt="Bg"/>
                        <div className="register_float_div">
                            <label className="reister-lbl">
                                Register
                            </label>
                            <Container>
                                <Row style={{  }}>
                                    <Col md={{ span: 10 , offset: 1}}>
                                        <Form onSubmit={registerUser}>
                                            <Input 
                                                className="inpt-lbl"
                                                placeholder="Enter Full Name"
                                                value={userName}
                                                type="text"
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                            <Input 
                                                className="inpt-lbl"
                                                placeholder="Enter Email"
                                                value={userEmail}
                                                type="email"
                                                onChange={(e) => setUserEmail(e.target.value)}
                                            />                                
                                            <Input 
                                                className="inpt-lbl"
                                                placeholder="Enter Password"
                                                value={userPassword}
                                                type="text"
                                                onChange={(e) => setUserPassword(e.target.value)}
                                            />
                                            <label className="tandc">
                                                By Registering to this site you accept the terms 
                                                and privacy-policy of this page.
                                            </label>
                                            <button className="register-btn">
                                                Register
                                            </button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
        </Layout>
    )

}

export default Registerpage