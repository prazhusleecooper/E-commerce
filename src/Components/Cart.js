import React, {Component} from 'react';
import '../resources/CSS/Cart.css';
import SVG from 'react-inlinesvg';
import { MDBContainer, MDBModal, MDBModalBody } from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {addItem, setRetrievedState, removeItem, decreaseQty, clearItems} from "../actions";

let jwtDecode = require('jwt-decode');

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: this.props.addedItems,
            empty: false,
            modal: false,
            itemAdded: false,
            sum: null,
            loggedIn: false,
        }
    }

    /* Method to toggle the modal popup */
    toggleModel = () => {
            this.setState( {
                modal: !this.state.modal
            });
    };

    /* Method to retrieve the cart items and calculate the checkout sum */
    cartInit = () => {
         console.log("CART INIT after render");
         let checkoutSum = 0;
         if(this.props.addedItems.length <= 0 ) {
             if(window.localStorage.hasOwnProperty("cartItems") && window.localStorage.getItem("cartItems").length > 2) {
                 this.props.setRetrievedState(JSON.parse(window.localStorage.getItem("cartItems")));
                 let items = JSON.parse(window.localStorage.getItem("cartItems"));
                 items.map(item => {
                     checkoutSum += item.total_price;
                     return '';
                 });
                 this.setState({
                     cartItems:  items,
                     sum: checkoutSum
                 });
                 console.log(">STATE change::", this.state.sum);
                 if(this.state.sum === 0) {
                     this.setState({cartItems : []});
                 }
             }
         } else {
             this.state.cartItems.map(item => {
                 checkoutSum += item.total_price;
                 return '';
             });
             this.state.sum = checkoutSum

         }
         console.log("end of CART INIT after render:",this.state.cartItems);
        console.log("THE sATE CURRENTLY IS :", this.state);

    };

    /* Method to remove item from the cart - remove the item completely */
    removeCartItem = (item) => {
        if(this.sessionTimeout()) {
            let index = this.state.cartItems.indexOf(item);
            if(index !== -1) {
                let tempArray = this.state.cartItems;
                tempArray.splice(index, 1);
                this.setState({
                    cartItems: tempArray
                });
                this.props.removeItem(item);
                toast.warn('Item removed from cart');
            }
        } else {
            toast.error('Session timed out. Please refresh and login');
        }
    };

    /* Method to increase the item quantity by one unit */
    increaseQty = (item) => {
        if(this.sessionTimeout()) {
             let index = this.state.cartItems.indexOf(item);
             console.log("THE INDEX IS::", index);
             if(index !== -1) {
                 this.props.addItem(item);
                 this.setState({
                     cartItems: this.props.addedItems
                 });
             }
        } else {
            toast.error('Session timed out. Please refresh and login');
        }
    };

    /* Method to decrease the item quantity by one unit */
    decreaseQty = (item) => {
         if(this.sessionTimeout()) {
             let index = this.state.cartItems.indexOf(item);
             if(index !== -1) {
                 this.props.decreaseQty(item);
                 this.setState({
                     cartItems: this.props.addedItems
                 });
             }
         } else {
             toast.error('Session timed out. Please refresh and login');
         }
     };

    /* Checkout the items - delete item units */
    checkoutItems = () => {
        if(this.sessionTimeout()) {
            console.log("CHECKOUT BTN CLICKED::::", this.state.cartItems);
            let checkoutItemsList = this.state.cartItems;
            checkoutItemsList.map(item => {
               item.totalQuantity -= item.quantity;
               item.total_price = item.price;
               item.quantity = 1;
            });
            console.log("checkoutItemsList::", checkoutItemsList);
            console.log("checkoutItemsList STRINGIFY::", JSON.stringify(checkoutItemsList));
            fetch("http://localhost:1338/delUnits",
                {
                    method: 'PATCH',
                    mode: 'cors',
                    body: JSON.stringify(checkoutItemsList),
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("patched::", result);
                    },
                    (error) => {
                        console.log("ERROR PATCHING::", error);
                    }
                );
            toast.warn('Checkout Successful!!');
            this.state.cartItems = [];
            this.props.clearItems();
        } else {
            toast.error('Session timed out. Please refresh and login');
        }
    };

    //Rendering methods
    /* Empty cart alert */
    cartEmpty = () => {
        if(this.state.loggedIn) {
            return (<div className="d-flex flex-row align-items-center justify-content-center cart-empty-text py-4">Your Cart is empty!</div>);
        } else {
            return (<div className="d-flex flex-row align-items-center justify-content-center cart-empty-text py-4">Log-in to add items and view your cart</div>);
        }
    };

    /* Method to render the cart table */
    renderCartTable = () => {
        return (
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
                        {
                            this.state.cartItems.map((cartItem, key=0) => {
                                return (
                                    <tr key={key}>
                                        <td className="td-name">{cartItem.title}</td>
                                        <td className="td-qty">
                                            <button className="mr-3 qty-btn-dec" onClick={() => this.decreaseQty(cartItem)}>-</button>
                                            {cartItem.quantity}
                                            <button className="ml-3 qty-btn-inc" onClick={() => this.increaseQty(cartItem)}>+</button>
                                        </td>
                                        <td className="td-price">{cartItem.total_price}</td>
                                        <td className="td-rm">
                                            <button className="remove-btn" onClick={() => this.removeCartItem(cartItem)}/>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <table className="item-table-header item-total-table">
                    <tbody>
                    <tr>
                        <td className="td-total td-name" />
                        <td className="td-total td-qty"> Total</td>
                        <td className="td-total td-price">
                            Rs. {this.state.sum}
                        </td>
                        <td className="td-total td-rm" />
                    </tr>
                    </tbody>
                </table>

            </div>
        );
    };

    /* Render the checkout button */
    checkoutButton = () => {
        return (
            <button className="px-4 py-1 checkout-btn" onClick={() => this.checkoutItems()}>Checkout</button>
        );
    };

    /* Update the items in the cart on unload */
    onUnload = () => {
        if(localStorage.getItem('TOKEN') !== null) {
            let decodedToken = jwtDecode(localStorage.getItem('TOKEN'));
            let requestBody = {
                userId: decodedToken.userId,
                cartItems: localStorage.getItem('cartItems')
            };
            fetch('http://localhost:1338/savecart',
                {
                    method: 'PATCH',
                    mode: 'cors',
                    body: JSON.stringify(requestBody),
                    headers: {'Content-Type': 'application/json'}
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("res::", result);
                    },
                    (err) => {
                        console.log("SAMPLE HIT FAILED", err);
                    }
                );
        }
    };

    sessionTimeout = () => {
        let currentTime = Math.round((new Date()).getTime() / 1000);
        if(localStorage.getItem('TOKEN')) {
            let decodedToken = jwtDecode(localStorage.getItem('TOKEN'));
            if(currentTime > decodedToken.exp) {
                this.onUnload();
                window.localStorage.clear();
                this.props.clearItems();
                this.setState({
                    loggedIn: false
                });
                // window.location
                return false;
            } else {
                return true;
            }
        }
    };

    componentDidMount() {
        if(localStorage.getItem('TOKEN') !== null) {
            this.setState({
                loggedIn: true
            });
        }
        this.sessionTimeout();
        window.addEventListener("load", () => this.onUnload(), false);
        // window.addEventListener("beforeunload", () => this.onUnload(), false);
    }

    componentWillUnmount() {
        this.onUnload();
        window.addEventListener("load", () => this.onUnload(), false);
        // window.addEventListener("beforeunload", () => this.onUnload(), false);
    }

    render() {
        return (
           <div className="MidSection">
               {this.cartInit()}
               {/* toastify toast notifications */}
               <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000} />
            <div className="CartSection">
                {/* MDB modal popup */}
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModel} centered>
                        <MDBModalBody >
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row align-items-center justify-content-between">
                                    <div className="popup-title">ADD ITEM</div>
                                    <SVG onClick={this.toggleModel} class="close-svg" src='<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="0.75em" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve"><g><g><path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/></g></g>' />
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-center pt-4">
                                    <input className="p-2 popup-input" placeholder="Item Name" />
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-center pt-3">
                                    <input className="p-2 popup-input" placeholder="Quantity" />
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-center pt-3">
                                    <input className="p-2 popup-input" placeholder="Price" />
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-center pt-3 popup-add-btn-section">
                                    <button onClick={this.toggleModel} className="px-5 py-1 popup-add-btn">Add</button>
                                </div>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>

                <div className="d-flex flex-column cart-section">
                    {/* Cart Items title and add button */}
                    <div className="d-flex flex-row align-items-center justify-content-between cart-add-section">
                        <div className="cart-items-text">CART ITEMS</div>
                        <div className="cart-add-btn-section">
                            <button onClick={this.toggleModel} className="px-4 cart-add-btn">Add</button>
                        </div>
                    </div>
                    {/* Items table */}

                    {/* displaying alert message if the cart is empty */}
                    {
                        this.state.cartItems.length === 0 && this.cartEmpty()
                    }

                    {/* rendering the cart table */}
                    {
                        this.state.cartItems.length !== 0 && this.renderCartTable()
                    }

                    {/* The checkout button is rendered only when there are items in the cart */}
                    <div className="d-flex flex-row align-items-center justify-content-center checkout-btn-section">
                        {
                            this.state.cartItems.length !== 0 && this.checkoutButton()
                        }
                    </div>

                </div>
            </div>
           </div>
        );
    }
}

/* REDUX methods */
const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems
    }
};

const mapDispatchToProps = () => {
    return {
        addItem,
        setRetrievedState,
        removeItem,
        decreaseQty,
        clearItems,
    }
};


export default connect(mapStateToProps, mapDispatchToProps())(Cart);
