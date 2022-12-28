import css from "./Statistics.module.css";

const Statistics = ({ data }) => {
	const startValue = data[data.length - 1].before;
	const finishValue = data[0].after;

	const categories = data
		.map((item) => item.category)
		.filter((item, index, array) => array.indexOf(item) === index);

	console.log(categories);

	const balanceWithCategory = categories.map((category) => {
		const sum = data
			.filter((index) => index.category === category)
			.reduce((acc, index) => acc + index.value, 0);

		return { category: category, value: sum };
	});

	console.log(balanceWithCategory);

	return (
		<div className={css["wrapper"]}>
			<h2 className={css["title"]}>Statistics:</h2>
			<p>Start value: {startValue.toFixed(2)}</p>
			<p>Finish value: {finishValue.toFixed(2)}</p>
			<p>Balance: {-1 * (startValue - finishValue).toFixed(2)} </p>

      <h3 className={css["subtitle"]}>By categories:</h3>
			<ul>
				{balanceWithCategory.map((item, index) => {
					return (
						<li key={index}>
							{item.category}: {item.value.toFixed(2)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Statistics;
