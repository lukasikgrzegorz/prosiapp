import logo from "./logo.svg";
import css from "./Logo.module.css";

const Logo = () => {
	return (
		<div className={css["wrapper"]}>
			<div className={css["image-wrapper"]}>
				<img className={css["image"]} src={logo} />
			</div>
			<h2 className={css["title"]}>
				Prosi<span className={css["accent"]}>APP</span>
			</h2>
		</div>
	);
};

export default Logo;
