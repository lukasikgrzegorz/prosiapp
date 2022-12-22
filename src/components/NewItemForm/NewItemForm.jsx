import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../services/firebase";
import getActualDate from "../../functions/getActualDate";
import { getUserID } from "../../redux/selectors";
import { useSelector } from "react-redux";
import css from "./NewItemForm.module.css";
import Button from "../../components/Button/Button";

const NewItemForm = () => {
	const [title, setTitle] = useState(null);
	const [value, setValue] = useState(null);
	const [date, setDate] = useState();
	const [isIncome, setIsIncome] = useState(true);
	const inputDateRef = useRef();
	const inputTitleRef = useRef();
	const inputValueRef = useRef();
	const actualDate = getActualDate();
	const userID = useSelector(getUserID);

	useEffect(() => {
		setDate(actualDate);
	}, []);

	const clearInput = () => {
		inputTitleRef.current.value = "";
		inputValueRef.current.value = "";
		setValue(null);
		setTitle(null);
	};

	const setIncome = () => {
		setIsIncome(true);
		clearInput();
	};

	const setCost = () => {
		setIsIncome(false);
		clearInput();
	};

	const setActualValue = (e) => {
		if (isIncome) {
			setValue(e.target.value * 1);
		} else {
			setValue(e.target.value * -1);
		}
	};

	const addNewItem = async () => {
		if (value && title) {
			try {
				const docRef = await addDoc(collection(db, userID), {
					value: value,
					title: title,
					date: date,
				});
				console.log("Document written with ID: ", docRef.id);
			} catch (e) {
				console.error("Error adding document: ", e);
			} finally {
				clearInput();
			}
		} else {
			console.log("Puste pola!");
		}
	};

	return (
		<div className={isIncome ? css["wrapper-green"] : css["wrapper-red"]}>
			<div className={css["button-wrapper"]}>
				<button onClick={setIncome} className={css["accent"]} disabled={isIncome}>
					+ Income
				</button>
				<button onClick={setCost} className={css["accent"]} disabled={!isIncome}>
					- Cost
				</button>
			</div>
			<div className={css["input-wrapper"]}>
				<input
					ref={inputTitleRef}
					type="text"
					placeholder="Title"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<div className={css["input-row"]}>
					<input ref={inputValueRef} type="number" placeholder="Value" onChange={setActualValue} />
					<input
						ref={inputDateRef}
						type="date"
						placeholder="date"
						defaultValue={actualDate}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
			</div>
			<div>
				<Button value="Add" onClickHandler={addNewItem} />
			</div>
		</div>
	);
};

export default NewItemForm;
