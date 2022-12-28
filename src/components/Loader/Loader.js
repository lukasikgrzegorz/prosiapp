import React from "react";
import { Rings } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
	return (
		<div className={css["loader"]}>
			<Rings
				height="80"
				width="80"
				color="#41377C"
				radius="6"
				visible={true}
				ariaLabel="rings-loading"
			/>
		</div>
	);
};

export default Loader;
