
import { createSlice } from '@reduxjs/toolkit';

export const badgeSlice = createSlice({
    name: 'badge',
    initialState: {
        counter: 1
    },
    reducers: {
        increment: (state, /* action */ ) => {
           state.counter += 1;
       },
       decrement: ( state ) => {
         state.counter -= 1;
       },
       incrementBy: ( state, action ) => {
            console.log(action);
            state.counter += action.payload;
       }
   }
});


// Action creators are generated for each case reducer function
export const { increment, decrement, incrementBy } = badgeSlice.actions;