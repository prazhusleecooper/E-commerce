export const addItem = (val) => {
    return {
        type: "addItem",
        payload: val
    }
}

export const clearItems = () => {
    return {
        type: "clearItems",
    }
}

export const setRetrievedState = (val) => {
    return {
        type: "setRetrievedState",
        payload: val
    }
}
