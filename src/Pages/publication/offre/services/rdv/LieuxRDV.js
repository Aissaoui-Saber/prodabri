import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, L } from 'react-leaflet';
import pin from './../../../../../Assets/images/icons/filterBar/placeholder.png';
import timePin from './../../../../../Assets/images/icons/time-pin.png';


function LieuxRDV({ data, handleChanges }) {
    const [prodSelected, setProdSelected] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(-1);
    const L = require("leaflet");
    const mapRef = useRef();
    let rdvMarker = L.icon({
        "iconUrl": timePin,
        "iconRetinaUrl": timePin,
        "shadowUrl": require("leaflet/dist/images/marker-shadow.png"),
        "iconSize": [35, 41],
        "iconAnchor": [17, 41],
        "popupAnchor": [1, -34],
        "tooltipAnchor": [16, -28],
        "shadowSize": [47, 41]
    });
    let selectedPointMarker = L.icon({
        "iconUrl": pin,
        "iconRetinaUrl": pin,
        "shadowUrl": require("leaflet/dist/images/marker-shadow.png"),
        "iconSize": [35, 41],
        "iconAnchor": [17, 41],
        "popupAnchor": [1, -34],
        "tooltipAnchor": [16, -28],
        "shadowSize": [47, 41]
    });
    let defaultMarkerIcon = L.icon({
        "iconUrl": require("leaflet/dist/images/marker-icon.png"),
        "iconRetinaUrl": require("leaflet/dist/images/marker-icon-2x.png"),
        "shadowUrl": require("leaflet/dist/images/marker-shadow.png"),
        "iconSize": [25, 41],
        "iconAnchor": [12, 41],
        "popupAnchor": [1, -34],
        "tooltipAnchor": [16, -28],
        "shadowSize": [41, 41]
    });

    useEffect(() => {
        if (mapRef.current !== null) {
            if (data.vente.length > 0) {
                mapRef.current.flyToBounds(data.vente, {
                    padding: L.point(36, 36), animate: true,
                });
            }
        }
    }, [mapRef.current])

    useEffect(() => {
        setSelectedPoint(-1);
        handleChanges(null);
        if (mapRef.current !== null) {
            if (prodSelected) {
                if (data.prod.length > 0) {
                    mapRef.current.flyToBounds(data.prod, {
                        padding: L.point(36, 36), animate: true,
                    });
                }
            } else {
                if (data.vente.length > 0) {
                    mapRef.current.flyToBounds(data.vente, {
                        padding: L.point(36, 36), animate: true,
                    });
                }
            }
        }
    }, [prodSelected])

    return <div className="step__services__lieuxRDV">
        <div className="step__services__lieuxRDV__switch">
            <label className={!prodSelected ? "step__services__lieuxRDV__switch__item step__services__lieuxRDV__switch__item--selected" : "step__services__lieuxRDV__switch__item"} onClick={() => { setProdSelected(false) }}>Lieux de vente ({data.vente.length})</label>
            <label className={prodSelected ? "step__services__lieuxRDV__switch__item step__services__lieuxRDV__switch__item--selected" : "step__services__lieuxRDV__switch__item"} onClick={() => { setProdSelected(true) }}>Lieux de production ({data.prod.length})</label>
        </div>
        <br></br>
        <MapContainer ref={mapRef} center={[36.151988, 4.795080]} zoom={14} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
                url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                prodSelected ? data.prod.map((point, index) => {
                    return <Marker icon={point.id === selectedPoint ? selectedPointMarker : (point.rdv ? rdvMarker : defaultMarkerIcon)} key={index} position={point} eventHandlers={{
                        click: (e) => {
                            if (point.id === selectedPoint) {
                                setSelectedPoint(-1);
                                handleChanges(null);
                            } else {
                                setSelectedPoint(point.id);
                                //const {map} = this.state;
                                mapRef.current.flyTo([point.lat, point.lng]);

                                handleChanges(point)
                            }
                        }
                    }}>
                    </Marker>
                }) :
                    data.vente.map((point, index) => {
                        return <Marker icon={point.id === selectedPoint ? selectedPointMarker : (point.rdv ? rdvMarker : defaultMarkerIcon)} key={index} position={point} eventHandlers={{
                            click: (e) => {
                                if (point.id === selectedPoint) {
                                    setSelectedPoint(-1);
                                    handleChanges(null);
                                } else {
                                    setSelectedPoint(point.id);
                                    mapRef.current.flyTo([point.lat, point.lng]);
                                    handleChanges(point)
                                }
                            }
                        }}>
                        </Marker>
                    })
            }
        </MapContainer>
    </div>
}

export default LieuxRDV;