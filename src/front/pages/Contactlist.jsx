// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import starTrooperImageUrl from "../assets/img/soldadoimperial.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Contactlist = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container mt-3">
      <div className="col-10 col-sm-8 col-md-6 col-lg-6 m-auto text-light">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src="https://randomuser.me/api/portraits/women/28.jpg" className="img-fluid rounded-start" alt="..."/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Last updated 3 mins ago</p>
                <p className="card-text">Last updated 3 mins ago</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={starTrooperImageUrl} className="img-fluid rounded-start" alt="..."/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Last updated 3 mins ago</p>
                <p className="card-text">Last updated 3 mins ago</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
      
        
        <button type="submit" className="form-control btn btn-warning mt-3">save</button>
        <Link to="/" className="text-light">
        <p>or get back to contacts</p>
        </Link>
      
      </div>
    </div>
  );
};