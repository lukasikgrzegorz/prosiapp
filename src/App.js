import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { store } from "./redux/store";
import "./App.css";

function App() {
	return (
		<>
			<div>
				<section>
					<Routes>
						{" "}
						<Route path="/" element={<Home />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</section>
			</div>
		</>
	);
}

export default App;
