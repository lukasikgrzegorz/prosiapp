import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../services/firebase";
import getActualDate from "../../functions/getActualDate";

const NewItemForm = () => {
	const [title, setTitle] = useState();
	const [value, setValue] = useState();
	const [date, setDate] = useState();
	const [isIncome, setIsIncome] = useState(true);
	const inputDataRef = useRef();
	const actualDate = getActualDate();

	useEffect(() => {
		setDate(actualDate);
	}, []);

	const setIncome = () => {
		setIsIncome(true);
	};

	const setCost = () => {
		setIsIncome(false);
	};

	const addNewItem = async () => {
		try {
			const docRef = await addDoc(collection(db, `b2MXBNKz38Ml3p5KnHwOkvLJgPw1`), {
				value: value,
				title: title,
				date: date,
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	return (
		<>
			<div>
				<button onClick={setIncome}>INCOME</button>
				<button onClick={setCost}>COST</button>
			</div>
			<input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
			<input type="number" placeholder="value" onChange={(e) => setValue(e.target.value)} />
			<input
				ref={inputDataRef}
				type="date"
				placeholder="date"
				defaultValue={actualDate}
				onChange={(e) => setDate(e.target.value)}
			/>
			<button onClick={addNewItem}>Add</button>
		</>
	);
};

export default NewItemForm;
