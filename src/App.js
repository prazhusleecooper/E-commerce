import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import HeaderNav from './HeaderNav';
import Home from './Home';
import Cart from './Cart';
import Footer from './Footer.js';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        page: true,
      cartItems: [ {
                    name: "Apple", quantity: "2", price: "100"
                   },
                   {
                    name: "Orange", quantity: "2", price: "100"
                   },
                   {
                    name: "Apple", quantity: "2", price: "100"
                   }
                 ]
    };
    this.togglePage = this.togglePage.bind(this);
  }

    togglePage() {
      console.log("toggle function reached");
      this.setState( state => ({
          page: !this.state.page
      }));
      console.log("End of toggle function");
    }


    render() {
    return (
      <div className="App">
        <HeaderNav />
          <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/cart" >
                <Cart />
              </Route>
          </Switch>
        <Footer />
      </div>

    );
  }
}

// class HeaderNav extends App {
//     render() {
//     return(
//       <div className="header-nav">
//         <div className="d-flex flex-row">
//           <div className="d-flex flex-row align-items-center justify-content-center logo-section">
//             <div className="logo-img">
//               <SVG src={homeSvg} />
//             </div>
//             <div className="logo-text">
//               Shopping Cart
//             </div>
//           </div>
//           <div className="d-flex align-items-center justify-content-end nav-bar">
//             <div className="mr-3 nav-text-home">
//                 <NavLink exact to="/home" className="nav-link" activeClassName="nav-link-active">Home</NavLink>
//             </div>
//             <div onClick={this.togglePage} className="mr-5 nav-text-cart" >
//                 <NavLink exact to="/cart" className="nav-link" activeClassName="nav-link-active " >Cart</NavLink>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// class Home extends App {
//   render() {
//     var categories = [ 'Fruits', 'Vegetables', 'Appliances' ];
//     var fruits = [ 'Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple' ];
//     return (
//       <div className="Home">
//         <div className="d-flex flex-row home-content">
//           <div className="d-flex flex-column align-items-start p-4 categories-pane">
//             <div className="pb-2 cat-heading">
//               Catgories
//             </div>
//             <div className="d-flex flex-column align-items-start cat-list">
//               {categories.map(function(category){
//                 return  <div className="pb-1 cat-name">
//                           <input type="checkbox" name={category} value={category} className="mr-2" /> {category}
//                         </div>;
//               })}
//
//               {/* <div className="pb-1 cat-name">
//                 <input type="checkbox" name="fruits" value="Fruits" /> Fruits
//               </div>
//               <div className="pb-1 cat-name">
//                 <input type="checkbox" name="vegetables" value="Vegetables" /> Vegetables
//               </div>
//               <div className="pb-1 cat-name">
//                 <input type="checkbox" name="applicances" value="Applicances" /> Applicances
//               </div> */}
//
//             </div>
//           </div>
//           <div className="d-flex flex-column items-pane">
//               <div className="d-flex flex-row align-items-center justify-content-end">
//                 <div className="mx-4 my-3 search-bar-div">
//                   <input name="search-bar" placeholder="Search Item" className="search-bar-input px-2" />
//                 </div>
//               </div>
//               <div className="m-4 items-cluster">
//                 <div className="d-flex flex-column align-items-start">
//                   <div className="d-flex flex-row item-category">
//                     <div className="item-category-text">Fruits</div>
//                   </div>
//                   <div className="d-flex flex-row items-list-display">
//
//                     {fruits.map(function(fruit){
//                       return <div className="d-flex flex-column align-items-center justify-content-center ml-5 mb-4 px-4 pt-3 py-0 item-box">
//                                <div className="item-image">image</div>
//                                <div className="pt-2 item-title">{fruit}</div>
//                                <div className="d-flex flex-row align-items-center justify-content-between pt-2 pb-3 price-add-section">
//                                  <div className="price-text">Rs.50</div>
//                                  <div className="add-btn-section">
//                                    <button className="px-2 py-1 add-btn">Add</button>
//                                  </div>
//                                </div>
//                              </div> ;
//                     })}
//
//                     {/* ITEM BOX */}
//                     {/*<div className="d-flex flex-column align-items-center justify-content-center ml-2 mr-5 my-2 px-4 pt-3 py-0 item-box">*/}
//                     {/*  <div className="item-image">image</div>*/}
//                     {/*  <div className="pt-2 item-title">Apple</div>*/}
//                     {/*  <div className="d-flex flex-row align-items-center justify-content-between pt-2 pb-3 price-add-section">*/}
//                     {/*    <div className="price-text">Rs.50</div>*/}
//                     {/*    <div className="add-btn-section">*/}
//                     {/*      <button className="px-2 py-1 add-btn">Add</button>*/}
//                     {/*    </div>*/}
//                     {/*  </div>*/}
//                     {/*</div>*/}
//
//
//                   </div>
//                 </div>
//               </div>
//           </div>
//
//         </div>
//       </div>
//     );
//   }
// }

// class Cart extends App {
//   render (){
//     return (
//         <div className="CartSection">
//           <div className="d-flex flex-column cart-section">
//             {/* Cart Items title and add button */}
//             <div className="d-flex flex-row align-items-center justify-content-between cart-add-section">
//               <div className="cart-items-text">CART ITEMS</div>
//               <div className="cart-add-btn-section">
//                 <button className="px-4 cart-add-btn">Add</button>
//               </div>
//             </div>
//             {/* Items table */}
//             <TableItems />
//             <div className="d-flex flex-row align-items-center justify-content-center checkout-btn-section">
//                 <button className="checkout-btn">Checkout</button>
//             </div>
//             {/*<div className="d-flex flex-row align-items-center justify-content-center"> /!* In case that the cart is empty *!/*/}
//             {/*  Your cart is empty*/}
//             {/*</div>*/}
//             {/*<div className="items-table">*/}
//
//             {/*</div>*/}
//           </div>
//         </div>
//     );
//   }
// }

// class TableItems extends App {
//   render (){
//     if (this.state.cartItems.length===0){
//       return (
//           <div className="d-flex flex-row align-items-center justify-content-center mt-5 CartEmptyInfo">
//             <div className="cart-empty-text">
//               Cart is empty!
//             </div>
//           </div>
//       );
//     }
//     else {
//       return (
          {/*<div className="mt-4 CartItemTable">
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

          </div>*/}
//       );
//     }
//   }
// }

// class Footer extends App {
//   render (){
//     return (
//       <div className="mt-4 FooterSection">
//         <div className="d-flex flex-row align-items-center justify-content-center footer-section">
//         <div className="footer-content"> Footer contents</div>
//         </div>
//       </div>
//     );
//   }
// }

export default App;
