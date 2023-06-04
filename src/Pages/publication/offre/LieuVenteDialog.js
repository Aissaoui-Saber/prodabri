import dialogPolyfill from "dialog-polyfill";
import { useEffect, useRef, useState } from "react";
import remove from '../../../Assets/images/delete.png';
import functions from '../../../Utils/Functions';
import '../offre/LieuVenteDialog.css';


function PeriodCreation({ handleChanges, data }) {
    const [periods, setPeriods] = useState(data.periods);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [inputsVisible, setInputVisible] = useState(false);
    const startRef = useRef();
    const endRef = useRef();
    let inputs = [
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <label className="period__form__label">Début</label>
            <input ref={startRef} type="text" placeholder="00:00" className="input__text period__time__input" value={startTime} onInput={handleInputChanges} onBlur={handleInputBlur}></input>
        </div>,
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <label className="period__form__label">Fin</label>
            <input ref={endRef} type="text" placeholder="00:00" className="input__text period__time__input" value={endTime} onInput={handleInputChanges} onBlur={handleInputBlur}></input>
        </div>
    ];
    function showHideInputs() {
        if (inputsVisible) {
            if (functions.timeIsInOrder(startTime, endTime)) {
                let periodValid = 0;
                for (let i = 0; i < data.periods.length; i++) {
                    if (functions.periodsAreIntersected(data.periods[i], { id: null, start: startTime, end: endTime })) {
                        break;
                    } else {
                        if (functions.periodsAreIntersected({ id: null, start: startTime, end: endTime }, data.periods[i])) {
                            break;
                        } else {
                            periodValid++;
                        }
                    }
                }
                if (periodValid == data.periods.length) {

                    setPeriods([...data.periods, { id: null, start: startTime, end: endTime }]);
                    handleChanges({ day: data.day, periods: [...data.periods, { id: null, start: startTime, end: endTime }] });
                    setStartTime("");
                    setEndTime("");
                    periodValid = 0;
                    setInputVisible(false);
                } else {
                    alert("la periode que vous avez saisie n'est pas en ordre avec les autres periodes");
                }
            } else {
                alert("la periode que vous avez saisie n'est pas dans l'ordre");
            }
        } else {
            setInputVisible(true);
        }
    }

    useEffect(e=>{
        if (inputsVisible){
            startRef.current.focus();
        }
        
    },[inputsVisible])

    function handleInputChanges(e) {
        if (e.target === startRef.current) {
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

        } else {
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
    }

    function handleInputBlur(e){
        if (startRef.current.value.length == 0 && endRef.current.value.length == 0){
            setInputVisible(false);
        }
    }

    return <div className="period__form">
        {inputsVisible ? inputs : ""}
        <label className="period__form__add" onClick={() => { showHideInputs() }}>AJOUTER</label>
    </div>
}

function LieuVenteDialog({handleChanges}) {
    const [times, setTimes] = useState([[],[],[],[],[],[],[]]);
    const daysNames_fr = ["Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
    let [id, setID] = useState(0);
    const nomRef = useRef();
    const dialog = useRef();

    useEffect(e => {
        if (!dialog.current.open) {
            dialogPolyfill.registerDialog(dialog.current);
            dialog.current.showModal();
        }
    }, [dialog]);

    function deletePeriod(id) {
        let temp = [];
        times.forEach(function (day) {
            temp.push(day.filter((obj) => obj.id !== id));
        })
        setTimes([...temp]);
    }

    function addPeriod(data) {
        data.periods[data.periods.length-1].id = id;
        setID(id+1);
        let temp = [];
        times.forEach((day,index)=> {
            if (index == data.day){
                temp.push([...functions.sortPeriods(data.periods)]);
            }else{
                temp.push([...day]);
            }
        });
        setTimes(temp);
    }

    function closeDialog(){
        //handleChanges({nom:nomRef.current.value, horaires: times});
        dialog.current.close();
    }


    return <dialog ref={dialog} className="dialog">
        <h1 className="step__title">Informations du lieu</h1>
        <br></br>
        <input ref={nomRef} type="text" placeholder="Nom du site" className="input__text step__input__text" style={{ width: "100%" }}></input>
        <br></br>
        <br></br>
        <h1 className="step__title">Heures de disponibilité</h1>
        <br></br>
        {
            times.map((day, index) => {

                return <>
                    <div className="dialog__day">
                        <label className="dialog__day__name">{daysNames_fr[index]}</label>
                        <div className="dialog__day__periods">
                            {
                                day.map(period => {
                                    return <div className="dialog__day__period">
                                        <label className="dialog__day__periods__value">{period.start + " - " + period.end}</label>
                                        <img className="step__details__links__link__delete dialog__day__period__remove" src={remove} onClick={() => { deletePeriod(period.id) }}></img>
                                    </div>
                                })
                            }
                            <PeriodCreation data={{ day: index, periods: day }} handleChanges={addPeriod}></PeriodCreation>
                        </div>
                    </div>
                    <hr />
                </>
            })
        }
        <br></br>
        <input type="button" className="button--green dialog__valider" value={"Valider"} onClick={closeDialog} ></input>
    </dialog>
}

export default LieuVenteDialog;