import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OptionButton from "./OptionButton";

test("Check click foo", () => {
	let testCounter = 0;
	render(<OptionButton onClickHandler={() => testCounter++} />);
	const button = screen.getByTestId("optionbutton");
	fireEvent.click(button);
	expect(testCounter).toBe(1);
});
