import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../component/layout';
import './style.css';
import { FiUser, FiMail, FiPhone, FiInstagram, FiFacebook, FiLinkedin, FiTwitter, FiEdit, FiEdit3 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { FcHighPriority, FcApproval } from 'react-icons/fc';
import DetailSection from '../../component/UI';
import { Modal, Row, Col, Container, Form } from 'react-bootstrap';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { firebaseApp } from '../../backend/fbConfig';
import { GetProfileAction, UploadDataAction, UploadProfilePictureAction, UploadYearAction } from '../../actions/profileAction';
import Loader from 'react-loader-spinner';


/**
* @author
* @function Profilepage
**/

const Profilepage = (props) => {
    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);

    const dispatch = useDispatch()
    // const childRef = useRef();

    const [isNormalInput, setNormalInput] = useState(false)
    const [isSelectDropList, setIsSelectDropList] = useState(false);
    const [isDoubleSelectDropList, setIsDoubleSelectDropList] = useState(false);
    const [isImage, setIsImage] = useState(false);

    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [tempHeading, setTempHeading] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [description, setDescription] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [type, setType] = useState('');

    const [dbkey, setDBKey] = useState();

    const [initialYear, setInitialYear] = useState();
    const [finalYear, setFinalYear] = useState();
    const Years = [ 'select',
        1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969,
        1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
        1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
        1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
        2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
        2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029
    ]
    const Course = [
        'Select',
        'Computer Science & Engineering', 
        'Instrumentation Engineering', 
        'Mechanical Engineering', 
        'Civil Engineering',
        'Electrical Engineering'
    ]

    const [profileImage, setProfileImage] = useState(null);

    const handleImage = (e) => {
        if(e.target.files[0]){
            setProfileImage(e.target.files[0]);
        }
    }
    const uploadProfileImage = () => {
        setOpen(false)
        dispatch(UploadProfilePictureAction(profileImage));
        if(auth.loading){
            return <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
        }
    }
    // For Modal
    // OM => Open Modal
    // CM => Close Modal

    // Modal will Open For Only Phone Number
    const omPhone = () => {
        setTempHeading('Enter Number');
        setPlaceholder('8472802283');
        setDescription('Enter Your Primary Phone Number. According to the terms and Conditions Hostel 2 will Delete Your Profile if You Entered Wrong Information.')
        setButtonText('Update Phone');
        setType('number');
        setNormalInput(true);
        setDBKey('phoneNumber');
        setOpen(true);
    }

    const omLinkedInLink = () => {
        setTempHeading('Paste LinkedIn Profile URL');
        setPlaceholder('https://www.linkedin.com/in/biky-mandal-82763b1b5/');
        setDescription('Enter Your LinkedIn Profile.')
        setButtonText('Set URL')
        setType("text")
        setNormalInput(true)
        setOpen(true);
        setDBKey('linkedinLink');
    }

    const omInstagramLink = () => {
        setTempHeading('Paste Instagram Profile URL');
        setPlaceholder('https://www.instagram.com/biky.me/');
        setDescription('Enter Your Instagram Profile.')
        setButtonText('Set URL')
        setType("text")
        setNormalInput(true)
        setOpen(true);
        setDBKey('instagramLink')
    }

    const omFacebookLink = () => {
        setTempHeading('Paste Facebook Profile URL');
        setPlaceholder('https://www.facebook.com/biky.mandal.1/');
        setDescription('Enter Your Facebook Profile.')
        setButtonText('Set URL')
        setType("text")
        setNormalInput(true)
        setOpen(true);
        setDBKey('facebookLink')
    }

    const omTwitterLink = () => {
        setTempHeading('Paste Twitter Profile URL');
        setPlaceholder('https://www.twitter.com/');
        setDescription('Enter Your Twitter Profile.')
        setButtonText('Set URL')
        setType("text")
        setNormalInput(true)
        setOpen(true);
        setDBKey('twitterLink')
    }

    const omHomeAddress = () => {
        setTempHeading('Enter Home Address');
        setPlaceholder('Titabar, Jorhat');
        setDescription('Enter Your Home Address. According to the terms and Conditions Hostel 2 will Delete Your Profile if You Entered Wrong Information.')
        setButtonText('Update Address')
        setType("text")
        setNormalInput(true)
        setOpen(true);
        setDBKey('homeAddress');
    }

    const omCurrentAddress = () => {
        setTempHeading('Enter Current Address');
        setPlaceholder('Guwahati, Kamrup');
        setDescription('Enter Your Current Address.')
        setButtonText('Update Address')
        setType("text")
        setNormalInput(true)
        setOpen(true);
        setDBKey('currentAddress');
    }

    const omOccupation = () => {
        setTempHeading('Occupation Details');
        setPlaceholder('Database administrator at TCS');
        setDescription('Please Enter Your Current Occupation Details.')
        setButtonText('Update Details')
        setType("text")
        setNormalInput(true)
        setOpen(true);
        setDBKey('occupation')
    }

    const omPassout = () => {
        setTempHeading('Room NO.');
        setPlaceholder('218');
        setDescription('Enter the Last Room NO in Hostel');
        setButtonText('Update Details');
        setType("number");
        setNormalInput(true);
        setOpen(true);
        setDBKey('passOutYear');
    }

    // For Branch At Jec
    // CSE, CE, ME, IE, EE
    const omBranch = () => {
        setTempHeading('Branch At JEC');
        setPlaceholder('Computer Science & Engineering');
        setDescription('Enter Your Branch At JEC')
        setButtonText('Update Branch')
        setIsSelectDropList(true);
        setOpen(true);
        setDBKey('branch');
    }

    const omBatch = () => {
        setTempHeading('Batch');
        setDescription('Please Enter Your Batch in Hostel2')
        setIsDoubleSelectDropList(true);
        setButtonText('Set Batch')
        setOpen(true);
    }

    const omImage = () => {
        setTempHeading('Profile Picture');
        setDescription('Update Your Profile Picture That Your Friends can recognise You.')
        setIsImage(true);
        setButtonText('Update')
        setOpen(true);
    }

    // For CLosing Any Modal
    const closeModal = () => {
        setOpen(false);
        setTempHeading('');
        setPlaceholder('');
        setDescription('');
        setButtonText('');
        setNormalInput(false);
        setIsSelectDropList(false);
        setIsDoubleSelectDropList(false);
        setIsImage(false);
        setType('');
        setData('');
    }
    // Upload User data
    const uploadUserData = () => {
        if(initialYear && finalYear){
            const fullData = {
                initialYear: initialYear,
                finalYear: finalYear,
                dbkey1: 'entryYear',
                dbkey2: 'passOutYear'
            }
            dispatch(UploadYearAction(fullData));
        }else{
            const fullData = {
                data: data, 
                dbkey: dbkey
            }
            dispatch(UploadDataAction(fullData));
        }
        if(profile.userDetails){
            dispatch(GetProfileAction());
        }
        closeModal();
    }

    const reFatch = () => {
        if(profile.userDetails){
            dispatch(GetProfileAction());
        }
    }

    return (
        <Layout>
            <div className="profile-div">
                {/* Modal Start Here */}
                {
                    <Modal className="modal" show={open} onHide={closeModal} animation={true}>
                        <Modal.Body className="product-modal-body">
                            <Container style={{ marginTop: 20 }}>
                                <Row style={{}}>
                                    <Col md={{ span: 10, offset: 1 }}>
                                        <label className="modal_heading">{tempHeading}</label>
                                        <ValidatorForm useref="form" onSubmit={uploadUserData}>
                                        {
                                            isNormalInput ?
                                                <>
                                                <TextValidator
                                                    fullWidth
                                                    className="input-field"
                                                    placeholder={placeholder}
                                                    value={data}
                                                    type={type}
                                                    variant="outlined"
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                    onChange={(e) => setData(e.target.value)}
                                                />
                                                <label className="modal-desc">
                                                    {description}
                                                </label>
                                                <label className="loading-lbl">
                                                    {
                                                        profile.uploading ? <Loader type="TailSpin" color="#404b55" height={20} width={20} /> : null
                                                    }
                                                </label>
                                                <Row style={{ marginBottom: 25 }}>
                                                    <Col md={{ span: 6 }}>
                                                        <button type="submit" className="modal-submit-btn">
                                                            {buttonText}
                                                        </button>
                                                    </Col>
                                                    <Col md={{ span: 6 }}>
                                                        <button className="Delete-btn" onClick={closeModal}>
                                                            Close
                                                        </button>
                                                    </Col>
                                                </Row>
                                                </>
                                                :
                                                null
                                            }
                                            {
                                                isSelectDropList ?
                                                <>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Control 
                                                        as="select"
                                                        onChange={(e) => setData(e.target.value)}
                                                    >
                                                    {
                                                        Course.map(c => {
                                                            return <option value={c}>{c}</option>
                                                        })
                                                    }
                                                    </Form.Control>
                                                </Form.Group>
                                                <Row style={{ marginBottom: 25 }}>
                                                    <Col md={{ span: 6 }}>
                                                        <button type="submit" className="modal-submit-btn">
                                                            {buttonText}
                                                        </button>
                                                    </Col>
                                                    <Col md={{ span: 6 }}>
                                                        <button className="Delete-btn" onClick={closeModal}>
                                                            Close
                                                    </button>
                                                    </Col>
                                                </Row>
                                                </>
                                                    :
                                                    null
                                            }
                                            {
                                                isDoubleSelectDropList ?
                                                <>
                                                <Row style={{}}>
                                                    <Col md={{ span: 6 }}>
                                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                                            <Form.Control 
                                                                as="select"
                                                                onChange={(e) => setInitialYear(e.target.value)}
                                                            >
                                                            {
                                                                Years.map(year => {
                                                                    return <option value={year}>{year}</option>
                                                                })
                                                            }
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={{ span: 6 }}>
                                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                                            <Form.Control 
                                                                as="select"
                                                                onChange={(e) => setFinalYear(e.target.value)}
                                                            >
                                                            {
                                                                Years.map(year => {
                                                                    return <option value={year}>{year}</option>
                                                                }) 
                                                            }
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginBottom: 25 }}>
                                                    <Col md={{ span: 6 }}>
                                                        <button type="submit" className="modal-submit-btn">
                                                            {buttonText}
                                                        </button>
                                                    </Col>
                                                    <Col md={{ span: 6 }}>
                                                        <button className="Delete-btn" onClick={closeModal}>
                                                            Close
                                                    </button>
                                                    </Col>
                                                </Row>
                                                </>
                                                    :
                                                    null
                                            }                                        
                                            {
                                                isImage ?
                                                    <>
                                                        <input type="file" onChange={handleImage}/>
                                                        <Row style={{ marginBottom: 25 }}>
                                                            <Col md={{ span: 6 }}>
                                                                <button onClick={uploadProfileImage} className="modal-submit-btn">
                                                                    {buttonText}
                                                                </button>
                                                            </Col>
                                                            <Col md={{ span: 6 }}>
                                                                <button className="Delete-btn" onClick={closeModal}>
                                                                    Close
                                                            </button>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                    :
                                                    null
                                            }
                                        </ValidatorForm>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>
                }
                {/* Left Div */}
                <div className="profile_left_div">
                    <div className="profile_photo_div">
                        <div className="profile_photo">
                            <img src={localStorage.getItem('photoURL')}/>
                        </div>
                        <span onClick={omImage} className="edit-profile"><FiEdit3 /></span>
                    </div>
                    <div className="Profile_details_div">

                        <label className="name-lbl"><span><FiUser /></span>{auth.displayName}</label>

                        <label className="email-lbl">
                            <span><FiMail /></span>
                            {auth.email}
                            {auth.emailVerified ?
                                <span className="verify"><FcApproval /></span>
                                :
                                <span className="verify"><FcHighPriority /></span>
                            }
                        </label>

                        <label className="email-lbl">
                            <span><FiPhone /></span>
                                {profile.userDetails ? profile.userDetails.phoneNumber : 'Loading..'}
                            <span className="edit-btn" onClick={omPhone}><FiEdit3 /></span>
                        </label>

                        <label className="social-link-lbl">Social Links</label>

                        <label className="email-lbl">
                            <span><FiLinkedin /></span>
                            <a href={profile.userDetails ? profile.userDetails.linkedinLink : null} target="_blank">LinkedIn</a>
                            <span onClick={omLinkedInLink} className="edit-btn"><FiEdit3 /></span>
                        </label>

                        <label className="name-lbl">
                            <span><FiInstagram /></span>
                            <a href={profile.userDetails ? profile.userDetails.instagramLink : null} target="_blank">Instagram</a>
                            <span onClick={omInstagramLink} className="edit-btn"><FiEdit3 /></span>
                        </label>

                        <label className="email-lbl">
                            <span><FiFacebook /></span>
                            <a href={profile.userDetails ? profile.userDetails.facebookLink : null} target="_blank">Facebook</a>
                            <span onClick={omFacebookLink} className="edit-btn"><FiEdit3 /></span>
                        </label>

                        <label className="email-lbl">
                            <span><FiTwitter /></span>
                            <a href={profile.userDetails ? profile.userDetails.twitterLink : null} target="_blank">Twitter</a>
                            <span onClick={omTwitterLink} className="edit-btn"><FiEdit3 /></span>
                        </label>
                    </div>
                </div>

                {/* Right Div */}
                <div className="profile_right_div">
                    <div className="profile_right_div_scrollable">
                        <DetailSection trigger={omBranch} heading="Branch At JEC" body={profile.userDetails ? profile.userDetails.branch : null} />
                        <DetailSection trigger={omBatch}
                            heading="Batch" 
                            body={
                                profile.userDetails ?   
                                `${profile.userDetails.entryYear} to ${profile.userDetails.passOutYear}` : null
                            } 
                        />
                        <DetailSection reFatch={reFatch} trigger={omHomeAddress} heading="Home Address" body={profile.userDetails ? profile.userDetails.homeAddress : null} />
                        <DetailSection reFatch={reFatch} trigger={omCurrentAddress} heading="Current Address" body={profile.userDetails ? profile.userDetails.currentAddress : null} />
                        <DetailSection reFatch={reFatch} trigger={omOccupation} heading="Occupation" body={profile.userDetails ? profile.userDetails.occupation : null} />
                        <DetailSection reFatch={reFatch} trigger={omPassout} heading="PassOut Year Room no." body={profile.userDetails ? profile.userDetails.passOutYear : null} />
                    </div>
                </div>
            </div>
        </Layout>
    )

}

export default Profilepage