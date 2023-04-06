import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        clearNotification(state, action) {
            return null
        }
    }
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotifications = (message, time) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 1000 * time)
    }
}