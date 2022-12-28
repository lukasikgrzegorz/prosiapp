import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	balance: 0,
	historyType: "last",
	history: [],
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
		setHistoryType(state, action) {
			state.historyType = action.payload;
		},
		setHistory(state, action) {
			state.history = action.payload;
		},
		clearHistory(state) {
			state.history = [];
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
	setHistoryType,
	setHistory,
	clearHistory,
	setCategories,
	clearCategories,
} = balanceSlice.actions;
