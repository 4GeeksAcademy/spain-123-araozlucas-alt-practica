// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Characters = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
     <div className="container mt-3 bg-black">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div className="col">
            <div className="card shadow-sm"> 
              <svg aria-label="Placeholder: Thumbnail" className="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg"><title>Placeholder</title><rect width="100%" height="100%" fill="#2fa2aaff"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Characters</text></svg> 
              <div className="card-body"> 
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> 
                <div className="d-flex justify-content-between align-items-center"> 
                  <div className="btn-group"> 
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button> 
                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> 
                  </div> 
                  <small className="text-body-secondary">9 mins</small> 
                </div> 
              </div> 
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm"> 
              <svg aria-label="Placeholder: Thumbnail" className="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg"><title>Placeholder</title><rect width="100%" height="100%" fill="#2fa2aaff"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Characters</text></svg> 
              <div className="card-body"> 
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> 
                <div className="d-flex justify-content-between align-items-center"> 
                  <div className="btn-group"> 
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button> 
                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> 
                  </div> 
                  <small className="text-body-secondary">9 mins</small> 
                </div> 
              </div> 
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm"> 
              <svg aria-label="Placeholder: Thumbnail" className="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg"><title>Placeholder</title><rect width="100%" height="100%" fill="#2fa2aaff"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Characters</text></svg> 
              <div className="card-body"> 
                <h2 className="card-text">Luke Skywalker</h2>
                <p className="card-text">Gender:</p>
                <p className="card-text">Hair Color:</p> 
                <p className="card-text">Eye Color:</p> 
                <div className="d-flex justify-content-between align-items-center"> 
                  <div className="btn-group"> 
                    <button type="button" className="btn btn-sm btn-outline-secondary">Learn more</button>  
                  </div> 
                  <button type="button" className="btn btn-sm btn-outline-warning"><i class="fa-regular fa-heart"></i></button> 
                </div> 
              </div> 
            </div>
          </div>
        </div>
      
      
          <Link to="/" className="text-light">
          <p>or get back to homepage</p>
          </Link>
        
      </div>
  );
};