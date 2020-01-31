import React, { Component } from 'react';
import './Home.css';
import {MDBContainer, MDBModal, MDBModalBody, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView} from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import SVG from "react-inlinesvg";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cat_json: {
                "Fruits": true,
                "Vegetables": true,
                "Appliances": true
            },
            homeItems: [
                {
                    "title": "Apple",
                    "img": "img",
                    "price": "50",
                    "uid": 1,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "category": "Fruits"
                },
                {
                    "title": "Orange",
                    "img": "img",
                    "price": "40",
                    "uid": 2,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "category": "Fruits"
                },
                {
                    "title": "Banana",
                    "img": "img",
                    "price": "20",
                    "uid": 3,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "category": "Fruits"
                },
                {
                    "title": "Potato",
                    "img": "img",
                    "price": "80",
                    "uid": 4,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "category": "Vegetables"
                },
                {
                    "title": "Tomato",
                    "img": "img",
                    "price": "75",
                    "uid": 5,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "category": "Vegetables"
                },
                {
                    "title": "TV",
                    "img": "img",
                    "price": "45000",
                    "uid": 6,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "category": "Appliances"
                },
                {
                    "title": "Laptop",
                    "img": "img",
                    "price": "20000",
                    "uid": 7,
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "category": "Appliances"
                }
            ],
            modal: false,
            selected_item: {
                "title": "",
                "img": "",
                "price": "",
                "uid": 0,
                "description": "",
                "category": ""
            },
            closeSvg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="0.75em" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve"><g><g><path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/></g></g>',
        };

        this.toggle = (homeItem) => {
            console.log("THE HOME ITEM iS ::::", homeItem);
            this.setState({
                modal: !this.state.modal,
                selected_item: homeItem,
            })
        }
    }

    checkboxChange(category) {
        this.state.cat_json[category] = !this.state.cat_json[category];
        this.setState({});
    }

    addItem(item) {
        console.log("THE SELECTED ITEM IS ::", item);
    }

    render() {
        return (
            <div className="Home">
                {/* MDB modal popup */}
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered size="lg" >
                        <MDBModalBody>
                            <div className="d-flex flex-column  justify-content-center popup-div">
                                <div className="d-flex flex-column align-items-end justify-content-center close-svg-section">
                                    <div onClick={this.toggle} className="px-3 pb-3"><SVG src={this.state.closeSvg} /></div>
                                </div>
                                <div>
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
                                                        <img
                                                            className="d-block w-100"
                                                            src="https://mdbootstrap.com/img/Photos/Slides/img%20(44).jpg"
                                                            alt="First slide"
                                                        />
                                                    </MDBView>
                                                </MDBCarouselItem>
                                                <MDBCarouselItem itemId="2">
                                                    <MDBView>
                                                        <img
                                                            className="d-block w-100"
                                                            src="https://mdbootstrap.com/img/Photos/Slides/img%20(46).jpg"
                                                            alt="Second slide"
                                                        />
                                                    </MDBView>
                                                </MDBCarouselItem>
                                                <MDBCarouselItem itemId="3">
                                                    <MDBView>
                                                        <img
                                                            className="d-block w-100"
                                                            src="https://mdbootstrap.com/img/Photos/Slides/img%20(49).jpg"
                                                            alt="Third slide"
                                                        />
                                                    </MDBView>
                                                </MDBCarouselItem>
                                            </MDBCarouselInner>
                                        </MDBCarousel>
                                    </MDBContainer>
                                </div>
                                <div className="d-flex flex-column align-items-center justify-content-center popup-details-section px-3">
                                    <div className="pt-2 popup-item-title">{this.state.selected_item.title}</div>
                                    <div className="pb-2 popup-item-desc">{this.state.selected_item.description}</div>
                                    <div className="d-flex flex-row align-items-center justify-content-between popup-price-add-section">
                                        <div className="item-price">Rs.{this.state.selected_item.price}</div>
                                        <div>
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
                                Object.keys(this.state.cat_json).map(category => {
                                    return (<div className="pb-1 cat-name">
                                                <input type="checkbox" name={category} value={category}  className="mr-2" defaultChecked={true} onChange={() => this.checkboxChange(category)} /> {category}
                                            </div>);
                                })
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-column items-pane">
                        <div className="d-flex flex-row align-items-center justify-content-end">
                            <div className="mx-4 my-3 search-bar-div">
                                <input name="search-bar" placeholder="Search Item" className="search-bar-input px-2"/>
                            </div>
                        </div>
                        <div className="m-4 items-cluster">
                            <div className="d-flex flex-column align-items-start">
                            {
                                Object.entries(this.state.cat_json).map(category => {
                                    return (category[1] && <div className="returnDiv">
                                            <div className="d-flex flex-row item-category">
                                                <div className="item-category-text">{category[0]}</div>
                                            </div>
                                            <div className="d-flex flex-row items-list-display">

                                                {
                                                    this.state.homeItems.map(homeItem => {
                                                        if(homeItem.category === category[0]) {
                                                            return <div className="d-flex flex-column align-items-center justify-content-center ml-5 mb-4 px-4 pt-3 py-0 item-box" onClick={() => this.toggle(homeItem)}>
                                                                <div className="item-image">image</div>
                                                                <div className="pt-2 item-title">{homeItem.title}</div>
                                                                <div
                                                                    className="d-flex flex-row align-items-center justify-content-between pt-2 pb-3 price-add-section">
                                                                    <div className="price-text">Rs.{homeItem.price}</div>
                                                                    <div className="add-btn-section">
                                                                        <button className="px-2 py-1 add-btn">Add</button>
                                                                    </div>
                                                                </div>
                                                            </div> ;
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>);
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Home;
