import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empty: false
        }
    }

    render (){
        return (
            <div className="CartSection">
                <div className="d-flex flex-column cart-section">
                    {/* Cart Items title and add button */}
                    <div className="d-flex flex-row align-items-center justify-content-between cart-add-section">
                        <div className="cart-items-text">CART ITEMS</div>
                        <div className="cart-add-btn-section">
                            <button className="px-4 cart-add-btn">Add</button>
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
