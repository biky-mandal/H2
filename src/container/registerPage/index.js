import React, { useEffect, useState } from 'react';
import { Row,Col, Container, Form } from 'react-bootstrap';
import Layout from '../../component/layout';
import './style.css';
import {RegisterAction} from '../../actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {FcGoogle} from 'react-icons/fc';
import {  LoginWithGoogleAction } from '../../actions/authAction';


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
    const [userNumber, setUserNumber] = useState('');

    if(auth.authenticate){
        return <Redirect to={'/'} />
    }

    const registerUser = (e) => {
        e.preventDefault();
        dispatch(RegisterAction(userEmail, userPassword, userName));
    }
    const googleLogin = (e) => {
        e.preventDefault();
        dispatch(LoginWithGoogleAction());
    };

    return (
        <Layout>
                <div className="register-bg">
                    <div className="register_float_div">
                        <div className="left_div">
                            <label className="reister-lbl">
                                Register
                            </label>
                            <label className="resister_desc">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            </label>
                        </div>
                        <div className="right_div">
                            <Container>
                                <Row style={{ }}>
                                    <Col md={{ span: 10, offset: 1 }}>
                                        <ValidatorForm className="form-reg" useref="form" onSubmit={registerUser}>
                                            <TextValidator
                                                className="input-field"
                                                label="Full Name"
                                                value={userName}
                                                type="text"
                                                variant = "outlined"
                                                validators={['required', 'minStringLength:4']}
                                                errorMessages={['this field is required', 'Minimum Length should be 4']}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                            <TextValidator 
                                                className="input-field"
                                                label="Email"
                                                value={userEmail}
                                                type="email"
                                                variant = "outlined"
                                                validators={['required', 'matchRegexp:^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$']}
                                                errorMessages={['this field is required', 'Email is not valid']}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                            />
                                            <TextValidator 
                                                className="input-field"
                                                label="Password"
                                                value={userPassword}
                                                type="text"
                                                variant = "outlined"
                                                validators={['required', 'minStringLength:8']}
                                                errorMessages={['this field is required', 'Minimum Length should be 8']}
                                                onChange={(e) => setUserPassword(e.target.value)}
                                            />
                                            <label className="tandc tandcr">
                                                By Registering to this site you accept the terms 
                                                and privacy-policy of this page.
                                            </label>
                                            {auth.errorMessage ? <div className="warning-div">{auth.errorMessage}</div> : null}
                                            <button className="register-btn">
                                                Register
                                            </button>
                                        </ValidatorForm>
                                        <button onClick={googleLogin} className="google-login-btn rglb">
                                            <FcGoogle /> <span>Login With Google</span>
                                        </button>
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