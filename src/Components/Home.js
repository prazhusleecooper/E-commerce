import React, { Component } from 'react';
import '../resources/CSS/Home.css';
import {MDBContainer, MDBModal, MDBModalBody, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView} from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SVG from "react-inlinesvg";
import { connect } from "react-redux";
import { addItem, clearItems } from "../actions";

let jwtDecode = require('jwt-decode');

class Home extends Component {
    constructor(props) {
        super(props);
        // this.props.clearItems();
        this.state = {
            catJson: [],      /* categories.json data */
            homeItems: [],     /* home_items.json data */
            modal: false,                   /* popup modal - MDBReact modal */
            categories_modal: false,        /* popup modal for the categories in mobile view */
            selected_item: {                /* currently selected item - displayed in the popup modal */
                "title": "",
                "img": "",
                "price": "",
                "uid": 0,
                "description": "",
                "category": ""
            },
            loggedIn: false,
            searchBarInput: false  /* Search Bar Empty => false || Search Bar not Empty => true */
        };
        let lol = localStorage.getItem('cartItems');
        console.log('THE LOCAL STORAGE ITEM IS:::', lol);
    }

    /* Toggle on modal popup */
    toggleOn = (homeItem) => {
        this.setState({
                modal: !this.state.modal,
                selected_item: homeItem,
        })
    };

    /* Toggle off modal popup */
    toggleOff = () => {
        this.setState({
            modal: !this.state.modal,
            /* if selected item is updated to empty, a glitch occurs while closing the popup */
            /*selected_item: {
                "title": "",
                "img": "",
                "price": "",
                "uid": 0,
                "description": "",
                "category": ""
            }*/
        })
    };

    /* Method to toggle the categories filter menu - only on mobile screens */
    toggleCategoriesModal = () => {
        this.setState({
           categories_modal: !this.state.categories_modal
        });
    };

    /* Method to toggle checkbox */
    checkboxChange = (category) => {
        this.state.catJson[category] = !this.state.catJson[category];
        this.setState({});
    };

    /* Method that handles search functionality */
    searchItem = (searchedValue) => {
        console.log("search bar triggered");
        if(searchedValue.target.value === "") {
            console.log("Search value is empty");
            this.setState({
                searchBarInput: false
            });
        } else {
            console.log("Search value is not empty");
            this.setState({
                searchBarInput: true
            });
            let searchResults = this.state.homeItems.filter( function (homeItem) {
                /* Checking if the item  title contains the searched value */
                if(homeItem.title.toUpperCase().includes(searchedValue.target.value.toUpperCase()) /*|| homeItem.category.toUpperCase().includes(searchedValue.target.value.toUpperCase())*/) {
                    return homeItem;
                }
                return '';
            });
            console.log("SEARCH RESULTS ARE:::", searchResults);
            this.setState({
                searchResults: searchResults
            });
            console.log("STATE SEARCH RESUlTS::", this.state.searchResults);
        }

    };

    /* Adding item to cart - from the modal popup */
    addItemToCart = () => {
        if(this.state.loggedIn) {
            toast.warn("Item has been added to your Cart!");
            this.props.addItem(this.state.selected_item);
        } else {
            toast.error("Kindly Log-in to add items to cart")
        }
    };

    /* Adding item to cart - directly from the home page */
    dirAddToCart = (item) => {
        if(this.state.loggedIn) {
            toast.warn("Item has been added to your Cart!");
            this.props.addItem(item);
        } else {
            toast.error("Kindly Log-in to add items to cart")
        }
    };

    /* Update the items in the cart on unload */
    onUnload = () => {
        if(localStorage.getItem('TOKEN') !== null) {
            let decodedToken = jwtDecode(localStorage.getItem('TOKEN'));
            let requestBody = {
                email: decodedToken.email,
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
            }
        }
    };

    //Rendering methods
    /* Rendering categories list */
    renderCategoriesList = () => {
        return (
            Object.keys(this.state.catJson).map((category, index = 0)=> {
            return (
                <div className="pb-1 cat-name" key={index}>
                    <input type="checkbox" name={category} value={category}  className="mr-2" defaultChecked={this.state.catJson[category]} onChange={() => this.checkboxChange(category)} /> <span className="cat-text"> {category} </span>
                </div>
            );
            })
        );
    };

    /* Rendering categories list for smaller screens */
    renderCategoriesListMob = () => {
        return (
            Object.keys(this.state.catJson).map((category, index = 0)=> {
            return (
                <div className="pb-1 cat-name-mob" key={index} >
                    <input type="checkbox" name={category} value={category}  className="mr-2" defaultChecked={this.state.catJson[category]} onChange={() => this.checkboxChange(category)} /> <span className="cat-text-mob"> {category} </span>
                </div>
            );
            })
        );
    };

    /* Rendering item from the home_items_data - default*/
    displayDefaultItems = () => {
        return (
            <div className="d-flex flex-column align-items-start">
                {
                    Object.entries(this.state.catJson).map((category, key= 0 ) => {
                        return (category[1] && <div className="returnDiv" key={key}>
                            <div className="d-flex flex-row item-category">
                                <div className="item-category-text">{category[0]}</div>
                            </div>
                            <div className="d-flex flex-row items-list-display">
                                {
                                    this.state.homeItems.map((homeItem, index = 0 ) => {
                                        if(homeItem.category === category[0]) {
                                            return <div className="d-flex flex-column align-items-center justify-content-center  px-4 pt-3 item-box" key={index}>
                                                <div className="d-flex flex-row align-items-center justify-content-end pb-2 info-svg-section" onClick={() => this.toggleOn(homeItem)}>
                                                    <SVG src='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="0.75em" viewBox="0 0 298.667 298.667" xml:space="preserve"><g><g><g><polygon points="42.667,192 0,192 0,298.667 106.667,298.667 106.667,256 42.667,256    "/><polygon points="0,106.667 42.667,106.667 42.667,42.667 106.667,42.667 106.667,0 0,0    "/><polygon points="192,0 192,42.667 256,42.667 256,106.667 298.667,106.667 298.667,0    "/><polygon points="256,256 192,256 192,298.667 298.667,298.667 298.667,192 256,192    "/></g></g></g></svg>'
                                                         className="info-svg" />
                                                </div>
                                                <div className="item-image-section">
                                                    <img className="item-image" src={homeItem.img[1]} width="100px" height="100px" alt="" />
                                                </div>
                                                <div className="pt-2 item-title">{homeItem.title}</div>
                                                <div
                                                    className="d-flex flex-row align-items-center justify-content-between pt-2 pb-3 price-add-section">
                                                    <div className="price-text">Rs.{homeItem.price}</div>
                                                    <div className="add-btn-section">
                                                        <button className="px-2 py-1 add-btn" onClick={() => this.dirAddToCart(homeItem)}>Add</button>
                                                    </div>
                                                </div>
                                            </div> ;
                                        }
                                        return '';
                                    })
                                }
                            </div>
                        </div>);
                    })
                }
            </div>
        );
    };

    /* Rendered if none of the categories is selected */
    nullCategoryInfo = () =>{
        return (
            <div className="m-4 home-empty-text">
            Please select one or more categories to view the products!
            </div>
        );
    };

    /* Rendered if items are searched */
    displaySearchResults = () => {
        return (
            <div className="d-flex flex-column align-items-start">
                <div className="d-flex flex-row item-category">
                    <div className="item-category-text">Search Results</div>
                </div>
                <div className="d-flex flex-row items-list-display">

                    { this.state.searchResults.length===0? <div className="search-info">Sorry, the product you are looking for is not available</div>:'' }
                    {

                        this.state.searchResults.map(item => {
                            return (<div
                                className="d-flex flex-column align-items-center justify-content-center ml-5 mb-4 px-4 pt-4 py-0 item-box"
                                onClick={() => this.toggleOn(item)}>
                                <div className="item-image-section">
                                    <img className="item-image" src={item.img[1]} width="100px"
                                         height="100px" alt=""/>
                                </div>
                                <div className="pt-2 item-title">{item.title}</div>
                                <div
                                    className="d-flex flex-row align-items-center justify-content-between pt-2 pb-3 price-add-section">
                                    <div className="price-text">Rs.{item.price}</div>
                                    <div className="add-btn-section">
                                        <button className="px-2 py-1 add-btn">Add</button>
                                    </div>
                                </div>
                            </div>);
                        })
                    }
                </div>

            </div>
        );
    };

    //ComponentDidMount() method
    componentDidMount() {
        console.log("COMPONENT DID MOUNT");
        fetch("http://localhost:1338/items")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("THE FETCH METHOD::::", result);
                    this.setState({
                        homeItems: result
                    });
                },
                (error) => {
                    console.log("ERROR HAS OCCURED", error);
                }
            );
        fetch("http://localhost:1338/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("THE CATEGORIES IS ::::", result);
                    let cateoryJsonTemp = {};
                    result.map(item => {
                        cateoryJsonTemp[item.categoryName] =  true;
                    });
                    console.log("CAT JSON TEMP:::", cateoryJsonTemp);
                    this.setState({
                        catJson: cateoryJsonTemp
                    })
                },
                (error) => {
                    console.log("ERROR FETCHING CATEGORIES::",error);
                }
            );
        if(localStorage.getItem('TOKEN') !== null) {
            this.setState({
               loggedIn: true
            });
        }
        this.sessionTimeout();
        // window.addEventListener("beforeunload", (ev) => this.onUnload(ev))
        window.addEventListener("load", () => this.onUnload(), false);
        // window.addEventListener("beforeunload", () => this.onUnload(), false);

    }

    //ComponentWillUnmount function
    componentWillUnmount() {
        this.onUnload();
        // window.addEventListener("beforeunload", (ev) => this.onUnload(ev))
        window.addEventListener("load", () => this.onUnload(), false);
        // window.addEventListener("beforeunload", () => this.onUnload(), false);
    }




    render() {
        return (
            <div className="Home">
                {/* toastify toast notifications */}
                <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT} autoClose={4000} />

                {/* MDB modal popup */}
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleOff} centered size="lg" >
                        <MDBModalBody>
                            <div className="d-flex flex-column  justify-content-center popup-div">
                                <div className="d-flex flex-column align-items-end justify-content-center close-svg-section">
                                    {/* close button to close the popup */}
                                    <div onClick={this.toggleOff} className="px-3 pb-3">
                                        <SVG src='<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="0.75em" viewBox="0 0 492 492" xml:space="preserve"><g><g><path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/></g></g>' />
                                    </div>
                                </div>
                                <div>
                                    {/* MDBReact image carousel */}
                                    <MDBContainer>
                                        <MDBCarousel
                                            activeItem={1}
                                            length={3}
                                            showControls={true}
                                            showIndicators={false}
                                            className="z-depth-1"
                                            slide
                                        >
                                            <MDBCarouselInner>
                                                <MDBCarouselItem itemId="1">
                                                    <MDBView>
                                                        <div className="d-flex flex-row align-items-center justify-content-center">
                                                        <img
                                                            className="d-block"
                                                            src={this.state.selected_item.img[0]}
                                                            alt="First slide"

                                                        />
                                                        </div>
                                                    </MDBView>
                                                </MDBCarouselItem>
                                                <MDBCarouselItem itemId="2">
                                                    <MDBView>
                                                        <div className="d-flex flex-row align-items-center justify-content-center">
                                                        <img
                                                            className="d-block "
                                                            src={this.state.selected_item.img[1]}
                                                            alt=" Second slide"
                                                        />
                                                        </div>
                                                    </MDBView>
                                                </MDBCarouselItem>
                                                <MDBCarouselItem itemId="3">
                                                    <MDBView>
                                                        <div className="d-flex flex-row align-items-center justify-content-center">
                                                        <img
                                                            className="d-block"
                                                            src={this.state.selected_item.img[2]}
                                                            alt="Third slide"
                                                        />
                                                        </div>
                                                    </MDBView>
                                                </MDBCarouselItem>
                                            </MDBCarouselInner>
                                        </MDBCarousel>
                                    </MDBContainer>
                                </div>
                                {/* popup item details */}
                                <div className="d-flex flex-column align-items-center justify-content-center popup-details-section px-3">
                                    <div className="pt-2 popup-item-title">{this.state.selected_item.title}</div>
                                    <div className="pb-2 popup-item-desc">{this.state.selected_item.description}</div>
                                    <div className="d-flex flex-row align-items-center justify-content-between popup-price-add-section">
                                        <div className="item-price">Rs.{this.state.selected_item.price}</div>
                                        <div onClick={() => this.addItemToCart()}>
                                            <button className="px-4 py-2 popup-add-btn">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>

                <MDBContainer>
                    <MDBModal isOpen={this.state.categories_modal} toggle={this.toggleCategoriesModal} centered size="lg">
                        <MDBModalBody>
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex flex-row align-items-center justify-content-between mt-2 mb-3 px-2 cat-modal-title-section">
                                    <div className="cat-modal-title">Categories</div>
                                    <div onClick={this.toggleCategoriesModal} >
                                        <SVG src='<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="0.75em" viewBox="0 0 492 492" xml:space="preserve"><g><g><path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/></g></g>' />
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-start cat-list-mob">
                                    {
                                        this.renderCategoriesListMob()
                                    }
                                </div>
                            </div>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>

                <div className="d-flex flex-row home-content">
                    <div className="d-flex flex-column align-items-start categories-pane">
                        <div className="pb-2 cat-heading">
                            Categories
                        </div>
                        <div className="d-flex flex-column align-items-start cat-list">
                            {
                                this.renderCategoriesList()
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-column items-pane">
                        <div className="d-flex flex-row align-items-center justify-content-end my-3">
                            <div className="filter-text" onClick={() => this.toggleCategoriesModal()}>
                                Filter
                            </div>
                            <div className="mx-4 my-3 search-bar-div">
                                {/* Search Bar */}
                                <input name="search-bar" placeholder="Search Item" className="search-bar-input-home px-2" onChange={(searchedValue) => this.searchItem(searchedValue)} />
                            </div>
                        </div>
                        <div className="mb-4 ml-4 items-cluster">
                            {/* Default - all items will be rendered */}
                            {
                                !this.state.searchBarInput && this.displayDefaultItems()
                            }

                            {/* Null info - when none of the categories is selected */}
                            {
                                !Object.values(this.state.catJson).includes(true) && this.nullCategoryInfo()
                            }

                            {/* Search items - searched Items will be rendered */}
                            {
                                this.state.searchBarInput && this.displaySearchResults()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//REDUX methods
const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems
    }
};

const mapDispatchToProps = () => {
    return {
        addItem,
        clearItems,
    }
};

export default connect(mapStateToProps, mapDispatchToProps())(Home);
