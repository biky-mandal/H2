import React, { useEffect, useState } from 'react';
import { Row,Col, Container, Form } from 'react-bootstrap';
import Layout from '../../component/layout';
import Input from '../../component/UI';
import loginbg from '../../Images/login1.png';
import './style.css';
import {LoginAction} from '../../actions/authAction'
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';
/**
* @author
* @function Loginpage
**/

const Loginpage = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');


    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    const userLogin = (e) => {
        e.preventDefault();
        dispatch(LoginAction(userEmail, userPassword));
    }

    return (
        <Layout>
                <div className="register-bg">
                    <div className="register_top_div">
                            <img src={loginbg} alt="Bg"/>
                        <div className="register_float_div">
                            <label className="reister-lbl">
                                Login
                            </label>
                            <Container>
                                <Row style={{  }}>
                                    <Col md={{ span: 10 , offset: 1}}>
                                        <Form onSubmit={userLogin}>
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
                                                Welcome Again! By Logging in you can
                                                explore more and connect with your batchmates.
                                            </label>
                                            <button className="register-btn">
                                                Login
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

export default Loginpage