import React, { Component } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './Cart';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: true,
            categories: ['Fruits', 'Vegetables', 'Appliances'],
            checked_categories: [],
            cat_json: {
                "Fruits": true,
                "Vegetables": true,
                "Appliances": true
            },
            sample: [{"Fruits": true},{"Vegetables": true},{"appliances": true}],
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
        };
        this.state.checked_categories = this.state.categories;
        let x = "Vegetables";
        // this.state.sample[1][x] = false;
        let keyys = Object.keys(this.state.sample);
        keyys.map(keyy => {

            let keyx = Object.keys(this.state.sample[keyy]);
            if(keyx[0] === x){
                console.log("OIII");
                this.state.sample[keyy][x] = false;
            }
            console.log("KEYYY:: ", this.state.sample[keyy]);
        });
        // for (let i = 0; i < this.state.categories.length; i++) {
        //     this.state.categories[i].row_number = i;
        // }

        this.state.cat_json[x] = false;
        console.log("CAT-Json:::::", this.state.cat_json);
    }

    handleClick(cat) {
        console.log("cat is :", cat);
        let arrayIndex = Object.keys(this.state.sample);
        arrayIndex.map(index => {
            let indexKey = Object.keys(this.state.sample[index]);
            if(indexKey[0] === cat) {
                this.state.sample[index][cat] = false;
            }
        });
        console.log("LATEST SAMPLE: ", this.state.sample);
    }

    checkboxChange(category) {
        console.log("CHECK BOX TRIGGERED FOR :", category);
        this.state.cat_json[category] = !this.state.cat_json[category];
        this.setState({});
        console.log("CAT_JSON latest::::::", this.state.cat_json);
    }

    render() {
        return (
            <div className="Home">
                <div className="d-flex flex-row home-content">
                    <div className="d-flex flex-column align-items-start p-4 categories-pane">
                        <div className="pb-2 cat-heading">
                            Catgories
                        </div>
                        <div className="d-flex flex-column align-items-start cat-list">
                            {this.state.categories.map(category => {
                                return( <div className="pb-1 cat-name">
                                    <input type="checkbox" name={category} value={category}
                                           className="mr-2" defaultChecked={true} onChange={() => this.checkboxChange(category)} /> {category}
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
                                 {/*   {
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
                                    }*/}

                                {/* Loop with checkbox condition */}
                             {/*   {

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
                            }*/}
                            <div>_____________</div>
 {/*  Loop using cat_json  */}
 {

                                Object.entries(this.state.cat_json).map(category => {
                                    return category[1] && <div className="returnDiv">
                                            <div className="d-flex flex-row item-category">
                                                {console.log("UPPER VAL", category[1])}
                                                <div className="item-category-text">{category[0]}</div>
                                            </div>
                                            <div className="d-flex flex-row items-list-display">

                                                {
                                                    this.state.homeItems.map(homeItem => {
                                                        console.log("CAT VAL:", category);
                                                        if(homeItem.category === category[0]) {
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


                                    ;
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
