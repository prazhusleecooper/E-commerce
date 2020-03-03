import React, { Component } from "react";
import '../resources/CSS/Customers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import {MDBBtn} from "mdbreact";

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customersList: [],
            deletion: true,
        };
    }

    //Non-rendering methods
    //delete user
    deleteUser = (item) => {
      let requestBody = {
          userId: item.userId,
      };
      window.location.reload(false);
      fetch('http://localhost:1338/deleteUser', {
          method: 'DELETE',
          mode: 'cors',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' }
          })
          .then(res => res.json())
          .then(
              (result) => {
                  window.location.reload(false);
              }
          )

    };


    componentDidMount() {
        fetch('http://localhost:1338/getusers',
            {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                       customersList: result,
                    });
                },
                (error) => {
                    console.log('error fetching users:::', error);
                },
            );
    }

    render() {
        return(
            <div>
                <div className='customers-div'>
                    <div className='customers-heading'>
                        Customers
                    </div>
                    <hr className='heading-hr' />
                    <div className='users-list'>
                        {
                            this.state.customersList.map((item, index) => {
                                return(
                                    <div >
                                        <div className='d-flex flex-column align-items-start justify-content-center'>
                                            <div className='field-name'>
                                                User id: <span className='user-data'> {item.userId} </span>
                                            </div>
                                            <div className='field-name'>
                                                Email: <span className='user-data'> {item.email} </span>
                                            </div>
                                        </div>
                                        <div>
                                            <MDBBtn color="danger" className='delete-user-btn' onClick={() => this.deleteUser(item)}>Danger</MDBBtn>
                                        </div>
                                        <hr className='users-hr'/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Customers;
