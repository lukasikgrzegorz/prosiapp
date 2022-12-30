import React from "react";
import css from "./OptionButton.module.css";

const OptionButton = ({ option, onClickHandler }) => {
	let styleHandler = null;

	switch (option) {
		case "add":
			styleHandler = "button-add";
			break;
		case "logout":
			styleHandler = "button-logout";
			break;
		case "close":
			styleHandler = "button-close";
			break;
		case "categories":
			styleHandler = "button-categories";
			break;
		case "search":
			styleHandler = "button-search";
			break;
		case "delete":
			styleHandler = "button-delete";
			break;
	}

	return (
		<button
			data-testid="optionbutton"
			onClick={onClickHandler}
			className={css[styleHandler]}
		></button>
	);
};

export default OptionButton;
