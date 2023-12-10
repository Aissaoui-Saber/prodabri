import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import CheckBox from "./CheckBox";


test.skip("testing checkbox component", () => {
    let checkValue = undefined;
    render(<CheckBox id={2} label={"CB1"} isChecked={undefined} onClick={(data) => { checkValue = data }} />);
    const linkElement = screen.getByTestId("CB");
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement.childNodes[0]);
    expect(checkValue.check).toBe(true);
    fireEvent.click(linkElement.childNodes[0]);
    expect(checkValue.check).toBe(false);
    fireEvent.click(linkElement.childNodes[0]);
    expect(checkValue.check).toBe(true);
});


/*
test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click Me</Button>)
  fireEvent.click(screen.getByText(/click me/i))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
*/