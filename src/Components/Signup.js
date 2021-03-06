import React, { Component } from "react";
import {toast, ToastContainer} from "react-toastify";
import '../resources/CSS/Signup.css';
import { history } from 'react-router-dom';

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
        if(this.state.password !== this.state.confirmPassword) {
            toast.error("The Entered passwords donot match. Please try again", {autoClose: 6000});
        } else if(this.state.email === '') {
            toast.error("The email field is empty. Please enter the valid password", {autoClose: 5000});
        } else if(this.state.password === '') {
            toast.error("The password field is empty. Please enter the valid password", {autoClose: 5000});
        } else if(this.state.confirmPassword === '') {
            toast.error("The confirm password field is empty. Please enter the valid password", {autoClose: 5000});
        } else if(regularExpression.test(this.state.email)) {
            let userDetails = {
                "email": this.state.email,
                "password": this.state.password,
            };
            fetch('http://localhost:1338/createuser',
                {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(userDetails),
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("USER HAS BEEN CREATED:::", history);
                        if(result.code === -1) {
                            toast.error("This email already exists!", {autoClose: 7000});
                            toast.error("Try with different email or login with this email", {autoClose: 7000});
                        } else if(result.code === 0) {
                            toast.error("Error Signing you up. Please try again", {autoClose: 6000});
                        } else if(result.code === 1) {
                            toast.warn("Signup successful", {autoClose: 5000});
                            window.sessionStorage.setItem('signup', 'success');
                            window.location = '/login';
                        }
                    },
                    (error) => {
                        console.log("ERROR CREATING USER::", error);
                        toast.error("Error Signing you up. Please try again", {autoClose: 6000});
                    }
                );
        }
    };

    componentDidMount() {
        window.localStorage.clear();
        window.sessionStorage.clear();
    }

    render() {
        return(
            <div>
                <div className="d-flex flex-column align-items-center justify-content-start login-page-main">
                    <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT} />
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
