import { useState, useRef, useEffect } from "react";
import Condition from "../Condition";
import LieuxRDV from "./LieuxRDV";
import HorairesRDV from "./HorairesRDV";
import Motif from "./Motif";

function mapLieuxRDVpositions(data, rdv) {
    let prodPoints = [];
    data.lieuxProduction.forEach(city => {
        city.points.forEach(point => {
            let t = rdv.find((p) => { return p.point.id === point.id });
            prodPoints.push({ ...point, rdv: !(t === undefined) });
        })
    });
    let ventePoints = [];
    data.lieuxVente.lieux.forEach(city => {
        city.points.forEach(point => {
            let f = rdv.find((p) => { return p.point.id === point.point.id });
            ventePoints.push({ ...point.point, rdv: !(f === undefined) });
        })
    });
    return ({ prod: prodPoints, vente: ventePoints });
}

function RDV({ data, handleChanges, points }) {
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [timeBoundary, setTimeBoundary] = useState(null);
    const [horaires, setHoraires] = useState(null);
    const [motifs, setMotifs] = useState([]);
    const [conditions, setConditions] = useState([]);

    const horairesRef = useRef();

    const [id, setId] = useState(0);

    useEffect(() => {
        setId(id + 1);
    }, [motifs.length, conditions.length]);

    useEffect(e => {
        handleChanges({
            point: selectedPoint,
            timeBoundary: timeBoundary,
            horaires: horaires,
            motifs: motifs,
            conditions: conditions
        })
    }, [selectedPoint, horaires, motifs, conditions]);

    function handlePositionClick(point) {
        setSelectedPoint(point);
        let temp = data.find(rdv => { return point?.id === rdv.point.id });
        if (temp !== undefined) {
            setHoraires(temp.horaires);
            setTimeBoundary(temp.timeBoundary);
            setMotifs(temp.motifs);
            setConditions(temp.conditions);
        } else {
            setHoraires(null);
            setTimeBoundary(null);
            setMotifs([]);
            setConditions([]);
        }
    }

    function handleTimesChanges(t) {
        //handleChanges(t);
        setHoraires(t.horaires);
        setTimeBoundary(t.timeBoundary);
    }

    function addMotif() {
        let temp = motifs.filter(t => { return t.value.length === 0 });
        if (temp.length === 0) {
            setMotifs([...motifs, { id: id, value: "" }]);
        }
    }
    function handleMotifChanges(data) {
        let temp = motifs.map(t => {
            if (t.id == data.id) {
                return data;
            }
            return t;
        })
        setMotifs([...temp]);
    }
    function handleMotifRemove(data) {
        let temp = [...motifs];
        let newMotifs = temp.filter(t => { return t.id !== data });
        setMotifs(newMotifs);
    }


    function addCondition() {
        let temp = conditions.filter(t => { return t.value.length === 0 });
        if (temp.length === 0) {
            setConditions([...conditions, { id: id, value: "" }]);
        }
    }
    function handleConditionChanges(data) {
        let temp = conditions.map(t => {
            if (t.id == data.id) {
                return data;
            }
            return t;
        })
        setConditions([...temp]);
    }
    function handleConditionRemove(data) {
        let temp = [...conditions];
        let newConditions = temp.filter(t => { return t.id !== data });
        setConditions(newConditions);
    }


    return <div className="step__services__commande">
        <div>
            <h1 className="step__subTitle">1. Lieux</h1>
            <LieuxRDV data={mapLieuxRDVpositions(points, data)} handleChanges={handlePositionClick}></LieuxRDV>
            <br></br>
            <h1 ref={horairesRef} className="step__subTitle">2. Horaires</h1>
            {selectedPoint === null ? <p className="step__paragraph">Selectionner d'abord un lieu</p> : <HorairesRDV data={{ horaires: horaires, timeBoundary: timeBoundary }} handleChanges={handleTimesChanges}></HorairesRDV>}
            <br></br>
            <h1 className="step__subTitle">3. Motifs</h1>
            {
                motifs?.map((motif, index) => {
                    return <Motif key={motif.id} data={motif} handleChanges={handleMotifChanges} handleRemove={handleMotifRemove}></Motif>
                })
            }
            {
                horaires === null ? "" : <input type="button" value={"Ajouter"} className="button button--green step__services__ajouter" onClick={addMotif}></input>
            }
            <br></br>
            <h1 className="step__subTitle">4. Règles et conditions</h1>
            {
                conditions?.map((cond, index) => {
                    return <Condition key={cond.id} data={cond} handleChanges={handleConditionChanges} handleRemove={handleConditionRemove}></Condition>
                })
            }
            {
                horaires === null ? "" : <input type="button" value={"Ajouter"} className="button button--green step__services__ajouter" onClick={addCondition}></input>
            }
        </div>
    </div>
}

export default RDV;