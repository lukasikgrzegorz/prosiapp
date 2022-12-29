import css from "./EmptyContainer.module.css";

const EmptyContainer = () => {
	return <div className={css["wrapper"]}>No search results. Add new items or change queries.</div>;
};

export default EmptyContainer;
