import addToCartReducer from "./addToCart";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    addedItems: addToCartReducer
});

export default allReducers;