import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewItemForm from "../../components/NewItemForm/NewItemForm";
import { setUserID, removeUserID } from "../../redux/userSlice";
import { getUserID } from "../../redux/selectors";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../services/firebase";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userID = useSelector(getUserID);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				dispatch(setUserID(uid));
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
				dispatch(removeUserID());
				console.log("Signed out successfully");
			})
			.catch((error) => {});
	};

	const fetchHistory = async () => {
		await getDocs(collection(db, `${userID}`)).then((querySnapshot) => {
			const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			console.log(newData);
		});
	};

	useEffect(() => {
		userID && fetchHistory();
	});

	return (
		<>
			<nav>
				<p>Welcome Home</p>
				<p>Your id: {userID}</p>
				<div>
					<button onClick={handleLogout}>Logout</button>
				</div>
				<NewItemForm />
			</nav>
		</>
	);
};

export default Home;
