const addToCartReducer = (state= [], action) => {
    switch (action.type) {
        case "addItem":
            let presence = false;
            if(state.length === 0) {
                state = [...state, action.payload];
            } else if(state.length !=0) {
                state.map(item => {
                    if(item.uid === action.payload.uid) {
                        presence = true;
                        item.quantity = item.quantity + 1
                        item.total_price = item.quantity * item.price;
                    }
                });
                if(presence === false) {
                    state = [...state, action.payload];
                }
            }
            window.localStorage.setItem("cartItems", JSON.stringify(state));
            return state;

        case "clearItems":
            return state = [];

        case "setRetrievedState":
            return state = action.payload;

        default:
            return state;
    }

}

export default addToCartReducer;