import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import HeaderNav from './Components/HeaderNav';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Footer from './Components/Footer.js';
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

export default App;
