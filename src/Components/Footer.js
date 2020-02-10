import React, { Component } from 'react';
import '../resources/CSS/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Footer extends Component {
    render (){
        return (
            <div className="mt-4 FooterSection">
                <div className="d-flex flex-row align-items-center justify-content-center footer-section">
                    <div className="footer-content"> Footer contents</div>
                </div>
            </div>
        );
    }
}

export default Footer;
