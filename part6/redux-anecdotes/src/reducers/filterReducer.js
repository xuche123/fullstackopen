const reducer = (state = "", action) => {
    // console.log("state now: ", state)
    // console.log("action", action)
    
    switch (action.type) {
        case "SET_FILTER":
            return action.data.filter
        default:
            return state
    }
}

export const setFilter = (filter) => {
    return {
        type: "SET_FILTER",
        data: { filter }
    }
}

export default reducer