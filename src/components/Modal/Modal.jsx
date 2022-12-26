import css from "./Modal.module.css";

const Modal = ({ children }) => {
	return <div className={css["backdrop"]}>{children}</div>;
};

export default Modal;
