import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import Layout from "../../component/layout";
import loginbg from "../../Images/login1.png";
import "./style.css";
import { FcGoogle } from "react-icons/fc";
import {
  LoginAction,
  LoginWithGoogleAction,
  ResetPasswordAction,
} from "../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Loader from "react-loader-spinner";

/**
 * @author
 * @function Loginpage
 **/

const Loginpage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [forgot, setForgot] = useState(false);

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  const userLogin = (e) => {
    e.preventDefault();
    dispatch(LoginAction(userEmail, userPassword));
  };

  const googleLogin = (e) => {
    e.preventDefault();
    dispatch(LoginWithGoogleAction());
  };

  const forgotButtonTouched = () => {
    setForgot(true);
  };
  const goBack = () => {
    setForgot(false);
  };

  const resetPassword = () => {
    dispatch(ResetPasswordAction(userEmail));
  };

  return (
    <Layout>
      <div className="register-bg">
        <div className="register_top_div">
          <img src={loginbg} alt="Bg" />
          {forgot ? (
            <div className="register_float_div">
              <label className="reister-lbl">Reset</label>
              <Container>
                <Row style={{}}>
                  <Col md={{ span: 10, offset: 1 }}>
                    <ValidatorForm useref="form">
                      <TextValidator
                        className="input-field"
                        placeholder="Enter Email"
                        value={userEmail}
                        type="email"
                        variant="outlined"
                        validators={[
                          "required",
                          "matchRegexp:^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*.[a-zA-Z]{2,7})$",
                        ]}
                        errorMessages={[
                          "this field is required",
                          "Email is not valid",
                        ]}
                        onChange={(e) => setUserEmail(e.target.value)}
                      />
                      <Row>
                        <Col md={{ span: 12, offset: 5 }}>
                          {auth.loading ? (
                            <Loader
                              type="TailSpin"
                              color="#00BFFF"
                              height={30}
                              width={30}
                            />
                          ) : null}
                        </Col>
                      </Row>
                      <label className="tandc">
                        Enter Your Email And Get Link to Reset Your Password.
                      </label>

                      <Row>
                        <Col>
                          <button onClick={goBack} className="cancel-btn">
                            Cancel
                          </button>
                        </Col>
                        <Col>
                          <button
                            onClick={resetPassword}
                            className="register-btn"
                          >
                            Get Link
                          </button>
                        </Col>
                      </Row>
                    </ValidatorForm>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : (
            <div className="register_float_div">
              <label className="reister-lbl">Login</label>
              <Container>
                <Row style={{}}>
                  <Col md={{ span: 10, offset: 1 }}>
                    <ValidatorForm useref="form" onSubmit={userLogin}>
                      <TextValidator
                        className="input-field"
                        placeholder="Enter Email"
                        value={userEmail}
                        type="email"
                        variant="outlined"
                        validators={[
                          "required",
                          "matchRegexp:^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*.[a-zA-Z]{2,7})$",
                        ]}
                        errorMessages={[
                          "this field is required",
                          "Email is not valid",
                        ]}
                        onChange={(e) => setUserEmail(e.target.value)}
                      />
                      <TextValidator
                        className="inpt-lbl"
                        placeholder="Enter Password"
                        value={userPassword}
                        type="text"
                        variant="outlined"
                        validators={["required", "minStringLength:8"]}
                        errorMessages={[
                          "this field is required",
                          "Minimum Length should be 8",
                        ]}
                        onChange={(e) => setUserPassword(e.target.value)}
                      />
                      <label
                        onClick={forgotButtonTouched}
                        className="tandc forgotpass"
                      >
                        Forgot Password?
                      </label>
                      <label className="tandc">
                        Welcome Again! By Logging in you can explore more and
                        connect with your batchmates.
                      </label>

                      <button className="register-btn">Login</button>
                    </ValidatorForm>
                    <div className="or">or</div>
                    <button onClick={googleLogin} className="google-login-btn">
                      <FcGoogle /> <span>Login With Google</span>
                    </button>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Loginpage;
