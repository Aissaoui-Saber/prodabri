import { useState, useRef, useEffect } from "react";


function RDVjour({ data, readOnly, handleChanges }) {
    const [day, setDay] = useState(data);

    function checkDay(e) {
        let newDay = { ...day };
        newDay.enabled = !newDay.enabled;
        newDay.times.forEach((time, index) => {
            time.enabled = newDay.enabled;
        });
        setDay({ ...newDay });
        handleChanges({ ...newDay });
    }

    function checkTime(e) {
        let newDay = { ...day };
        newDay.times[parseInt(e.target.value)].enabled = !newDay.times[parseInt(e.target.value)].enabled;
        let enabledTimes = newDay.times.filter(time => {return (time.enabled == true)}).length;
        enabledTimes == 0 ? newDay.enabled = false : enabledTimes == 1 ? newDay.enabled = true : newDay.enabled = true;
        setDay({ ...newDay });
        handleChanges({ ...newDay });
    }
    return <div className="step__services__horairesRDV__plages__day">
        <div className="step__services__horairesRDV__plages__day__time">
            <input type="checkbox" name="dayName" value={data.index} checked={day.enabled} onChange={readOnly ? null : checkDay}></input>
            <label htmlFor="dayName">{day.name}</label>
        </div>
        <br></br>
        {
            day.times.map((time, index) => {
                return <div key={index} className="step__services__horairesRDV__plages__day__time">
                    <input type="checkbox" name="time" value={index} checked={time.enabled} onChange={readOnly ? null : checkTime}></input>
                    <label htmlFor="time">{time.time}</label>
                </div>
            })
        }
    </div>
}

export default RDVjour;