import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userID: null,
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUserID: (state, action) => {
			state.userID = action.payload;
		},
		removeUserID: (state) => {
			state.userID = null;
		},
	},
});

export const userReducer = userSlice.reducer;
export const { setUserID, removeUserID } = userSlice.actions;
