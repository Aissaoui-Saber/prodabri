import { createContext, useState } from "react";
import cities from "./Utils/Villes";

import SelectCities from "./Components/filterBar/SelectCities/SelectCities";

let inputData = {

}


function Test() {
    const [values, setValues] = useState(cities.DEFAULT_UNSELECTED_VILLES);
    console.log(values);

    function updateValues(index, data) {
        let tempValues = [...values];
        tempValues[index] = data;
        setValues(tempValues);
    }

    return <div style={{ padding: "2rem" }}>
        <h1>Components Testing page</h1>
        <br></br>
        <br></br>
        <SelectCities title={"Hello"} readOnly={false}></SelectCities>
        <br></br>
        <br></br>
        <br></br>
        <button value={"click"} onClick={() => { setValues(cities.DEFAULT_SELECTED_VILLES) }}>Click</button>
    </div >
}

export default Test;