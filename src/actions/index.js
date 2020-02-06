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
