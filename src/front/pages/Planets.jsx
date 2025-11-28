// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect } from "react";

export const Planets = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()

  const getPlanets = async() => {
    const response = await fetch(`https://swapi.tech/api/planets`)
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

  const handleDetails = (planet) => {
    // 1. Cambia el store (primero tiene que estar en el store)
    dispatch ({
      type: 'setCurrentPlanet',
      payload: planet
    })
    // 2. Almacena en local
    localStorage.setItem('currentPlanet', JSON.stringify(planet));
    // 3. Navigate (antes crear la ruta)
    navigate(`/planetdetails/${planet.uid}`)
  }

  return (
      <div className="container mt-3 bg-black">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {store.planets && store.planets.slice(0,9).map((planet,index) => (
          <div className="col" key={planet.uid}>
              <div className="card shadow-sm"> 
                <img src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/planets/${planet.uid}.jpg`}
                className="card-img-top" alt={planet.name} style={{height: "100%", objectFit:"cover"}} />
                <div className="card-body"> 
                  <h4 className="card-text mb-3">{planet.name}</h4>
                  <div className="d-flex justify-content-between align-items-center"> 
                    <div className="btn-group"> 
                      <button onClick={() => handleDetails(planet)} type="button" className="btn btn-sm btn-outline-secondary">Learn more</button>  
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
