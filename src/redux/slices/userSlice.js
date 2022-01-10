import { createSlice } from "@reduxjs/toolkit"


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedInUser: [],
        logoutUser: []
    },
    reducers: {
        loggedInUser: (state, { payload }) => {
            state.loggedInUser = payload;
        },
        logOut: (state, { payload }) => {
            state.loggedInUser = payload;
        },

    },
})

export const { loggedInUser, logOut } = userSlice.actions

export default userSlice.reducer
