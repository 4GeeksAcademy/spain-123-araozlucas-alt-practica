import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const Planetdetails = props => {

    const { store, dispatch} = useGlobalReducer()
    const { theId } = useParams()
    const navigate = useNavigate()

    const planetFromStore = store.currentPlanet;
    const planet = store.currentPlanet?.uid
        ? planetFromStore
        : JSON.parse(localStorage.getItem('currentPlanet'));

    const [ details, setDetails ] = useState(null);
    const [ date, setDate ] = useState();

    const planetInfo = async() => {
        
        if (details) return;
        if ( !planet.name || !planet.uid) return;

        const url = planet.url || `https://swapi.tech/api/planets/${planet.uid}`

        const cachedDetails = localStorage.getItem(`planetDetails_${theId}`);
        if (cachedDetails) {
            console.log("Usando datos cache");
            const parsed = JSON.parse(cachedDetails);
            setDetails(parsed);
            setDate(parsed.edited);
            return;
        }

        const response = await fetch (planet.url);
        if (!response.ok) {
            console.log('Error', response.status, response.statusText);
            return
        }
        const data  = await response.json()
        console.log(data.result.properties);
        setDetails(data.result.properties);
        setDate(data.result.properties.edited);
        localStorage.setItem(JSON.stringify(`planetDetails_${theId}`,data.result.properties));
    }

    useEffect (() => {
        setDetails();
        planetInfo()
    },[theId])

    if ( !planet || !planet.uid) {
        return <h2 className="text-light text-center mt-5">Loading character...</h2>;
    }

    if (!details) {
        return (
        <div className="d-flex align-items-center justify-content-center mt-5 mb-5">
            <div className="spinner-border text-warning me-5" role="status">
                <span className="visually-hidden"></span>
            </div>
            <h2 className="text-light text-center mt-1">Loading details...</h2>;
        </div>
        )
    }

    const iso = date
    const dateFormatted = new Date(iso)

    const formatted = 
        dateFormatted.getDate().toString().padStart(2, '0') + '/' +
        (dateFormatted.getMonth() + 1).toString().padStart(2, '0') + '/' +
        dateFormatted.getFullYear();

    const handleBack = () => {
        navigate(`/planets`);
    }

    return (
        <div className="p-5 mb-3 bg-black rounded-3">
            <div className="container-fluid py-5 text-light">
                <div className="card mb-4 bg-black text-light border-secondary">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img 
                                src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/planets/1.jpg`}
                                className="img-fluid rounded-start" alt={planet.name} style={{ objectFit: "cover", height: "100%" }}
                            />
                        </div>

                        <div className="col-md-8">
                            <div className="card-body me-5">
                                <h1 className="card-title text-warning mt-5 mb-5">{planet.name}</h1>

                                <p>Orbital Period: {details.orbital_period} days</p>
                                <p>Rotational Period: {details.rotation_period} hours</p>
                              
                                <h5 className="card-title text-secondary mt-5">Attributes</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item bg-black text-light">Diameter: {details.diameter} km</li>
                                    <li className="list-group-item bg-black text-light">Gravity: {details.gravity}</li>
                                    <li className="list-group-item bg-black text-light">Climate: {details.climate}</li>
                                    <li className="list-group-item bg-black text-light">Surface Water: {details.surface_water}</li>
                                    <li className="list-group-item bg-black text-light">Terrain: {details.terrain}</li>
                                </ul>

                                <p className="mt-4 text-secondary text-end">
                                    <small>Last edited {formatted}</small>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="d-flex justify-content-end gap-3 mt-3">
                    <button onClick={handleBack} className="btn btn-secondary">Go back</button>
                </div>

            </div>
        </div>  
    );
}