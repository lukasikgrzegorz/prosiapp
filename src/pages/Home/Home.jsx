import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const Home = () => {
	const navigate = useNavigate();
	const [userID, setUserID] = useState();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setUserID(uid);
				// ...
			} else {
				navigate("/login");
			}
		});
	}, [userID]);

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				navigate("/");
				setUserID(null);
				console.log("Signed out successfully");
			})
			.catch((error) => {
			});
	};

	return (
		<>
			<nav>
				<p>Welcome Home</p>
				<p>Your id: {userID}</p>
				<div>
					<button onClick={handleLogout}>Logout</button>
				</div>
			</nav>
		</>
	);
};

export default Home;
