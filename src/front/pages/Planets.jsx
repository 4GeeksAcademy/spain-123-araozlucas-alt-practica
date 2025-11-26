// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect } from "react";

export const Planets = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  const getPlanets = async() => {
    const response = await fetch(`https://swapi.dev/api/planets`)
    if (!response.ok) {
      console.log('Error', response.status, response.statusText);
      return
    }
    const data = await response.json()
    console.log(data.results);
    dispatch ({
      type: "setPlanets",
      payload: data.results
    });
  };
  

  useEffect (() => {
    getPlanets();
  }, [])

  return (
      <div className="container mt-3 bg-black">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {store.planets && store.planets.slice(0,9).map((planet,index) => (
          <div className="col">
              <div className="card shadow-sm"> 
                <svg aria-label="Placeholder: Thumbnail" className="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg"><title>Placeholder</title><rect width="100%" height="100%" fill="#fc9700ff"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Characters</text></svg> 
                <div className="card-body"> 
                  <h4 className="card-text mb-3">{planet.name}</h4>
                  <div className="d-flex justify-content-between align-items-center"> 
                    <div className="btn-group"> 
                      <button type="button" className="btn btn-sm btn-outline-secondary">Learn more</button>  
                    </div> 
                    <button type="button" className="btn btn-sm btn-outline-warning"><i className="fa-regular fa-heart"></i></button> 
                  </div> 
                </div> 
              </div>
          </div>
          ))}
        </div>
      
      
          <Link to="/" className="text-light">
          <p>or get back to homepage</p>
          </Link>
        
      </div>
    
  );
};
