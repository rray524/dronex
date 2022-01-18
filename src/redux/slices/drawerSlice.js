import { createSlice } from "@reduxjs/toolkit"

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        showHide: false
    },


    reducers: {
        showOrHide: (state, { payload }) => {
            state.showHide = payload;
        }
    }
})

export const { showOrHide } = drawerSlice.actions

export default drawerSlice.reducer
