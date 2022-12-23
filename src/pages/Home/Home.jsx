import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewItemForm from "../../components/NewItemForm/NewItemForm";
import { setUserID, removeUserID } from "../../redux/userSlice";
import { setLastHistory, clearLastHistory, setBalance } from "../../redux/balanceSlice";
import { getUserID } from "../../redux/selectors";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";
import Button from "../../components/Button/Button";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userID = useSelector(getUserID);
	const userRef = collection(db, `${userID}`);
	const dateQuery = query(userRef, orderBy("date", "desc"));
	const [openModal, setOpenModal] = useState(false);

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
		await getDocs(dateQuery).then((querySnapshot) => {
			const lastHistory = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			console.log(lastHistory);
			dispatch(setLastHistory(lastHistory));
			lastHistory.length > 0 && dispatch(setBalance(lastHistory[0].after));
		});
	};

	useEffect(() => {
		userID && fetchHistory();
	});

	const closeModal = () => {
		setOpenModal(false);
	};

	return (
		<>
			<nav>
				<p>Welcome Home</p>
				<p>Your id: {userID}</p>
				<div>
					<button onClick={handleLogout}>Logout</button>
				</div>
				<Button
					value="+"
					onClickHandler={() => {
						setOpenModal(true);
					}}
				/>
				{openModal && <NewItemForm onClose={closeModal} />}
			</nav>
		</>
	);
};

export default Home;
