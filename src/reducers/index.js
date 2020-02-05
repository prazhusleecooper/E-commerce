import addToCartReducer from "./addToCart";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    addToCart: addToCartReducer
});

export default allReducers;