import css from "./CurrentBalance.module.css";

const CurrentBalance = ({ value }) => {
	return (
		<div className={css["wrapper"]}>
			<p className={css["title"]}>Current balance</p>
			<p className={css["value"]}>{value.toFixed(2)}</p>
		</div>
	);
};

export default CurrentBalance;
