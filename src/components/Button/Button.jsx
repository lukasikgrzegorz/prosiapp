import css from "./Button.module.css";

const Button = ({ value, onClickHandler }) => {
	return (
		<button onClick={onClickHandler} className={css["button"]}>
			{value}
		</button>
	);
};

export default Button;
