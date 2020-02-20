//REDUX actions

//to add an item in the cart
//also to increase quantity by one unit
export const addItem = (val) => {
    return {
        type: "addItem",
        payload: val
    }
}

//to clear all the items in the cart
export const clearItems = () => {
    return {
        type: "clearItems",
    }
}

//to retrieve the cart data from local storage in case of redux data unavailability
export const setRetrievedState = (val) => {
    return {
        type: "setRetrievedState",
        payload: val
    }
}

//to remove an item completely from the cart
export const removeItem = (val) => {
    return {
        type: "removeItem",
        payload: val
    }
}

//to decrease the quantity by one unit
export const decreaseQty = (val) => {
    return {
        type: "decreaseQty",
        payload: val
    }
}

