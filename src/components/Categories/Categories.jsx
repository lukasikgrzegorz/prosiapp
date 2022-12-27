import css from "./Categories.module.css";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { db } from "../../services/firebase";
import { getUserID, getCategories } from "../../redux/selectors";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import OptionButton from "../OptionButton/OptionButton";

const Categories = ({ onClose }) => {
	const [newCategory, setNewCategory] = useState(null);
	const userID = useSelector(getUserID);
	const inputNewCategoryRef = useRef();
	const categories = useSelector(getCategories);

	const clearInput = () => {
		inputNewCategoryRef.current.value = "";
		setNewCategory(null);
	};

	const addNewCategory = async () => {
		console.log("Test");
		if (newCategory) {
			try {
				const docRef = await addDoc(collection(db, `${userID}-categories`), {
					name: newCategory,
				});
				console.log("Document written with ID: ", docRef.id);
			} catch (e) {
				console.error("Error adding document: ", e);
			} finally {
				clearInput();
				onClose();
			}
		} else {
			console.log("Puste pola!");
		}
	};

	const deleteCategory = async (id) => {
		try {
			await deleteDoc(doc(db, `${userID}-categories`, id));
			console.log("Document deleted");
		} catch (e) {
			console.error("Error adding document: ", e);
		} finally {
			clearInput();
			onClose();
		}
	};

	return (
		<div className={css["wrapper"]}>
			<OptionButton option="close" onClickHandler={onClose} />
			<h3>Your Categories:</h3>
			<ul className={css["list"]}>
				<li className={css["item"]}>General</li>
				{categories.map((category) => {
					return (
						<li className={css["item"]} key={category.id}>
							{category.name}
							<OptionButton
								option="delete"
								onClickHandler={() => {
									deleteCategory(category.id);
								}}
							/>
						</li>
					);
				})}
			</ul>
			<input
				ref={inputNewCategoryRef}
				type="text"
				placeholder="Category name"
				onChange={(e) => setNewCategory(e.target.value)}
			></input>
			<Button value="Add" onClickHandler={addNewCategory} />
		</div>
	);
};

export default Categories;
