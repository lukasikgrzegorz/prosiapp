import { configureStore } from "@reduxjs/toolkit";
import { balanceReducer } from "./balanceSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		balance: balanceReducer,
	},
});
