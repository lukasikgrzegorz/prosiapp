import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyACdLPGcIwo-x40uwPT59mZFPAC4T0nGnA",
	authDomain: "prosiapp-ad91e.firebaseapp.com",
	projectId: "prosiapp-ad91e",
	storageBucket: "prosiapp-ad91e.appspot.com",
	messagingSenderId: "1043621224891",
	appId: "1:1043621224891:web:4745393d5b651b707fe49e",
	measurementId: "G-2LCNW7FQ1P",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
