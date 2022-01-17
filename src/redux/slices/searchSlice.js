import { createSlice } from "@reduxjs/toolkit"


export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        text: ""
    },
    reducers: {
        searchText: (state, { payload }) => {
            state.text = payload
        },
    },
})

export const { searchText } = searchSlice.actions

export default searchSlice.reducer
