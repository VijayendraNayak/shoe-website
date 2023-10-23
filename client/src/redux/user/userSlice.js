import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    currentuUer: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.currentUser = action.payload
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error= action.payload
        },
        updateStart:(state)=>{
            state.loading=true
        },
        updateSuccess:(state,action)=>{
            state.loading=false
            state.error=null
            state.user=action.payload
        },
        updateFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})
export const { signInStart, signInSuccess, signInFailure,updateFailure,updateStart,updateSuccess } = userSlice.actions;
export default userSlice.reducer;