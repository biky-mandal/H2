import React from 'react';
import './style.css';
import {NavDropdown, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {LogoutAction} from '../../actions/authAction';
import { useDispatch } from 'react-redux';
import { FiUsers, FiUserCheck, FiLogIn, FiUserPlus, FiBook, FiClipboard, FiBookOpen, FiLogOut } from "react-icons/fi";


/**
* @author
* @function Header
**/

const Header = (props) => {
    const dispatch = useDispatch();
    // const auth = useSelector(state => state.auth);

    const token = localStorage.getItem('token');
    const displayName = localStorage.getItem('displayName');

    const logoutFunc = () => {
        dispatch(LogoutAction());
    }

    const renderLoggedInLinks = () => {
        return(
            <>
                <li className="nav-item">
                    <NavLink to="profile" className="nav-link navtags profile__btn">{displayName ? displayName : 'User'}</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" onClick={logoutFunc} className="nav-link navtags"><span></span>LogOut</NavLink>
                </li>
            </>
        );
    }

    const renderNonLoggedInLinks = () => {
        return(
            <>
                <li className="nav-item">
                    <NavLink to="login" className="nav-link navtags">Login</NavLink>
                </li>
                <li className="nav-item register-li">
                    <NavLink to="register" className=" nav-link navtags">Register</NavLink>
                </li>
            </>
        );
    }
    return (
        <div className="header">
            <Navbar className="navbar-bg" collapseOnSelect expand="md" variant="dark">
                <Navbar.Brand href="/" className="navlogo">H2.</Navbar.Brand>
                <Navbar.Toggle className="custom-toggler" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <li className="nav-item">
                            <NavLink to="" className="nav-link link2 navtags" >Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="newsfeed" className="nav-link link2 navtags" >feed</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="archive" className="nav-link link2 navtags" >Archive</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="about" className="nav-link link2 navtags" >About</NavLink>
                        </li>
                        {
                            token ? 
                                renderLoggedInLinks()
                            :
                                renderNonLoggedInLinks()
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header