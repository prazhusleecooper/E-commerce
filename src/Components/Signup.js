import React, { Component } from "react";
import {toast, ToastContainer} from "react-toastify";
import '../resources/CSS/Signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password: "",
            confirmPassword: "",
        }
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
    //Confirm Password input handling
    handleConfirmPasswordInput = (confirmPasswordValue) => {
        this.state.confirmPassword =  confirmPasswordValue.target.value;
    };

    //handle the signup process
    handleSignup = () => {
        let regularExpression = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if(this.state.password != this.state.confirmPassword) {
            toast.error("The Entered passwords donot match. Please try again");
        } else if(regularExpression.test(this.state.email)) {
            console.log("ALL CREDENTIALS VALID");
        //    START HERE
        }
    };


    render() {
        return(
            <div>
                <div className="d-flex flex-column align-items-center justify-content-start login-page-main">
                    <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000}/>
                    <div className="form-section">
                        <div className="heading-text-section">
                            <span className="heading-text">Signup</span>
                        </div>
                        <hr className="signup-hr" />
                        <div className="d-flex flex-column align-items-start justify-content-center input-boxes-section">
                            <label className="input-box-label">Email</label>
                            <input type='text' className="email-input-box" onChange={(emailValue) => this.handleEmailInput(emailValue)} />
                            <label className="input-box-label" >Password</label>
                            <input type='password' className="password-input-box" onChange={(passwordValue) => this.handlePasswordInput(passwordValue)} />
                            <label className="input-box-label" >Confirm Password</label>
                            <input type='password' className="password-input-box" onChange={(confirmPasswordValue) => this.handleConfirmPasswordInput(confirmPasswordValue)} />
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center submit-btn-section">
                            <button className="submit-btn" onClick={() => this.handleSignup()}>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
