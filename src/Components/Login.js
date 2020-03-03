import "../resources/CSS/Login.css";
import React, {Component} from "react";
import {ToastContainer, toast} from "react-toastify";
import { connect } from "react-redux";
import { clearItems} from "../actions";
import {NavLink} from "react-bootstrap";

let jwtDecode = require('jwt-decode');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password: "",
            signinText: false,
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
        if(regularExpression.test(this.state.email) && this.state.password !== '') {
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
                            toast.warn("The email does not exist", {autoClose: 6000});
                        } else if(result.code === 1) {
                            toast.warn("Credentials are valid", {autoClose: 4000});
                            // let time = Math.round((new Date()).getTime() / 1000);
                            localStorage.setItem('TOKEN', result.token);
                            localStorage.setItem('cartItems', result.cartItems);
                            window.location = '/home';
                        } else if(result.code === 2) {
                            toast.warn("The Password entered is wrong, please try again", {autoClose: 6000});
                        }
                        // console.log("THE loc IS::", this.props.location.pathname);
                        // window.location = '/home';
                    },
                    (error) => {
                        console.log("THE ERROR IS::", error);
                    }
                );
        } else {
            toast.error("Invalid credentials. Please try again with valid credentials", {autoClose: 6000});
        }
    };

    //Rendering methods
    //Render instruction in case that the user's sign up was successful

    buttomText = () => {
      if(this.state.signupText) {
          return(
            <span className="signup-info-text">Your Sign-up was successful. Please login to proceed </span>
          );
          sessionStorage.removeItem('signup');
      } else if(!this.state.signupText) {
          return(
              <span className="signup-text">
                  Already have an account? Click here to <span className="signup-link" onClick={() => window.location='/signup'}>Sign-up</span>
              </span>
          );
      }
    };

    componentDidMount() {
        window.localStorage.clear();
        this.props.clearItems();
        if(window.sessionStorage.getItem('signup') === 'success') {
            this.setState({
               signupText: true
            });
            window.sessionStorage.clear()
        }
    }

    componentWillUnmount() {
        window.sessionStorage.clear();
    }

    render() {
        return(
            <div>
                <div className="d-flex flex-column align-items-center justify-content-start login-page-main">
                    <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT} />
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
                        <div className="d-flex flex-column align-items-center justify-content-center bottom-text-section">
                            { this.buttomText() }
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
