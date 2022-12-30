import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CurrentBalance from "./CurrentBalance";

test("Chcek floted value", () => {
	render(<CurrentBalance value={7.654321} />);
	const currentValue = screen.getByTestId("currentbalancevalue");
	expect(currentValue).toHaveTextContent("7.65");
});
