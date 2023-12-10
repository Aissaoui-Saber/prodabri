import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import Tree from "./Tree";


let testingData = {
    id: 1,
    label: "Parent checkbox",
    children: [
        { id: 1, name: "checkbox 1" },
        { id: 2, name: "checkbox 2" },
        { id: 3, name: "checkbox 3" },
        { id: 4, name: "checkbox 4" },
        { id: 5, name: "checkbox 5" }
    ],
    values: [0, 0, 0, 0, 0],
    readOnly: false,
}

test("testing tree component", () => {
    let returnData = undefined;
    render(<Tree id={testingData.id} label={testingData.label} children={testingData.children} values={testingData.values} onChange={(data) => { returnData = data}} readOnly={testingData.readOnly}/>);
    const linkElement = screen.getByTestId("parent_checkbox");
    expect(linkElement).toBeInTheDocument();
    const parentCheckbox = linkElement.children[0].children[0];
    //parent check
    fireEvent.click(parentCheckbox);
    expect(returnData).toStrictEqual([1,1,1,1,1]);
    //parent uncheck
    fireEvent.click(parentCheckbox);
    expect(returnData).toStrictEqual([0,0,0,0,0]);

    const childrenCheckboxes = [];
    childrenCheckboxes.push(screen.getByText("checkbox 1").parentNode.children[0]);
    childrenCheckboxes.push(screen.getByText("checkbox 2").parentNode.children[0]);
    childrenCheckboxes.push(screen.getByText("checkbox 3").parentNode.children[0]);
    childrenCheckboxes.push(screen.getByText("checkbox 4").parentNode.children[0]);
    childrenCheckboxes.push(screen.getByText("checkbox 5").parentNode.children[0]);

    fireEvent.click(childrenCheckboxes[0]);
    expect(returnData).toStrictEqual([1,0,0,0,0]);
    fireEvent.click(childrenCheckboxes[4]);
    expect(returnData).toStrictEqual([1,0,0,0,1]);
});

