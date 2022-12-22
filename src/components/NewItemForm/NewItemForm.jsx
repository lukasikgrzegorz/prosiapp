import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../services/firebase";

const NewItemForm = () => {
	const [title, setTitle] = useState();
	const [value, setValue] = useState();
	const [date, setDate] = useState();

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
			<input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
			<input type="number" placeholder="value" onChange={(e) => setValue(e.target.value)} />
			<input type="date" placeholder="date" onChange={(e) => setDate(e.target.value)} />
			<button onClick={addNewItem}>Add</button>
		</>
	);
};

export default NewItemForm;