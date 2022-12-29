import css from "./Statistics.module.css";

const Statistics = ({ data }) => {
	const startValue = data[data.length - 1].before;
	const finishValue = data[0].after;
	const dateStart = data[data.length - 1].date;
	const dateEnd = data[0].date;
	let dateRange = null;
	dateStart.slice(0, 10) === dateEnd.slice(0, 10)
		? (dateRange = dateStart.slice(0, 10))
		: (dateRange = `${dateStart.slice(0, 10)} - ${dateEnd.slice(0, 10)}`);

	const categories = data
		.map((item) => item.category)
		.filter((item, index, array) => array.indexOf(item) === index);

	const balanceWithCategory = categories.map((category) => {
		const sum = data
			.filter((index) => index.category === category)
			.reduce((acc, index) => acc + index.value, 0);
		return { category: category, value: sum };
	});

	return (
		<div className={css["wrapper"]}>
			<p className={css["title"]}>Statistics</p>
			<ul className={css["list"]}>
				<li className={css["item"]}>
					Range: <span>{dateRange}</span>
				</li>
				<li className={css["item"]}>
					Start value: <span>{startValue.toFixed(2)}</span>
				</li>
				<li className={css["item"]}>
					Finish value: <span>{finishValue.toFixed(2)}</span>
				</li>
				<li className={css["item"]}>
					Balance: <span>{-1 * (startValue - finishValue).toFixed(2)}</span>
				</li>
			</ul>

			<p className={css["subtitle"]}>By categories:</p>
			<ul className={css["list"]}>
				{balanceWithCategory.map((item, index) => {
					return (
						<li key={index} className={css["item"]}>
							{item.category}: <span>{item.value.toFixed(2)}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Statistics;
