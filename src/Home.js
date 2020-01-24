import React, { Component } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = (props) => {

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
                                    {/* ITEM BOX - LOOP */}
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
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
}

export default Home;
