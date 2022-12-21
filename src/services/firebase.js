// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyACdLPGcIwo-x40uwPT59mZFPAC4T0nGnA",
	authDomain: "prosiapp-ad91e.firebaseapp.com",
	projectId: "prosiapp-ad91e",
	storageBucket: "prosiapp-ad91e.appspot.com",
	messagingSenderId: "1043621224891",
	appId: "1:1043621224891:web:4745393d5b651b707fe49e",
	measurementId: "G-2LCNW7FQ1P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
