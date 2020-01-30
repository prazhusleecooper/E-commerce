import React, { Component } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: ['Fruits', 'Vegetables', 'Appliances'],
            checked_categories: [],
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
                    "category": "Fruits"
                },
                {
                    "title": "Orange",
                    "img": "img",
                    "price": "40",
                    "uid": 2,
                    "category": "Fruits"
                },
                {
                    "title": "Banana",
                    "img": "img",
                    "price": "20",
                    "uid": 3,
                    "category": "Fruits"
                },
                {
                    "title": "Potato",
                    "img": "img",
                    "price": "80",
                    "uid": 4,
                    "category": "Vegetables"
                },
                {
                    "title": "Tomato",
                    "img": "img",
                    "price": "75",
                    "uid": 5,
                    "category": "Vegetables"
                },
                {
                    "title": "TV",
                    "img": "img",
                    "price": "45000",
                    "uid": 6,
                    "category": "Appliances"
                },
                {
                    "title": "Laptop",
                    "img": "img",
                    "price": "20000",
                    "uid": 3,
                    "category": "Appliances"
                }
            ]
        }
        this.state.checked_categories = this.state.categories;

    }

    handleClick(e, cat) {
        console.log("this: ", cat);
        if(this.state.categories.includes(cat)){
            console.log("includes");
        } else {
            console.log("not available");
        }

    }

    render() {
        return (
            <div className="Home">
                {/*<button onClick={(e) => this.handleClick(e)}>BTN</button>*/}
                <div className="d-flex flex-row home-content">
                    <div className="d-flex flex-column align-items-start p-4 categories-pane">
                        <div className="pb-2 cat-heading">
                            Catgories
                        </div>
                        <div className="d-flex flex-column align-items-start cat-list">
                            {this.state.categories.map(category => {
                                return( <div className="pb-1 cat-name">
                                    <input type="checkbox" name={category} value={category}
                                           className="mr-2" defaultChecked={true} onChange={(e) => this.handleClick(e, category)} /> {category}
                                </div>);
                            })}
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
                                    {/* Normal loop without checkbox condition */}
                                    {
                                        this.state.categories.map(category => {

                                            return (
                                                <div className="returnDiv">
                                                    <div className="d-flex flex-row item-category">
                                                        <div className="item-category-text">{category}</div>
                                                    </div>
                                                    <div className="d-flex flex-row items-list-display">

                                                    {
                                                        this.state.homeItems.map(homeItem => {
                                                            if(homeItem.category === category) {
                                                                return <div className="d-flex flex-column align-items-center justify-content-center ml-5 mb-4 px-4 pt-3 py-0 item-box">
                                                                    <div className="item-image">image</div>
                                                                    <div className="pt-2 item-title">{homeItem.title}</div>
                                                                    <div className="d-flex flex-row align-items-center justify-content-between pt-2 pb-3 price-add-section">
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
                                                </div>

                                            );
                                        })
                                    }

                                {/* Loop with checkbox condition */}
                                {

                                    this.state.categories.map(category => {

                                        return (
                                            <div className="returnDiv">
                                                <div className="d-flex flex-row item-category">
                                                    <div className="item-category-text">{category}</div>
                                                </div>
                                                <div className="d-flex flex-row items-list-display">

                                                    {
                                                        this.state.homeItems.map(homeItem => {
                                                            if(homeItem.category === category) {
                                                                return <div className="d-flex flex-column align-items-center justify-content-center ml-5 mb-4 px-4 pt-3 py-0 item-box">
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
                                            </div>

                                        );
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
