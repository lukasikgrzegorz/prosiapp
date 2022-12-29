import { useEffect } from "react";
import css from "./Modal.module.css";

const Modal = ({ children }) => {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	return (
		<div className={css["backdrop"]}>
			<div className={css["holder"]}>{children}</div>
		</div>
	);
};

export default Modal;
