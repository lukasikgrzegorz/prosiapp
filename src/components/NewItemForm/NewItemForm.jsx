import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../services/firebase";
import getActualDate from "../../functions/getActualDate";
import { getUserID, getBalance, getCategories } from "../../redux/selectors";
import { useSelector } from "react-redux";
import Notiflix from "notiflix";
import css from "./NewItemForm.module.css";
import Button from "../../components/Button/Button";
import OptionButton from "../OptionButton/OptionButton";

const NewItemForm = ({ onClose }) => {
	const [title, setTitle] = useState(null);
	const [value, setValue] = useState(null);
	const [date, setDate] = useState();
	const [isIncome, setIsIncome] = useState(true);
	const [category, setCategory] = useState("General");
	const inputDateRef = useRef();
	const inputTitleRef = useRef();
	const inputValueRef = useRef();
	const actualDate = getActualDate();
	const userID = useSelector(getUserID);
	const actualBalance = useSelector(getBalance);
	const categories = useSelector(getCategories);

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
		const finishValue = actualBalance + value;
		if (value && title) {
			try {
				const docRef = await addDoc(collection(db, userID), {
					value: value,
					title: title,
					date: date,
					category: category,
					before: actualBalance,
					after: finishValue,
				});
				Notiflix.Notify.success("Item created");
			} catch (error) {
				Notiflix.Notify.failure(error);
			} finally {
				clearInput();
				onClose();
			}
		} else {
			console.log("Puste pola!");
		}
	};

	return (
		<div className={css["backdrop"]}>
			<div className={isIncome ? css["wrapper-green"] : css["wrapper-red"]}>
				<OptionButton option="close" onClickHandler={onClose} />
				<div className={css["button-wrapper"]}>
					<button onClick={setIncome} className={css["accent"]} disabled={isIncome}>
						Income
					</button>
					<button onClick={setCost} className={css["accent"]} disabled={!isIncome}>
						Cost
					</button>
				</div>
				<div className={css["input-wrapper"]}>
					<input
						ref={inputTitleRef}
						type="text"
						placeholder="Title"
						onChange={(e) => setTitle(e.target.value)}
					/>
					<input ref={inputValueRef} type="number" placeholder="Value" onChange={setActualValue} />
					<select name="category" defaultValue="" onChange={(e) => setCategory(e.target.value)}>
						<option value="General">General</option>
						{categories.map((category, index) => {
							return (
								<option key={index} value={category.name}>
									{category.name}
								</option>
							);
						})}
					</select>
				</div>
				<div>
					<Button value="Add" onClickHandler={addNewItem} />
				</div>
			</div>
		</div>
	);
};

export default NewItemForm;
