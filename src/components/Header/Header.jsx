import css from "./Header.module.css";
import OptionButton from "../OptionButton/OptionButton";
import { useSelector } from "react-redux";
import { getUserEmail } from "../../redux/selectors";

const Header = ({ categories, logout }) => {
	const userEmail = useSelector(getUserEmail);
	return (
		<header className={css["container"]}>
			<div className={css["wrapper"]}>
				<div>
					<OptionButton option="categories" onClickHandler={categories}></OptionButton>
				</div>
				<div className={css["user"]}>
					<div>{userEmail}</div>
					<div>
						<OptionButton option="logout" onClickHandler={logout} />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
