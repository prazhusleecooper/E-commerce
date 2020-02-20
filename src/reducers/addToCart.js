//REDUX reducer
const addToCartReducer = (state= [], action) => {
    switch (action.type) {
        case "addItem":                                                         //to add an item to the cart
            let presence = false;                                               //also to increase the quantity by one unit
            if(state.length === 0) {
                state = [...state, action.payload];
            } else if(state.length !== 0) {
                state.map(item => {
                    if(item.uid === action.payload.uid) {
                        presence = true;
                        item.quantity += 1;
                        item.total_price = item.quantity * item.price;
                    }
                    return '';
                });
                if(presence === false) {
                    state = [...state, action.payload];
                }
            }
            window.localStorage.setItem("cartItems", JSON.stringify(state));
            return state;

        case "clearItems":                                                     //to clear all the items from cart
            return state = [];

        case "setRetrievedState":                                              //to retrieve cart data from local storage in case that redux cart data is unavailable
            return state = action.payload;

        case "removeItem":                                                     //to remove an item completely from the cart
            state.map((stateItem, index = 0) => {
                if(stateItem.uid === action.payload.uid) {
                    console.log("STATE BEFORE REMOVING:", state);
                    state.splice(index,1);
                    console.log("STATE AFTER REMOVING:", state);
                }
                return '';
            } );
            window.localStorage.setItem("cartItems", JSON.stringify(state));
            return state;

        case "decreaseQty":                                                    //to decrease the quantity by one unit
        //    start here :)
            state.map((item, index = 0) => {
               if(item.uid === action.payload.uid) {
                   let tempArr = state;
                   if(tempArr[index].quantity === 1) {
                       tempArr.splice(index, 1);
                       state = tempArr;
                   } else if(tempArr[index].quantity > 1) {
                       tempArr[index].quantity -= 1;
                       tempArr[index].total_price = tempArr[index].quantity * tempArr[index].price;
                       state = tempArr;
                   }
               }
               return '';
            });
            window.localStorage.setItem("cartItems", JSON.stringify(state));
            return state;

        default:
            return state;
    }

};

export default addToCartReducer;