import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HisotryItem from "./HistoryItem";

test("Check date format", () => {
	render(<HisotryItem data={{ date: "12-12-2012T00:00", value: 0 }}></HisotryItem>);
	const currentDate = screen.getByTestId("date");
	expect(currentDate).toHaveTextContent("12-12-2012");
});
