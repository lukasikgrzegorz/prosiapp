import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userID: null,
	email: null,
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
		setUserEmail: (state, action) => {
			state.email = action.payload;
		},
		removeUserEmail: (state) => {
			state.email = null;
		},
	},
});

export const userReducer = userSlice.reducer;
export const { setUserID, removeUserID, setUserEmail, removeUserEmail } = userSlice.actions;
