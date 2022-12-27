import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserID, removeUserID, setUserEmail, removeUserEmail } from "../../redux/userSlice";
import { setLastHistory, clearBalance, setBalance, setCategories } from "../../redux/balanceSlice";
import { getUserID, getUserEmail, getLastHistory, getBalance } from "../../redux/selectors";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";
import OptionButton from "../../components/OptionButton/OptionButton";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import NewItemForm from "../../components/NewItemForm/NewItemForm";
import Categories from "../../components/Categories/Categories";
import css from "./Home.module.css";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userID = useSelector(getUserID);
	const userEmail = useSelector(getUserEmail);
	const lastHistory = useSelector(getLastHistory);
	const userRef = collection(db, `${userID}`);
	const userCategoriesRef = collection(db, `${userID}-categories`);
	const [openModal, setOpenModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);
	const [isLoading, setIsLoadnig] = useState(false);
	const currentBalance = useSelector(getBalance);

	const dateQuery = query(userRef, orderBy("date", "desc"));
	const categoriesQuery = query(userCategoriesRef, orderBy("name"));

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

	const fetchCategories = async () => {
		await getDocs(categoriesQuery)
			.then((querySnapshot) => {
				const categories = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
				console.log(categories);
				dispatch(setCategories(categories));
			})
			.catch((error) => console.log(error))
			.finally(() => console.log("done"));
	};

	useEffect(() => {
		fetchHistory();
		fetchCategories();
	}, [userID]);

	const closeModalwithBtn = () => {
		setOpenModal(false);
		setModalContent(null);
		fetchHistory();
		fetchCategories();
	};

	const openModalAdd = () => {
		setModalContent("add");
		setOpenModal(true);
	};

	const openModalCategories = () => {
		setModalContent("categories");
		setOpenModal(true);
	};

	return (
		<>
			<OptionButton option="add" onClickHandler={openModalAdd} />
			{openModal && (
				<Modal>
					{modalContent === "add" && <NewItemForm onClose={closeModalwithBtn} />}
					{modalContent === "categories" && <Categories onClose={closeModalwithBtn} />}
				</Modal>
			)}
			<header className={css["header"]}>
				<div className={css["header-container"]}>
					<div>
						<OptionButton option="categories" onClickHandler={openModalCategories}></OptionButton>
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

					<div className={css["history-wrapper"]}>
						<div className={css["search-holder"]}>
							<div className={css["search-option"]}>
								<label>
									From: <input type="date" />
								</label>
								<label>
									To: <input type="date" />
								</label>
								<OptionButton option="search" />
							</div>
							<div>
								<Button value="Lastest" />
							</div>
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
				</div>
			</main>
		</>
	);
};

export default Home;
