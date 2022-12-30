import { useEffect } from "react";
import css from "./Modal.module.css";

const Modal = ({ children, escHandler }) => {
	useEffect(() => {
		document.addEventListener("keydown", escHandler);
		return () => {
			document.removeEventListener("keydown", escHandler);
		};
	}, [escHandler]);

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
