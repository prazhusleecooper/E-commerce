import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const homeSvg = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 63.699 63.699" style="enable-background:new 0 0 63.699 63.699;" xml:space="preserve"> <g> <path d="M63.663,29.424c-0.143-1.093-0.701-2.065-1.575-2.737l-11.715-9.021V8.608c0-2.275-1.851-4.126-4.125-4.126 c-2.273,0-4.125,1.851-4.125,4.126v2.705l-7.758-5.975c-0.718-0.551-1.612-0.856-2.517-0.856c-0.906,0-1.801,0.304-2.519,0.857 L1.606,26.687c-1.802,1.389-2.139,3.983-0.751,5.785c0.788,1.022,1.979,1.608,3.271,1.608c0.664,0,1.302-0.153,1.88-0.451V55.09 c0,2.275,1.851,4.127,4.126,4.127h18.534V39.732h6.351v19.482h18.271c2.274,0,4.125-1.85,4.125-4.127V33.472 c0.649,0.399,1.387,0.608,2.157,0.608c1.289,0,2.482-0.586,3.27-1.606C63.514,31.601,63.807,30.518,63.663,29.424z M59.819,30.144 c-0.08,0.105-0.189,0.122-0.247,0.122c-0.069,0-0.132-0.021-0.188-0.065L53.6,25.748V55.09c0,0.173-0.14,0.312-0.311,0.312H38.832 l0.001-19.484H24.852v19.484H10.132c-0.171,0-0.31-0.141-0.31-0.312V25.96L4.315,30.2c-0.056,0.043-0.119,0.065-0.188,0.065 c-0.059,0-0.167-0.017-0.248-0.121c-0.065-0.084-0.07-0.171-0.062-0.229c0.007-0.058,0.034-0.141,0.118-0.205L31.661,8.363 c0.138-0.105,0.239-0.106,0.379,0l13.899,10.703V8.608c0-0.172,0.14-0.311,0.311-0.311s0.312,0.139,0.312,0.311v10.935 l13.205,10.166c0.084,0.064,0.108,0.147,0.116,0.205C59.891,29.975,59.885,30.062,59.819,30.144z"/> </g> </svg>';
var cartObjects = ['apple', 'orange', 'banana'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 1,
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
  }
  render() {
    return (
      <div className="App">
        <HeaderNav />
        {/*<Home />*/}
        <Cart />
        <Footer />
      </div>

    );
  }
}

class HeaderNav extends Component {
  render() {
    return(
      <div className="header-nav">
        <div className="d-flex flex-row">
          <div className="d-flex flex-row align-items-center justify-content-center logo-section">
            <div className="logo-img">
              <SVG src = {homeSvg} />
            </div>
            <div className="logo-text">
              Shopping Cart
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end nav-bar">
            <div className="mr-3 nav-text-home">
              Home
            </div>
            <div className="mr-5 nav-text-cart">
              My Cart
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    var categories = [ 'Fruits', 'Vegetables', 'Appliances' ];
    var fruits = [ 'Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple','Apple' ];
    return (
      <div className="Home">
        <div className="d-flex flex-row home-content">
          <div className="d-flex flex-column align-items-start p-4 categories-pane">
            <div className="pb-2 cat-heading">
              Catgories
            </div>
            <div className="d-flex flex-column align-items-start cat-list">
              {categories.map(function(category){
                return  <div className="pb-1 cat-name">
                          <input type="checkbox" name={category} value={category} className="mr-2" /> {category}
                        </div>;
              })}

              {/* <div className="pb-1 cat-name">
                <input type="checkbox" name="fruits" value="Fruits" /> Fruits
              </div>
              <div className="pb-1 cat-name">
                <input type="checkbox" name="vegetables" value="Vegetables" /> Vegetables
              </div>
              <div className="pb-1 cat-name">
                <input type="checkbox" name="applicances" value="Applicances" /> Applicances
              </div> */}

            </div>
          </div>
          <div className="d-flex flex-column items-pane">
              <div className="d-flex flex-row align-items-center justify-content-end">
                <div className="mx-4 my-3 search-bar-div">
                  <input name="search-bar" placeholder="Search Item" className="search-bar-input px-2" />
                </div>
              </div>
              <div className="m-4 items-cluster">
                <div className="d-flex flex-column align-items-start">
                  <div className="d-flex flex-row item-category">
                    <div className="item-category-text">Fruits</div>
                  </div>
                  <div className="d-flex flex-row items-list-display">

                    {fruits.map(function(fruit){
                      return <div className="d-flex flex-column align-items-center justify-content-center ml-5 mb-4 px-4 pt-3 py-0 item-box">
                               <div className="item-image">image</div>
                               <div className="pt-2 item-title">{fruit}</div>
                               <div className="d-flex flex-row align-items-center justify-content-between pt-2 pb-3 price-add-section">
                                 <div className="price-text">Rs.50</div>
                                 <div className="add-btn-section">
                                   <button className="px-2 py-1 add-btn">Add</button>
                                 </div>
                               </div>
                             </div> ;
                    })}

                    {/* ITEM BOX */}
                    {/*<div className="d-flex flex-column align-items-center justify-content-center ml-2 mr-5 my-2 px-4 pt-3 py-0 item-box">*/}
                    {/*  <div className="item-image">image</div>*/}
                    {/*  <div className="pt-2 item-title">Apple</div>*/}
                    {/*  <div className="d-flex flex-row align-items-center justify-content-between pt-2 pb-3 price-add-section">*/}
                    {/*    <div className="price-text">Rs.50</div>*/}
                    {/*    <div className="add-btn-section">*/}
                    {/*      <button className="px-2 py-1 add-btn">Add</button>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}


                  </div>
                </div>
              </div>
          </div>

        </div>
      </div>
    );
  }
}

class Cart extends Component {
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
            <TableItems />

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

class TableItems extends App {
  render (){
    if (this.state.cartItems.length === 0){
      return (
          <div className="CartEmptyInfo">
            <div className="cart-empty-text">
              Cart is empty
            </div>
          </div>
      );
    }
    else {
      return (
          <div>
            Cart is not empty
          </div>
      );
    }
  }
}

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

/* Conditional redering functions */


export default App;
