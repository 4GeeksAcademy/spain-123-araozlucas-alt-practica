// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Contactadd = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container mt-3">
      
      <div className="col-10 col-sm-8 col-md-6 col-lg-6 m-auto text-secondary">
        <h1 className="text-start mt-3 text-light display-6">Add contact</h1>
        <form>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">Full name</label>
            <input type="text" className="form-control" id="exampleInputName" placeholder="Full name"/>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
          </div>
          <div className="mb-3">
            <label for="exampleInputPhone" className="form-label">Phone</label>
            <input type="text" className="form-control" id="exampleInputPhone" placeholder="Enter phone"/>
          </div>
          <div className="mb-3">
            <label for="exampleInputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="exampleInputAddress" placeholder="Enter address"/>
          </div>
          <button type="submit" className="form-control btn btn-warning mt-3">save</button>
          <Link to="/" className="text-light">
          <p>or get back to homepage</p>
          </Link>
        </form>
      </div>
    </div>
  );
};