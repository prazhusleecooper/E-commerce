import addToCartReducer from "./addToCart";
import { combineReducers } from "redux";

//combineReducers to combine all the reducers associated
const allReducers = combineReducers({
    addedItems: addToCartReducer
});

export default allReducers;