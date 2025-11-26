// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect } from "react";

export const Characters = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate();

  const getCharacters = async() => {
    const cached = localStorage.getItem("characters");
    if (cached) {
      console.log("Usando datos localStorage");
      dispatch({
        type: "setCharacters",
        payload: JSON.parse(cached)
      });
      return;
    }

    const response = await fetch(`https://swapi.tech/api/people`);
    if (!response.ok) {
      console.log('Error', response.status, response.statusText);
      return
    }
    const data = await response.json()
    console.log(data.results);
    dispatch({
      type:"setCharacters",
      payload: data.results
    });
    
    localStorage.setItem("characters", JSON.stringify(data.results))
  };

  useEffect (() => {
    getCharacters()
  },[]);

  const handleDetails = (character) => {
    dispatch({
      type: "setCurrentCharacter",
      payload: character
    });
    
    navigate(`/characterdetails/${character.uid}`)
    
  }



  return (
     <div className="container mt-3 bg-black">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {store.characters && store.characters.slice(0,9).map((character,index) => (
            <div className="col" key={character.uid}>
              <div className="card shadow-sm"> 
                <img src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${character.uid}.jpg`}
                className="card-img-top" alt={character.name} style={{height: "100%", objectFit:"cover"}} /> 
                <div className="card-body"> 
                  <h4 className="card-text mb-3">{character.name}</h4>
                  <div className="d-flex justify-content-between align-items-center"> 
                    <div className="btn-group"> 
                      <button onClick={() => handleDetails(character)} type="button" className="btn btn-sm btn-outline-secondary">Learn more</button>  
                    </div> 
                    <button type="button" className="btn btn-sm btn-outline-warning"><i className="fa-regular fa-heart"></i></button> 
                  </div> 
                </div> 
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div>
            <Link to="/" className="text-light">
            <p>or get back to homepage</p>
            </Link>
          </div>
          <div>
            <nav aria-label="...">
              <ul className="pagination">
                <li className="page-item disabled">
                  <Link className="page-link">Previous</Link>
                </li>
                <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
                <li className="page-item"><Link className="page-link bg-dark text-secondary" to="#" aria-current="page">2</Link></li>
                <li className="page-item"><Link className="page-link bg-dark text-secondary" to="#">3</Link></li>
                <li className="page-item"><Link className="page-link bg-dark text-secondary" to="#">Next</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      
      
        
      </div>
  );
};