import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

test(`Check text contest`, () => {
	render(<Button value={"test"} />);
	const button = screen.getByTestId("button");
	expect(button).toHaveTextContent("test");
});

test("Check click foo", () => {
	let testCounter = 0;
	render(<Button onClickHandler={() => testCounter++} />);
	const button = screen.getByTestId("button");
	fireEvent.click(button);
	expect(testCounter).toBe(1);
});
