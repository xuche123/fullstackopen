import { createSlice } from "@reduxjs/toolkit"

const typeSlice = createSlice({
    name: "type",
    initialState: 0,
    reducers: {
        setType(state, action) {
            return action.payload
        },
    },
})

export const { setType } = typeSlice.actions
export default typeSlice.reducer