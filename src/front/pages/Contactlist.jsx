// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import starTrooperImageUrl from "../assets/img/soldadoimperial_reduced.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Contactlist = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container mt-3">
      <div className="col-10 col-sm-8 col-md-8 col-lg-8 m-auto text-light">
        <Link to="/contactadd" className="d-flex justify-content-md-end text-decoration-none">
        <button type="submit" className="btn btn-secondary mb-3">New User</button>
        </Link>

        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-3 mt-3 mb-3 d-flex justify-content-center">
              <small>
                <img src={starTrooperImageUrl} className="img-fluid" alt="..."/>
              </small>
            </div>
            <div className="col-md-6 mt-3 mb-3">
              <div className="card-body">
                <h5 className="card-title mb-4">Lucy Anamendolla</h5>
                <p className="card-text lh-1"><i className="fa-solid fa-location-dot me-1"></i>5842 Hillcress Rd</p>
                <p className="card-text lh-1"><small className="text-muted"><i className="fa-solid fa-phone me-1"></i>(870) 288-4149</small></p>
                <p className="card-text lh-1"><small className="text-muted"><i className="fa-solid fa-envelope me-1"></i>mike.ana@example.com</small></p>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-between mt-4 mb-3">
              <i className="fa-solid fa-pencil"></i>
              <i className="fa-solid fa-trash me-2"></i>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-3 mt-3 mb-3 d-flex justify-content-center">
              <small>
                <img src={starTrooperImageUrl} className="img-fluid" alt="..."/>
              </small>
            </div>
            <div className="col-md-6 mt-3 mb-3">
              <div className="card-body">
                <h5 className="card-title mb-4">Lucy Anamendolla</h5>
                <p className="card-text lh-1"><i className="fa-solid fa-location-dot me-1"></i>5842 Hillcress Rd</p>
                <p className="card-text lh-1"><small className="text-muted"><i className="fa-solid fa-phone me-1"></i>(870) 288-4149</small></p>
                <p className="card-text lh-1"><small className="text-muted"><i className="fa-solid fa-envelope me-1"></i>mike.ana@example.com</small></p>
              </div>
            </div>
            <div className="col-md-3 d-flex justify-content-between mt-4 mb-3">
              <i className="fa-solid fa-pencil"></i>
              <i className="fa-solid fa-trash me-2"></i>
            </div>
          </div>
        </div>
      
        <Link to="/" className="text-light">
        <p>or get back to contacts</p>
        </Link>
      
      </div>
    </div>
  );
};