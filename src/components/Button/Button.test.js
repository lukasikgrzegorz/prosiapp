import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button";

//test block
test("increments counter", () => {
	// render the component on virtual dom
	render(<Button />);

	// // //select the elements you want to interact with
	// const button = screen.getByTestId("button");
	// // const incrementBtn = screen.getByTestId("increment");

	// // //interact with those elements
	// // fireEvent.click(incrementBtn);

	// //assert the expected result
	// expect(button).toHaveTextContent("Test");
});
