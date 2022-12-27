import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	balance: 0,
	lastHistory: [],
	categories: [],
};

const balanceSlice = createSlice({
	name: "balance",
	initialState,
	reducers: {
		setBalance(state, action) {
			state.balance = action.payload;
		},
		clearBalance(state) {
			state.balance = 0;
		},
		setLastHistory(state, action) {
			state.lastHistory = action.payload;
		},
		clearLastHistory(state) {
			state.lastHistory = [];
		},
		setCategories(state, action) {
			state.categories = action.payload;
		},
		clearCategories(state) {
			state.categories = [];
		},
	},
});

export const balanceReducer = balanceSlice.reducer;
export const {
	setBalance,
	clearBalance,
	setLastHistory,
	clearLastHistory,
	setCategories,
	clearCategories,
} = balanceSlice.actions;
