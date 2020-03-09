import React, { Component } from 'react';
import '../resources/CSS/HeaderNav.css';
import SVG from "react-inlinesvg";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

let jwtDecode = require('jwt-decode');

class HeaderNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileMenu: false,
            currentLocation: window.location.pathname,
        }
    }

    /* method to trigger the hamburger menu - only mobile screens */
    triggerHamburgerMenu = () => {
        this.setState({
           mobileMenu: !this.state.mobileMenu
        });
    };

    //Rendering methods
    /* method to render the hamburger menu - only one mobile screens */
    renderHamburgerMenu = () => {

        if(window.location.pathname === '/login'){
            return (
                <div className="menu-mob">
                    <div onClick={() => this.triggerHamburgerMenu()}>
                        <NavLink exact to="/home" className="nav-link-mob" activeClassName="nav-link-mob-active">Home</NavLink>
                    </div>
                    <hr className="mx-3 my-0 menu-hr"/>
                    <div onClick={() => this.triggerHamburgerMenu()}>
                        <NavLink exact to="/cart" className="nav-link-mob" activeClassName="nav-link-mob-active ">Cart</NavLink>
                    </div>
                </div>
            );
        } else if(window.location.pathname === '/signup') {
            return(
                <div className="menu-mob">
                    <div onClick={() => this.triggerHamburgerMenu()}>
                        <NavLink exact to="/home" className="nav-link-mob" activeClassName="nav-link-mob-active">Home</NavLink>
                    </div>
                    <hr className="mx-3 my-0 menu-hr"/>
                    <div onClick={() => this.triggerHamburgerMenu()}>
                        <NavLink exact to="/cart" className="nav-link-mob" activeClassName="nav-link-mob-active ">Cart</NavLink>
                    </div>
                    <hr className="mx-3 my-0 menu-hr"/>
                    <div onClick={() => this.triggerHamburgerMenu()}>
                        <NavLink exact to="/login" className="nav-link-mob" activeClassName="nav-link-mob-active ">login</NavLink>
                    </div>
                </div>
            );
        } else if(window.location.pathname === '/home' || window.location.pathname === '/cart' || window.location.pathname === '/customers') {
            if(localStorage.getItem('TOKEN') != null) {
                if(jwtDecode(localStorage.getItem('TOKEN')).userRole === 1) {
                    return(
                        <div className="menu-mob">
                            <div>
                                <div className="email-hamburger">{ jwtDecode(window.localStorage.getItem('TOKEN')).email }</div>
                            </div>
                            <div onClick={() => this.triggerHamburgerMenu()}>
                                <NavLink exact to="/home" className="nav-link-mob" activeClassName="nav-link-mob-active">Home</NavLink>
                            </div>
                            <hr className="mx-3 my-0 menu-hr"/>
                            <div onClick={() => this.triggerHamburgerMenu()}>
                                <NavLink exact to="/cart" className="nav-link-mob" activeClassName="nav-link-mob-active ">Cart</NavLink>
                            </div>
                            <hr className="mx-3 my-0 menu-hr"/>
                            <div onClick={() => this.triggerHamburgerMenu()}>
                                <NavLink exact to="/customers" className="nav-link-mob" activeClassName="nav-link-mob-active ">Customers</NavLink>
                            </div>
                            <hr className="mx-3 my-0 menu-hr"/>
                            <div onClick={() => this.triggerHamburgerMenu()}>
                                <NavLink exact to="/login" className="nav-link-mob" activeClassName="nav-link-mob-active ">logout</NavLink>
                            </div>
                        </div>
                    );
                }
                else {
                    return(
                        <div className="menu-mob">
                            <div>
                                <div className="email-hamburger">{ jwtDecode(window.localStorage.getItem('TOKEN')).email }</div>
                            </div>
                            <div onClick={() => this.triggerHamburgerMenu()}>
                                <NavLink exact to="/home" className="nav-link-mob" activeClassName="nav-link-mob-active">Home</NavLink>
                            </div>
                            <hr className="mx-3 my-0 menu-hr"/>
                            <div onClick={() => this.triggerHamburgerMenu()}>
                                <NavLink exact to="/cart" className="nav-link-mob" activeClassName="nav-link-mob-active ">Cart</NavLink>
                            </div>
                            <hr className="mx-3 my-0 menu-hr"/>
                            <div onClick={() => this.triggerHamburgerMenu()}>
                                <NavLink exact to="/login" className="nav-link-mob" activeClassName="nav-link-mob-active ">logout</NavLink>
                            </div>
                        </div>
                     );
                }
            } else if(localStorage.getItem('TOKEN') === null) {
                return(
                    <div className="menu-mob">
                        <div>
                            <NavLink exact to="/home" className="nav-link-mob" activeClassName="nav-link-mob-active">Home</NavLink>
                        </div>
                        <hr className="mx-3 my-0 menu-hr"/>
                        <div>
                            <NavLink exact to="/cart" className="nav-link-mob" activeClassName="nav-link-mob-active ">Cart</NavLink>
                        </div>
                        <hr className="mx-3 my-0 menu-hr"/>
                        <div>
                            <NavLink exact to="/login" className="nav-link-mob" activeClassName="nav-link-mob-active ">login</NavLink>
                        </div>
                    </div>
                );
            }
        }
    };

    loginNavLink = () => {
        if(window.location.pathname === '/login') {
            return '';
        } else if(window.location.pathname === '/signup') {
            return(
                <NavLink exact to="/login" className="nav-link" activeClassName="nav-link-active " onClick={() => this.triggerHamburgerMenu()} >Login</NavLink>
            );
        } else if(window.localStorage.getItem('TOKEN') === null) {
            return(
                <NavLink exact to="/login" className="nav-link" activeClassName="nav-link-active " onClick={() => this.triggerHamburgerMenu()} >Login</NavLink>
            );
        } else {
            let userEmail = jwtDecode(window.localStorage.getItem('TOKEN')).email;
            console.log('%c USER EMAIL', 'background-color: yellow', userEmail);
            return(
                <Dropdown>
                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        {userEmail}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <div className="mr-5 nav-text-customers" >
                                { this.customersNavLink() }
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item><NavLink exact to="/login" className="nav-link" activeClassName="nav-link-active " onClick={() => this.triggerHamburgerMenu()} >Logout</NavLink></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                // <NavLink exact to="/login" className="nav-link" activeClassName="nav-link-active " onClick={() => this.triggerHamburgerMenu()} >Logout</NavLink>
            );
        }
    };

    //Render the customers nav-link (only for SUPER-ADMINS)
    customersNavLink = () => {
        if(localStorage.getItem('TOKEN') !== null && jwtDecode(localStorage.getItem('TOKEN')).userRole === 1) {
                return(
                    <NavLink exact to="/customers" className="nav-link" activeClassName="nav-link-active " onClick={() => this.triggerHamburgerMenu()} >Customers</NavLink>
                );
        } else {
            return '';
        }
    };

    componentDidMount() {
        console.log('HEADER NAV component did mount');
        if(window.location.pathname !== this.state.currentLocation) {
            this.setState({
                mobileMenu: false
            });
        }
    }

    render() {
        return(
            <div className="header-nav">
                <div className="d-flex flex-row">
                    <div className="d-flex flex-row align-items-center justify-content-center logo-section">
                        <div className="logo-img">
                            {/* Home icon - html embedded svg */}
                            <SVG src='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2.5em" viewBox="0 0 63.699 63.699" xml:space="preserve"> <g> <path d="M63.663,29.424c-0.143-1.093-0.701-2.065-1.575-2.737l-11.715-9.021V8.608c0-2.275-1.851-4.126-4.125-4.126 c-2.273,0-4.125,1.851-4.125,4.126v2.705l-7.758-5.975c-0.718-0.551-1.612-0.856-2.517-0.856c-0.906,0-1.801,0.304-2.519,0.857 L1.606,26.687c-1.802,1.389-2.139,3.983-0.751,5.785c0.788,1.022,1.979,1.608,3.271,1.608c0.664,0,1.302-0.153,1.88-0.451V55.09 c0,2.275,1.851,4.127,4.126,4.127h18.534V39.732h6.351v19.482h18.271c2.274,0,4.125-1.85,4.125-4.127V33.472 c0.649,0.399,1.387,0.608,2.157,0.608c1.289,0,2.482-0.586,3.27-1.606C63.514,31.601,63.807,30.518,63.663,29.424z M59.819,30.144 c-0.08,0.105-0.189,0.122-0.247,0.122c-0.069,0-0.132-0.021-0.188-0.065L53.6,25.748V55.09c0,0.173-0.14,0.312-0.311,0.312H38.832 l0.001-19.484H24.852v19.484H10.132c-0.171,0-0.31-0.141-0.31-0.312V25.96L4.315,30.2c-0.056,0.043-0.119,0.065-0.188,0.065 c-0.059,0-0.167-0.017-0.248-0.121c-0.065-0.084-0.07-0.171-0.062-0.229c0.007-0.058,0.034-0.141,0.118-0.205L31.661,8.363 c0.138-0.105,0.239-0.106,0.379,0l13.899,10.703V8.608c0-0.172,0.14-0.311,0.311-0.311s0.312,0.139,0.312,0.311v10.935 l13.205,10.166c0.084,0.064,0.108,0.147,0.116,0.205C59.891,29.975,59.885,30.062,59.819,30.144z"/> </g> </svg>' />
                        </div>
                        <div className="logo-text">
                            Shopping Cart
                        </div>
                    </div>
                    {/* Navigation link implemented using Router */}
                    <div className="d-flex align-items-center justify-content-end nav-bar">
                        <div className="mr-3 nav-text-home" >
                            <NavLink exact to="/home" className="nav-link" activeClassName="nav-link-active" onClick={() => this.triggerHamburgerMenu()}>Home</NavLink>
                        </div>
                        <div className="mr-5 nav-text-cart" >
                            <NavLink exact to="/cart" className="nav-link" activeClassName="nav-link-active " onClick={() => this.triggerHamburgerMenu()} >Cart</NavLink>
                        </div>
                        <div className="mr-5 nav-text-login" >
                            {/*<NavLink exact to="/login" className="nav-link" activeClassName="nav-link-active " onClick={() => this.triggerHamburgerMenu()} >Login</NavLink>*/}
                            { this.loginNavLink() }
                        </div>

                        <div className="hamburger-menu" onClick={() => this.triggerHamburgerMenu()}>
                            <SVG src='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 469.333 469.333" style="enable-background:new 0 0 469.333 469.333;" xml:space="preserve" width="512px" height="512px" className=""><g><g><g><g><path d="M53.333,106.667H416c29.417,0,53.333-23.927,53.333-53.333S445.417,0,416,0H53.333C23.917,0,0,23.927,0,53.333     S23.917,106.667,53.333,106.667z" data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFC400"/><path d="M416,181.333H53.333C23.917,181.333,0,205.26,0,234.667S23.917,288,53.333,288H416c29.417,0,53.333-23.927,53.333-53.333     S445.417,181.333,416,181.333z" data-original="#000000" className="active-path" data-old_color="#000000" fill="#FFC400"/><path d="M416,362.667H53.333C23.917,362.667,0,386.594,0,416s23.917,53.333,53.333,53.333H416     c29.417,0,53.333-23.927,53.333-53.333S445.417,362.667,416,362.667z" data-original="#000000" className="active-path" fill="#FFC400"/></g></g></g></g> </svg>'/>
                        </div>
                    </div>
                </div>
                { this.state.mobileMenu && this.renderHamburgerMenu() }
            </div>
        );
    }
}

export default HeaderNav;
