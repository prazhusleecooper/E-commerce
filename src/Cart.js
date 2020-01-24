import React, {Component, useState} from 'react';
import './Cart.css';
import Home from './Home';
import SVG from 'react-inlinesvg';
// import Modal from "react-bootstrap/Modal";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closeSvg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="0.75em" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve"><g><g><path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/></g></g>',
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
            <div className="MidSection">
            {/*  Home as the child of Cart  */}
            <Home />
            <div className="CartSection">

                {/* React-Bootstrap modal pop-up */}
                {/*<Modal show={this.show} onHide={}>*/}

                {/*</Modal>*/}

                {/* MDB modal popup */}
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
                        {/*<MDBModalHeader toggle={this.toggle}></MDBModalHeader>*/}
                        <MDBModalBody >
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row align-items-center justify-content-between">
                                    <div className="popup-title">ADD ITEM</div>
                                    <div onClick={this.toggle} className="close-svg-section"><SVG src={this.state.closeSvg} /></div>
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-center pt-4">
                                    <input className="p-2 popup-input" placeholder="Item Name" />
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-center pt-3">
                                    <input className="p-2 popup-input" placeholder="Quanity" />
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-center pt-3">
                                    <input className="p-2 popup-input" placeholder="Price" />
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-center pt-3 popup-add-btn-section">
                                    <button onClick={this.toggle} className="px-5 py-1 popup-add-btn">Add</button>
                                </div>
                            </div>
                        </MDBModalBody>
                        {/*<MDBModalFooter>*/}
                        {/*    <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>*/}
                        {/*    <MDBBtn color="primary">Save changes</MDBBtn>*/}
                        {/*</MDBModalFooter>*/}
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
            </div>
        );
    }
}

export default Cart;
