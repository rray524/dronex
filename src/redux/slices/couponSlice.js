import { createSlice } from "@reduxjs/toolkit"

export const couponSlice = createSlice({
    name: 'coupon',
    initialState: {
        apply: false
    },


    reducers: {
        couponApplied: (state, { payload }) => {
            state.apply = payload;
        }
    }
})

export const { couponApplied } = couponSlice.actions

export default couponSlice.reducer
