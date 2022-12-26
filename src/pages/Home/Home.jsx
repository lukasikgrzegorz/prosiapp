import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserID, removeUserID, setUserEmail, removeUserEmail } from "../../redux/userSlice";
import { setLastHistory, clearBalance, setBalance } from "../../redux/balanceSlice";
import { getUserID, getUserEmail, getLastHistory, getBalance } from "../../redux/selectors";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";
import OptionButton from "../../components/OptionButton/OptionButton";
import Modal from "../../components/Modal/Modal";
import NewItemForm from "../../components/NewItemForm/NewItemForm";
import css from "./Home.module.css";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userID = useSelector(getUserID);
	const userEmail = useSelector(getUserEmail);
	const lastHistory = useSelector(getLastHistory);
	const userRef = collection(db, `${userID}`);
	const dateQuery = query(userRef, orderBy("date", "desc"));
	const [openModal, setOpenModal] = useState(false);
	const [isLoading, setIsLoadnig] = useState(false);
	const currentBalance = useSelector(getBalance);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const email = user.email;
				dispatch(setUserID(uid));
				dispatch(setUserEmail(email));
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
				dispatch(removeUserEmail());
				dispatch(clearBalance());
				console.log("Signed out successfully");
			})
			.catch((error) => {});
	};

	const fetchHistory = async () => {
		await getDocs(dateQuery)
			.then((querySnapshot) => {
				const lastHistory = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
				console.log(lastHistory);
				dispatch(setLastHistory(lastHistory));
				lastHistory.length > 0 && dispatch(setBalance(lastHistory[0].after));
			})
			.catch((error) => console.log(error))
			.finally(() => console.log("done"));
	};

	useEffect(() => {
		fetchHistory();
	}, [userID]);

	const closeModalwithBtn = () => {
		setOpenModal(false);
		fetchHistory();
	};

	const openModalwithBtn = () => {
		setOpenModal(true);
	};

	return (
		<>
			<OptionButton option="add" onClickHandler={openModalwithBtn} />
			{openModal && (
				<Modal>
					<NewItemForm onClose={closeModalwithBtn} />
				</Modal>
			)}
			<header className={css["header"]}>
				<div className={css["header-container"]}>
					<div>
						<OptionButton option="categories"></OptionButton>
					</div>
					<div className={css["header-user"]}>
						<div>{userEmail}</div>
						<div>
							<OptionButton option="logout" onClickHandler={handleLogout} />
						</div>
					</div>
				</div>
			</header>
			<main>
				<div className={css["container"]}>
					<div className={css["balance-wrapper"]}>
						<p className={css["title"]}>Current balance:</p>
						<p className={css["value"]}>{currentBalance.toFixed(2)}</p>
					</div>

					<ul className={css["list"]}>
						{lastHistory.map((item) => {
							return (
								<li
									className={item.value > 0 ? css["item-income"] : css["item-cost"]}
									key={item.id}
								>
									<div className={css["data-holder"]}>
										<p className={css["title"]}>{item.title}</p>
										<p className={css["data"]}>{item.category}</p>
										<p className={css["data"]}>{item.date.slice(0, 10)}</p>
									</div>
									<div className={css["value"]}>{item.value.toFixed(2)}</div>
								</li>
							);
						})}
					</ul>
				</div>
			</main>
		</>
	);
};

export default Home;
