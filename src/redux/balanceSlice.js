import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	balance: 0,
	lastHistory: [],
};

const balanceSlice = createSlice({
	name: "balance",
	initialState,
	reducers: {
		setBalance(state, action) {
			state.balance = action.payload;
		},
		setLastHistory(state, action) {
			state.lastHistory = action.payload;
		},
		clearLastHistory(state) {
			state.lastHistory = [];
		},
	},
});

export const balanceReducer = balanceSlice.reducer;
export const { setBalance, setLastHistory, clearLastHistory } = balanceSlice.actions;
