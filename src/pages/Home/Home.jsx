import React, { useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserID, removeUserID, setUserEmail, removeUserEmail } from "../../redux/userSlice";
import {
	setHistory,
	setHistoryType,
	clearBalance,
	setBalance,
	setCategories,
	clearHistory,
} from "../../redux/balanceSlice";
import {
	getUserID,
	getUserEmail,
	getHistory,
	getBalance,
	getHistoryType,
} from "../../redux/selectors";
import { getDocs, collection, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../services/firebase";
import OptionButton from "../../components/OptionButton/OptionButton";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import NewItemForm from "../../components/NewItemForm/NewItemForm";
import Categories from "../../components/Categories/Categories";
import Statistics from "../../components/Statistics/Statistics";
import Loader from "../../components/Loader/Loader";
import EmptyContainer from "../../components/EmptyContainer/EmptyContainer";
import css from "./Home.module.css";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userID = useSelector(getUserID);
	const userEmail = useSelector(getUserEmail);
	const history = useSelector(getHistory);
	const historyType = useSelector(getHistoryType);
	const userRef = collection(db, `${userID}`);
	const inputDateFromRef = useRef();
	const inputDateToRef = useRef();
	const userCategoriesRef = collection(db, `${userID}-categories`);
	const [openModal, setOpenModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);
	const [dateFrom, setDateFrom] = useState(null);
	const [dateTo, setDateTo] = useState(null);
	const [isLoading, setIsLoadnig] = useState(false);
	const currentBalance = useSelector(getBalance);

	const dateQuery = query(userRef, orderBy("date", "desc"), limit(15));
	const dateRangeQuery = query(
		userRef,
		orderBy("date", "desc"),
		where("date", ">=", dateFrom),
		where("date", "<=", dateTo)
	);
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
				dispatch(clearHistory());
				dispatch(setHistoryType("last"));
				console.log("Signed out successfully");
			})
			.catch((error) => {});
	};

	const fetchLastHistory = async () => {
		setIsLoadnig(true);
		await getDocs(dateQuery)
			.then((querySnapshot) => {
				const lastHistory = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
				dispatch(setHistoryType("last"));
				dispatch(setHistory(lastHistory));
				inputDateFromRef.current.value = null;
				inputDateToRef.current.value = null;
				lastHistory.length > 0 && dispatch(setBalance(lastHistory[0].after));
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoadnig(false));
	};

	const fetchCategories = async () => {
		setIsLoadnig(true);
		await getDocs(categoriesQuery)
			.then((querySnapshot) => {
				const categories = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
				dispatch(setCategories(categories));
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoadnig(false));
	};

	const fetchByDateRange = async () => {
		setIsLoadnig(true);
		await getDocs(dateRangeQuery)
			.then((querySnapshot) => {
				const history = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
				dispatch(setHistoryType("range"));
				dispatch(setHistory(history));
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoadnig(false));
	};

	useEffect(() => {
		fetchLastHistory();
		fetchCategories();
	}, [userID]);

	const closeModalwithBtn = () => {
		setOpenModal(false);
		setModalContent(null);
		fetchLastHistory();
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
			{isLoading && <Loader />}
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
					<div className={css["inside-wrapper"]}>
						<div className={css["balance-wrapper"]}>
							<p className={css["title"]}>Current balance:</p>
							<p className={css["value"]}>{currentBalance.toFixed(2)}</p>
						</div>
						{history.length > 0 && historyType === "range" && <Statistics data={history} />}
					</div>

					<div className={css["inside-wrapper"]}>
						<div className={css["search-holder"]}>
							<div className={css["search-option"]}>
								<label>
									From:{" "}
									<input
										ref={inputDateFromRef}
										type="date"
										onChange={(e) => {
											setDateFrom(`${e.target.value}T00:00`);
										}}
									/>
								</label>
								<label>
									To:{" "}
									<input
										ref={inputDateToRef}
										type="date"
										onChange={(e) => {
											setDateTo(`${e.target.value}T23:59`);
										}}
									/>
								</label>
							</div>
							<OptionButton onClickHandler={fetchByDateRange} option="search" />
							<div className={css["last-btn-holder"]}>
								<Button onClickHandler={fetchLastHistory} value="Lastest" />
							</div>
						</div>
						{history.length === 0 && <EmptyContainer />}
						<ul className={css["list"]}>
							{history.map((item) => {
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
