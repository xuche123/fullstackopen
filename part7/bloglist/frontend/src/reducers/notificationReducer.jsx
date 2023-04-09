import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, type: null },
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    clearNotification(state, action) {
      return { message: null, type: null }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotifications = (message, time, type) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000 * time)
  }
}
