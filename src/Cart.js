import React, {Component, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';
// import Modal from "react-bootstrap/Modal";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empty: false,
            modal: false
        }

        this.toggle = () => {
            this.setState( {
                modal: !this.state.modal
            })
        }
        // this.addItem = this.addItem.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        // this.addItem = this.addItem.bind(this);
        // this.show = this.show.bind(this);
    }

        //  addItem() {
        //     const [show, setShow] = useState(false);
        //
        //     const handleShow = () => setShow(true);
        //     const handleClose = () => setShow(false);
        // }

    render (){

        return (
            <div className="CartSection">
                {/* React-Bootstrap modal pop-up */}
                {/*<Modal show={this.show} onHide={}>*/}

                {/*</Modal>*/}

                {/* MDB modal popup */}
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        {/*<MDBModalHeader toggle={this.toggle}></MDBModalHeader>*/}
                        <MDBModalBody >
                            <div className="d-flex">
                                SAMPLE
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn color="primary">Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>

                <div className="d-flex flex-column cart-section">
                    {/* Cart Items title and add button */}
                    <div className="d-flex flex-row align-items-center justify-content-between cart-add-section">
                        <div className="cart-items-text">CART ITEMS</div>
                        <div className="cart-add-btn-section">
                            <button onClick={this.toggle} className="px-4 cart-add-btn">Add</button>
                        </div>
                    </div>
                    {/* Items table */}
                    {/*<TableItems /> - Commented and written as inline condition*/}

                    {/*  Checking if the cart items are empty */}
                    {/*  displaying alert message instead of table  */}
                    { this.state.empty && <div className="cart-empty-text">Cart is empty!</div> }

                    {/*  displaying the table  */}
                    { !this.state.empty &&
                    <div className="mt-4 CartItemTable">
                        <table className="item-table-header">
                            <thead>
                            <tr>
                                <th className="table-header th-name">Item Name</th>
                                <th className="table-header th-qty"> Quantity</th>
                                <th className="table-header th-price">Price</th>
                                <th className="table-header th-rm">Remove</th>
                            </tr>
                            </thead>
                        </table>
                        <div className="item-table-section">
                            <table className="item-table">
                                <tbody>
                                <tr>
                                    <td className="td-name">a</td>
                                    <td className="td-qty">a</td>
                                    <td className="td-price">a</td>
                                    <td className="td-rm">
                                        <button className="remove-btn"></button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <table className="item-table-header item-total-table">
                            <tbody>
                            <tr>
                                <td className="td-total td-name"></td>
                                <td className="td-total td-qty"> Total</td>
                                <td className="td-total td-price">Rs.100</td>
                                <td className="td-total td-rm"></td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                    }

                    <div className="d-flex flex-row align-items-center justify-content-center checkout-btn-section">
                        <button className="px-4 py-1 checkout-btn">Checkout</button>
                    </div>
                    {/*<div className="d-flex flex-row align-items-center justify-content-center"> /!* In case that the cart is empty *!/*/}
                    {/*  Your cart is empty*/}
                    {/*</div>*/}
                    {/*<div className="items-table">*/}

                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default Cart;
