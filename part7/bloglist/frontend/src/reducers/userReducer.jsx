import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearUser(state, action) {
            return null
        },
    },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer

export const login = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({
            username,
            password,
        })
        dispatch(setUser(user))
        console.log(user)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

        return user.name
    }
}

export const logout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(clearUser())
    }
}

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
    }
}