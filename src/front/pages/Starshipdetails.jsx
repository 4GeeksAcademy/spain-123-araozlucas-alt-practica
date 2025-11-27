import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import noImage from "../assets/img/StarWars.png";

export const Starshipdetails = props => {
    
    const { store } = useGlobalReducer()
    const { theId} = useParams()
    const navigate = useNavigate()

    const starshipFromStore = store.currentStarship;
    const starship = store.currentStarship?.uid
        ? starshipFromStore
        : JSON.parse(localStorage.getItem('currentStarship'));

    const [ details, setDetails] = useState(null)
    const [ date, setDate] = useState()

    const starshipInfo = async() => {
        
        if(details) return;
        if (!starship.name || !starship.uid) return;

        const url = starship.url || `https://swapi.tech/api/planets/${starship.uid}`

        const cachedDetails = localStorage.getItem(`starshipDetails_${theId}`);
        if (cachedDetails) {
            console.log("Usando datos cache");
            const parsed = JSON.parse(cachedDetails);
            setDetails(parsed);
            setDate(parsed.edited);
            return;
        }

        const response = await fetch (starship.url)
        if (!response.ok) {
            console.log('Error', response.status, response.statusText);
            return
        }
        const data = await response.json()
        console.log(data.result.properties);
        setDetails(data.result.properties);
        setDate(data.result.properties.edited);
        localStorage.setItem(`starshipDetails_${theId}`,JSON.stringify(data.result.properties));
    }
    
    useEffect (() => {
        setDetails();
        starshipInfo()
    },[theId]);

    if ( !starship || !starship.uid) {
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
        navigate(`/starships`)
    }

    return (
        <div className="p-5 mb-3 bg-black rounded-3">
            <div className="container-fluid py-5 text-light">
                <div className="card mb-4 bg-black text-light border-secondary">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img 
                                src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/starships/${starship.uid}.jpg`}
                                onError={(e) => (e.target.src = noImage)} className="img-fluid rounded-start" alt={starship.name} style={{ objectFit: "cover", height: "100%" }}
                            />
                        </div>

                        <div className="col-md-8">
                            <div className="card-body me-5">
                                <h1 className="card-title text-warning mt-5 mb-5">{starship.name}</h1>

                                <p>{details.model}</p>
                                <p>{details.manufacturer}</p>
                                <p>{details.starship_class}</p>
                              
                                <h5 className="card-title text-secondary mt-5">Attributes</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item bg-black text-light">Crew: {details.crew}</li>
                                    <li className="list-group-item bg-black text-light">Passengers: {details.passengers}</li>
                                    <li className="list-group-item bg-black text-light">Length: {details.length}</li>
                                    <li className="list-group-item bg-black text-light">Consumables: {details.consumables} km</li>
                                    <li className="list-group-item bg-black text-light">Cargo Capacity: {details.cargo_capacity}</li>
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