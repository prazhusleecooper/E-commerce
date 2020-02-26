import "../resources/CSS/Login.css";
import React, {Component} from "react";
import {ToastContainer, toast} from "react-toastify";
import { connect } from "react-redux";
import { clearItems} from "../actions";

let jwtDecode = require('jwt-decode');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password: "",
        };
    }

    //non-rendering methods
    //Email input handling
    handleEmailInput = (emailValue) => {
        this.state.email =  emailValue.target.value;
    };

    //Password input handling
    handlePasswordInput = (passwordValue) => {
        this.state.password =  passwordValue.target.value;
    };

    //Handling login
    handleLogin = () => {
        console.log('STATE EMAIL::', this.state.email);
        console.log('STATE PASSWORD::', this.state.password);
        let regularExpression = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if(regularExpression.test(this.state.email)) {
            console.log("EMAIL ADDRESS IS VALID");
            let userLoginCredentials = {
                email: this.state.email,
                password: this.state.password
            };
            fetch("http://localhost:1338/userlogin",
                {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(userLoginCredentials),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(
                    /*
                    * LOGIN CODES:
                    *  -1: email/user does not exist
                    *   1: email and the password matches
                    *   2: email exists but the password is incorrect
                    * */
                    (result) => {
                        console.log("THE RESULT IS::", result);
                        if(result.code === -1) {
                            toast.warn("The email does not exist");
                        } else if(result.code === 1) {
                            toast.warn("Credentials are valid");
                            // let time = Math.round((new Date()).getTime() / 1000);
                            localStorage.setItem('TOKEN', result.token);
                            localStorage.setItem('cartItems', result.cartItems);
                            window.location = '/home';
                        } else if(result.code === 2) {
                            toast.warn("The Password entered is wrong, please try again");
                        }
                        // console.log("THE loc IS::", this.props.location.pathname);
                        // window.location = '/home';
                    },
                    (error) => {
                        console.log("THE ERROR IS::", error);
                    }
                );
        } else {
            console.log("INVALID EMAIL ADDRESS");
        }
    };

    componentDidMount() {
        window.localStorage.clear();
        this.props.clearItems();
    }

    render() {
        return(
            <div>
                <div className="d-flex flex-column align-items-center justify-content-start login-page-main">
                    <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000}/>
                    <div className="form-section">
                        <div className="heading-text-section">
                            <span className="heading-text">Login</span>
                        </div>
                        <hr className="login-hr" />
                        <div className="d-flex flex-column align-items-start justify-content-center input-boxes-section">
                            <label className="input-box-label">Email</label>
                            <input type='text' className="email-input-box" onChange={(emailValue) => this.handleEmailInput(emailValue)} />
                            <label className="input-box-label" >Password</label>
                            <input type='password' className="password-input-box" onChange={(passwordValue) => this.handlePasswordInput(passwordValue)} />
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center submit-btn-section">
                            <button className="submit-btn" onClick={() => this.handleLogin()}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//REDUX methods
const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems
    }
};

const mapDispatchToProps = () => {
    return {
        clearItems,
    }
};

export default connect(mapStateToProps, mapDispatchToProps())(Login);
