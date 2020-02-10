import React, { Component } from 'react';
import './resources/CSS/Home.css';
import {MDBContainer, MDBModal, MDBModalBody, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView} from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SVG from "react-inlinesvg";
import { connect } from "react-redux";
import { addItem, clearItems } from "./actions";
import home_items_data from '../src/resources/JSON/home_items';
import categories_data from '../src/resources/JSON/categories';

class Home extends Component {
    constructor(props) {
        super(props);
        // this.props.clearItems();
        this.state = {
            cat_json: categories_data,      /* categories.json data */
            homeItems: home_items_data,     /* home_items.json data */
            modal: false,                   /* popup modal - MDBReact modal */
            selected_item: {                /* currently selected item - displayed in the popup modal */
                "title": "",
                "img": "",
                "price": "",
                "uid": 0,
                "description": "",
                "category": ""
            },
            /* close icon - svg */
            closeSvg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="0.75em" viewBox="0 0 492 492" xml:space="preserve"><g><g><path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/></g></g>',
            // infoSvg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1em" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M437.019,74.981C388.667,26.629,324.38,0,256,0C196.696,0,138.885,20.747,93.213,58.417    c-3.672,3.027-4.193,8.458-1.165,12.129c3.029,3.672,8.461,4.191,12.13,1.164C146.77,36.58,200.688,17.232,256,17.232    c131.657,0,238.767,107.11,238.766,238.768c0,59.105-21.769,115.828-61.299,159.722c-3.183,3.536-2.899,8.984,0.638,12.168    c1.647,1.483,3.708,2.214,5.764,2.214c2.356,0,4.704-0.962,6.405-2.851c42.385-47.062,65.727-107.882,65.727-171.254    C511.999,187.62,485.371,123.333,437.019,74.981z"/></g></g><g><g><path d="M421.677,439.89c-3.063-3.642-8.497-4.114-12.14-1.051c-42.901,36.065-97.429,55.927-153.538,55.927    c-131.657,0-238.767-107.11-238.767-238.767c0-59.932,22.307-117.247,62.813-161.384c3.218-3.506,2.985-8.956-0.522-12.174    c-3.507-3.218-8.959-2.982-12.174,0.523c-43.432,47.325-67.35,108.777-67.35,173.036c0,68.381,26.629,132.668,74.981,181.02    C123.333,485.371,187.621,512,256,512c60.16,0,118.625-21.297,164.626-59.97C424.269,448.968,424.739,443.533,421.677,439.89z"/></g></g><g><g><path d="M289.368,189.061h-66.735c-4.76,0-8.616,3.858-8.616,8.616v225.799c0,4.758,3.857,8.616,8.616,8.616h66.735    c4.76,0,8.616-3.858,8.616-8.617V197.677C297.984,192.918,294.127,189.061,289.368,189.061z M280.753,414.86H231.25V206.293    h49.503V414.86z"/></g></g><g><g><path d="M256,78.701c-26.429,0-47.93,21.502-47.93,47.93c0,26.429,21.501,47.93,47.93,47.93s47.93-21.502,47.93-47.93    C303.93,100.202,282.429,78.701,256,78.701z M256,157.329c-16.927,0-30.698-13.771-30.698-30.698    c0-16.927,13.772-30.698,30.698-30.698c16.927,0,30.698,13.771,30.698,30.698C286.698,143.558,272.927,157.329,256,157.329z"/></g></g></svg>',
            infoSvg: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="0.75em" viewBox="0 0 298.667 298.667" xml:space="preserve"><g><g><g><polygon points="42.667,192 0,192 0,298.667 106.667,298.667 106.667,256 42.667,256    "/><polygon points="0,106.667 42.667,106.667 42.667,42.667 106.667,42.667 106.667,0 0,0    "/><polygon points="192,0 192,42.667 256,42.667 256,106.667 298.667,106.667 298.667,0    "/><polygon points="256,256 192,256 192,298.667 298.667,298.667 298.667,192 256,192    "/></g></g></g></svg>',
            searchBarInput: false,  /* Search Bar Empty => false || Search Bar not Empty => true */
            searchItems: null
        };
    }

    /* toggle on popup */
    toggleOn = (homeItem) => {
        this.setState({
                modal: !this.state.modal,
                selected_item: homeItem,
        })
    };

    /* toggle off popup */
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

    /* method to toggle checkbox */
    checkboxChange = (category) => {
        this.state.cat_json[category] = !this.state.cat_json[category];
        this.setState({});
    };

    searchItem = (e) => {
        console.log("search bar triggered");
        if(e.target.value === "") {
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
                if(homeItem.title.toUpperCase().includes(e.target.value.toUpperCase()) || homeItem.category.toUpperCase().includes(e.target.value.toUpperCase())) {
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

    addItemToCart = () => {
        console.log("SELECTED ITEM ", this.state.selected_item);
        toast.warn("Item has been added to your Cart!");
        this.props.addItem(this.state.selected_item);
    };

    dirAddToCart = (item) => {
        console.log("ThE ITEM IS ::", item);
        toast.warn("Item has been added to your Cart!");
        this.props.addItem(item);
    };

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
                                    <div onClick={this.toggleOff} className="px-3 pb-3"><SVG src={this.state.closeSvg} /></div>
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

                <div className="d-flex flex-row home-content">
                    <div className="d-flex flex-column align-items-start p-4 categories-pane">
                        <div className="pb-2 cat-heading">
                            Categories
                        </div>
                        <div className="d-flex flex-column align-items-start cat-list">
                            {
                                Object.keys(this.state.cat_json).map((category, index = 0)=> {
                                    return (<div className="pb-1 cat-name" key={index} >
                                        <input type="checkbox" name={category} value={category}  className="mr-2" defaultChecked={this.state.cat_json[category]} onChange={() => this.checkboxChange(category)} /> <span className="cat-text"> {category} </span>
                                            </div>);
                                })
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-column items-pane">
                        <div className="d-flex flex-row align-items-center justify-content-end">
                            <div className="mx-4 my-3 search-bar-div">
                                {/* Search Bar */}
                                <input name="search-bar" placeholder="Search Item" className="search-bar-input px-2" onChange={(e) => this.searchItem(e)} />
                            </div>
                        </div>
                        <div className="m-4 items-cluster">
                            {/* Default - all items will be rendered */}
                            { !this.state.searchBarInput && <div className="d-flex flex-column align-items-start">
                                {
                                Object.entries(this.state.cat_json).map((category, key=0 ) => {
                                    return (category[1] && <div className="returnDiv" key={key}>
                                            <div className="d-flex flex-row item-category">
                                                <div className="item-category-text">{category[0]}</div>
                                            </div>
                                            <div className="d-flex flex-row items-list-display">

                                                {
                                                    this.state.homeItems.map((homeItem, index = 0 ) => {
                                                        if(homeItem.category === category[0]) {
                                                            return <div className="d-flex flex-column align-items-center justify-content-center ml-5 mb-4 px-4 pt-3 item-box" key={index}>
                                                                <div className="d-flex flex-row align-items-center justify-content-end pb-2 info-svg-section" onClick={() => this.toggleOn(homeItem)}>
                                                                    <SVG src={this.state.infoSvg} className="info-svg" />
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
                            </div> }

                            {
                                !Object.values(this.state.cat_json).includes(true) &&
                                <div className="m-4 home-empty-text">
                                    Please select one or more categories to view the products!
                                </div>
                            }

                            {/* Search items - searched Items will be rendered */}
                            { this.state.searchBarInput && <div className="d-flex flex-column align-items-start">
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

                            </div> }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

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
