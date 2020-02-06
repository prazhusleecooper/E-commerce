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

        case "removeItem":
            state.map((stateItem, index = 0) => {
                if(stateItem.uid === action.payload.uid) {
                    console.log("STATE BEFORE REMOVING:", state);
                    state.splice(index,1);
                    console.log("STATE AFTER REMOVING:", state);
                }
            } );
            window.localStorage.setItem("cartItems", JSON.stringify(state));
            return state;

        default:
            return state;
    }

}

export default addToCartReducer;