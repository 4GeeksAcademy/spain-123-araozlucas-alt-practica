import { useActionData, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const Characterdetails = props => {

    const { store, dispatch } = useGlobalReducer()
    const { theId } = useParams()
    
    const characterFromStore = store.currentCharacter;
    const character = store.currentCharacter?.uid
        ? characterFromStore 
        : JSON.parse(localStorage.getItem("currentCharacter"));

    const [details, setDetails] = useState(null);

    const characterInfo = async() => {
        
        if (details) return;
        if (!character || !character.uid) return;

        const url = character.url || `https//www.swapi.tech/api/people/${character.uid}`;

        const cachedDetails = localStorage.getItem(`characterDetails_${theId}`);
        if (cachedDetails) {
            console.log("Usando datos cache");
            setDetails(JSON.parse(cachedDetails));
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
        localStorage.setItem(`characterDetails_${theId}`, JSON.stringify(data.result.properties))
    }

    useEffect (() => {
        characterInfo()
    },[theId])

    if (!character || !character.uid) {
        return <h2 className="text-light text-center mt-5">Loading character...</h2>;
    }

    if (!details) {
        return <h2 className="text-light text-center mt-5">Loading details...</h2>;
    }
    
    

    return (
        <div>
            <div className="p-5 mb-3 bg-black rounded-3">
                <div className="container-fluid py-5 text-light">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${character.uid}.jpg`}
                                className="card-img-top" alt={character.name} style={{height: "100%", objectFit:"cover"}} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{character.name}</h5>
                                    <p className="card-text">Gender: {details.gender}</p>
                                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-secondary btn-lg" type="button">Button</button>
                </div>
            </div>

        </div>
    )
}