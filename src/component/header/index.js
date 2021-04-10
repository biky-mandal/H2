import React from 'react';
import './style.css';
import {NavDropdown, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {LogoutAction} from '../../actions/authAction';
import { useDispatch } from 'react-redux';
import { FiLogIn, FiUserPlus, FiBook, FiClipboard, FiBookOpen } from "react-icons/fi";


/**
* @author
* @function Header
**/

const Header = (props) => {
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');

    const logoutFunc = () => {
        dispatch(LogoutAction());
    }

    const renderLoggedInLinks = () => {
        return(
            <li className="nav-item">
                <NavLink activeClassName="nav_active" to="/" onClick={logoutFunc} className="nav-link link2 navtags" >Logout</NavLink>
            </li>
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
            <Navbar className="navbar-bg" collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand href="/" className="navlogo">H2.</Navbar.Brand>
                <Navbar.Toggle className="custom-toggler" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <li className="nav-item">
                            <NavLink to="" className="nav-link link2 navtags" >Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="newsfeed" className="nav-link link2 navtags" >Newsfeed</NavLink>
                        </li>
                        <NavDropdown className="drop-div navtags link2" title="Academics" id="collasible-nav-dropdown">
                            <li className="nav-item">
                                <NavLink to="contact" className="nav-link drop-lbl navtags"><span><FiClipboard /></span>Notes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="about" className="nav-link drop-lbl navtags"><span><FiBook /></span>Books</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="about" className="nav-link drop-lbl navtags"><span><FiBookOpen /></span>Syllabus</NavLink>
                            </li>
                        </NavDropdown>
                        <NavDropdown className="drop-div navtags link2" title="FAQ" id="collasible-nav-dropdown">
                            <li className="nav-item">
                                <NavLink to="contact" className="nav-link drop-lbl navtags"><span><FiLogIn /></span>Contact</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="about" className="nav-link drop-lbl navtags"><span><FiUserPlus /></span>About</NavLink>
                            </li>
                        </NavDropdown>
                    </Nav>
                    <Nav className="ml-auto">
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