import { useActionData, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const Characterdetails = props => {

    const { store, dispatch } = useGlobalReducer()
    const { theId } = useParams()
    const navigate = useNavigate()
    
    const characterFromStore = store.currentCharacter;
    const character = store.currentCharacter?.uid
        ? characterFromStore 
        : JSON.parse(localStorage.getItem("currentCharacter"));

    const [details, setDetails] = useState(null);
    const [date, setDate] = useState('');
    const [planetName, setPlanetName] = useState('');

    const characterInfo = async() => {
        
        if (details) return;
        if (!character || !character.uid) return;

        const url = character.url || `https://www.swapi.tech/api/people/${character.uid}`;

        const cachedDetails = localStorage.getItem(`characterDetails_${theId}`);
        if (cachedDetails) {
            console.log("Usando datos cache");
            const parsed = JSON.parse(cachedDetails);
            setDetails(parsed);
            setDate(parsed.edited);
            fetchPlanet(parsed.homeworld)
            return;
        }
        
        const response = await fetch (character.url)
        if (!response.ok) {
            console.log('Error', response.status, response.statusText);
            return
        }
        const data = await response.json()
        console.log(data.result.properties);
        setDetails(data.result.properties)
        setDate(data.result.properties.edited);
        fetchPlanet(data.result.properties.homeworld);
        localStorage.setItem(`characterDetails_${theId}`, JSON.stringify(data.result.properties))
    }

    const fetchPlanet = async(url) => {
        if (!url) return;
        const response = await fetch (url);
        if(!response.ok) return console.log('Error planeta');
        
        const data = await response.json()
        setPlanetName(data.result.properties.name || "Unknown")
    } 

    useEffect (() => {
        setDetails();
        characterInfo()
    },[theId])

    if (!character || !character.uid) {
        return <h2 className="text-light text-center mt-5">Loading character...</h2>;
    }

    if (!details) {
        return <h2 className="text-light text-center mt-5">Loading details...</h2>;
    }
    
    const iso = date
    const dateFormatted = new Date(iso);

    const formatted = 
        dateFormatted.getDate().toString().padStart(2, '0') + '/' +
        (dateFormatted.getMonth() + 1).toString().padStart(2, '0') + '/' +
        dateFormatted.getFullYear();

    const handleBack = () => {
        navigate(`/characters`)
    }

    return (
        <div className="p-5 mb-3 bg-black rounded-3">
            <div className="container-fluid py-5 text-light">
             
             <div className="card mb-4 bg-black text-light border-secondary">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img 
                            src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${character.uid}.jpg`}
                            className="img-fluid rounded-start" alt={character.name} style={{ objectFit: "cover", height: "100%" }}
                        />
                    </div>

                    <div className="col-md-8">
                        <div className="card-body me-5">
                            <h1 className="card-title text-warning mt-5 mb-5">{character.name}</h1>

                            <p>Date of Birth: {details.birth_year}</p>
                            <p>Homeworld: {planetName}</p>
                            
                            <h5 className="card-title text-secondary mt-5">Attributes</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item bg-black text-light">Gender: {details.gender}</li>
                                <li className="list-group-item bg-black text-light">Height: {details.height} cm</li>
                                <li className="list-group-item bg-black text-light">Mass: {details.mass} kg</li>
                                <li className="list-group-item bg-black text-light">Hair color: {details.hair_color}</li>
                                <li className="list-group-item bg-black text-light">Eye color: {details.eye_color}</li>
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
        
        
    )
}