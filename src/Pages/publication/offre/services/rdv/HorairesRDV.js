import { useState, useRef, useEffect } from "react";
import functions from '../../../../../Utils/Functions';
import RDVjour from "./RDVjour";


function HorairesRDV({ data, handleChanges }) {
    const [startTime, setStartTime] = useState(data.timeBoundary === null ? "" : data.timeBoundary.begin);
    const [endTime, setEndTime] = useState(data.timeBoundary === null ? "" : data.timeBoundary.end);
    const [duration, setDuration] = useState(data.timeBoundary === null ? "" : data.timeBoundary.duration);
    const [timesTable, setTimesTable] = useState(data.horaires);
    //console.log({startTime: startTime, endTime: endTime, duration: duration, timesTable: timesTable});
    //console.log(point);


    useEffect(() => {
        if (data.timeBoundary === null) {
            setStartTime("");
            setEndTime("");
            setDuration("");
            setTimesTable(null);
        } else {
            setStartTime(data.timeBoundary.begin);
            setEndTime(data.timeBoundary.end);
            setDuration(data.timeBoundary.duration);
            setTimesTable(data.horaires);
        }
    }, [data])

    const rdvStartTimeRef = useRef();
    const rdvEndTimeRef = useRef();
    const rdvDurationRef = useRef();

    function handleInputsChanges(e) {
        if (e.target === rdvStartTimeRef.current) {
            if (e.target.value.length === 3) {
                if (functions.isValidTime(e.target.value)) {
                    setStartTime(e.target.value);
                } else {
                    if (e.target.value[2] === ':') {//<- 12:
                        e.target.value = e.target.value.substring(0, 2);
                        setStartTime(e.target.value);
                    } else {//-> 125
                        let t = e.target.value.substring(2, 3);
                        e.target.value = e.target.value.substring(0, 2) + ":" + t;
                        if (functions.isValidTime(e.target.value)) {
                            setStartTime(e.target.value);
                        }

                    }
                }
            } else {
                if (functions.isValidTime(e.target.value)) {
                    setStartTime(e.target.value);
                }
            }
        }
        if (e.target === rdvEndTimeRef.current) {
            if (e.target.value.length === 3) {
                if (functions.isValidTime(e.target.value)) {
                    setEndTime(e.target.value);
                } else {
                    if (e.target.value[2] === ':') {//<- 12:
                        e.target.value = e.target.value.substring(0, 2);
                        setEndTime(e.target.value);
                    } else {//-> 125
                        let t = e.target.value.substring(2, 3);
                        e.target.value = e.target.value.substring(0, 2) + ":" + t;
                        if (functions.isValidTime(e.target.value)) {
                            setEndTime(e.target.value);
                        }

                    }
                }
            } else {
                if (functions.isValidTime(e.target.value)) {
                    setEndTime(e.target.value);
                }
            }
        }
        if (e.target === rdvDurationRef.current) {
            if (e.target.value.length === 3) {
                if (functions.isValidTime(e.target.value)) {
                    setDuration(e.target.value);
                } else {
                    if (e.target.value[2] === ':') {//<- 12:
                        e.target.value = e.target.value.substring(0, 2);
                        setDuration(e.target.value);
                    } else {//-> 125
                        let t = e.target.value.substring(2, 3);
                        e.target.value = e.target.value.substring(0, 2) + ":" + t;
                        if (functions.isValidTime(e.target.value)) {
                            setDuration(e.target.value);
                        }

                    }
                }
            } else {
                if (functions.isValidTime(e.target.value)) {
                    setDuration(e.target.value);
                }
            }
        }
    }
    function handleInputsBlur(e) {
        if (e.target === rdvStartTimeRef.current) {
            if (e.target.value.length !== 5) {
                setStartTime("");
            } else {
                /*
                if (startTime.length === 5 && endTime.length === 5) {
                    if (functions.timeIsInOrder(startTime, endTime)) {
                        if (duration.length === 5) {
                            //generateTimes();
                        }
                    } else {
                        alert("La période que vous avez saisie n'est pas en ordre, merci de saisire la periode correctement")
                        if (e.target === rdvEndTimeRef.current) {
                            setEndTime("");
                            rdvEndTimeRef.current.focus();
                        } else if (e.target === rdvStartTimeRef.current) {
                            setStartTime("");
                            rdvStartTimeRef.current.focus();
                        } else {

                        }
                    }
                }*/
            }

        } else if (e.target === rdvEndTimeRef.current) {
            if (e.target.value.length !== 5) {
                setEndTime("");
            } else {
                /*
                if (startTime.length === 5 && endTime.length === 5) {
                    if (functions.timeIsInOrder(startTime, endTime)) {
                        if (duration.length === 5) {
                            //generateTimes();
                        }
                    } else {
                        alert("La période que vous avez saisie n'est pas en ordre, merci de saisire la periode correctement")
                        if (e.target === rdvEndTimeRef.current) {
                            setEndTime("");
                            rdvEndTimeRef.current.focus();
                        } else if (e.target === rdvStartTimeRef.current) {
                            setStartTime("");
                            rdvStartTimeRef.current.focus();
                        } else {

                        }
                    }
                }*/
            }
        } else if (e.target === rdvDurationRef.current) {
            if (e.target.value.length !== 5) {
                setDuration("");
            }
        }
    }

    useEffect(() => {
        if (startTime.length === 5 && endTime.length === 5 && duration.length === 5) {
            //if (functions.timeIsInOrder(startTime, endTime)) {
                if (data.horaires === null){
                    let t = generateTimes();
                    setTimesTable([...t]);
                    handleChanges({ horaires: [...t], timeBoundary: { begin: startTime, end: endTime, duration: duration } });

                }
            //}
        } else {
            setTimesTable(null);
            handleChanges({horaires: null, timeBoundary: { begin: startTime, end: endTime, duration: duration } });
        }
    }, [startTime.length, endTime.length, duration.length]);


    function handleDayTimesChanges(data) {
        let newTable = [...timesTable];
        newTable[data.index] = data;
        setTimesTable([...newTable]);
        handleChanges({ horaires: [...newTable], timeBoundary: { begin: startTime, end: endTime, duration: duration } });
    }

    function generateTimes() {
        let times = [
            { enabled: true, name: "SAMEDI", times: [] },
            { enabled: true, name: "DIMANCHE", times: [] },
            { enabled: true, name: "LUNDI", times: [] },
            { enabled: true, name: "MARDI", times: [] },
            { enabled: true, name: "MERCREDI", times: [] },
            { enabled: true, name: "JEUDI", times: [] },
            { enabled: true, name: "VENDREDI", times: [] },
        ];
        times.forEach((day, index) => {
            day.times = [];
            day.times.push({ enabled: true, time: startTime });
            if (functions.timeIsInOrder(startTime, endTime)){
                let somme = functions.timeSomme(day.times[day.times.length - 1].time, duration);
                while(functions.timeIsInOrder(somme, endTime)){
                    day.times.push({ enabled: true, time: somme });
                    somme = functions.timeSomme(day.times[day.times.length - 1].time, duration);
                }
            }else{
                let somme = functions.timeSomme(day.times[day.times.length - 1].time, duration);

                while(functions.timeIsInOrder(somme, "24:00") && functions.timeIsInOrder(day.times[day.times.length - 1].time, somme)){
                    day.times.push({ enabled: true, time: somme });
                    somme = functions.timeSomme(day.times[day.times.length - 1].time, duration);
                }
                while(functions.timeIsInOrder(somme, endTime)){
                    day.times.push({ enabled: true, time: somme });
                    somme = functions.timeSomme(day.times[day.times.length - 1].time, duration);
                }
            }
        });
        return times;
    }

    return <div className="step__services__horairesRDV">
        <div className="step__services__horairesRDV__params">
            <label>Heure de début</label>
            <label>Heure de fin</label>
            <label>Durrée entre les rendez vous</label>
            <input ref={rdvStartTimeRef} className="input__text services__horairesRDV__input__text" type="text" placeholder="00:00" key={1} value={startTime} onChange={handleInputsChanges} onBlur={handleInputsBlur}></input>
            <input ref={rdvEndTimeRef} className="input__text services__horairesRDV__input__text" type="text" placeholder="00:00" key={2} value={endTime} onChange={handleInputsChanges} onBlur={handleInputsBlur}></input>
            <input ref={rdvDurationRef} className="input__text services__horairesRDV__input__text" type="text" placeholder="00:00" key={3} value={duration} onChange={handleInputsChanges} onBlur={handleInputsBlur}></input>
        </div>
        <br></br>
        <hr style={{ width: "80%", margin: "auto" }}></hr>
        <br></br>
        <div className="step__services__horairesRDV__plages">
            {
                timesTable?.map((element, index) => {
                    return <RDVjour key={index} data={{ ...element, index: index }} handleChanges={handleDayTimesChanges}></RDVjour>
                })
            }

        </div>
    </div>
}

export default HorairesRDV;