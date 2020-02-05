const addToCartReducer = (state= null, action) => {
    switch (action.type) {
        case "addItem":
            return state = action.payload
        default:
            return state
    }

}

export default addToCartReducer;