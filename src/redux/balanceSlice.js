import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	balance: 0,
	lastHistory: [],
};

const balanceSlice = createSlice({
	name: "balance",
	initialState,
	reducers: {
		setLastHistory(state, action) {
			state.lastHistory = action.payload;
		},
		clearLastHistory(state) {
			state.lastHistory = [];
		},
	},
});

export const balanceReducer = balanceSlice.reducer;
export const { setLastHistory, clearLastHistory } = balanceSlice.actions;
