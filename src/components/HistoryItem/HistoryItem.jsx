import React from "react";
import css from "./HistoryItem.module.css";

const HisotryItem = ({ data }) => {
	return (
		<li className={data.value > 0 ? css["item-income"] : css["item-cost"]}>
			<div className={css["data-holder"]}>
				<p className={css["title"]}>{data.title}</p>
				<p className={css["data"]}>{data.category}</p>
				<p className={css["data"]} data-testid="date">{data.date.slice(0, 10)}</p>
			</div>
			<div className={css["value"]}>{data.value.toFixed(2)}</div>
		</li>
	);
};

export default HisotryItem;
