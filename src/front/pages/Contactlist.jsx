// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import starTrooperImageUrl from "../assets/img/soldadoimperial_reduced.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useState } from "react";

export const Contactlist = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  const [ newContact, setNewContact ] = useState('');
  const [ isEdit, setIsEdit ] = useState(false);


  const handleDelete = (event) => {
    event.preventDefault()
   }

  const handleEdit = (modifiedTask) => {
    setIsEdit(true)
  }

  return (
    <div className="container mt-3">
      {isEdit ?
      <div className="col-10 col-sm-8 col-md-6 col-lg-6 m-auto text-secondary">
        <h1 className="text-start mt-3 text-light display-6">Edit contact</h1>
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
        </form>
          
          <div className="d-flex justify-content-between">
            <div>
                <Link to="/" className="text-light">
                <p>or get back to homepage</p>
                </Link>
            </div>
            <div class="d-grid gap-2 d-md-flex">
                <button class="btn btn-warning me-md-2" type="button">Save</button>
                <button class="btn btn-secondary" type="button">Cancel</button>
            </div>
          </div>
      </div> 
      :
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
       }
      <div className="col-10 col-sm-8 col-md-8 col-lg-8 m-auto text-light">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-start text-light display-5">Contacts</h1>
        <div>
          <Link to="/contactadd" className="text-decoration-none">
            <button type="submit" className="btn btn-secondary mb-3">New User</button>
          </Link>
        </div>
      </div>

        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-3 mt-3 mb-3 d-flex justify-content-center">
              <small>
                <img src={starTrooperImageUrl} width="150" height="150" className="img-fluid" alt="..."/>
              </small>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card-body">
                <h5 className="card-title mb-4">Lucy Anamendolla</h5>
                <p className="card-text lh-1"><i className="fa-solid fa-location-dot me-1"></i>5842 Hillcress Rd</p>
                <p className="card-text lh-1"><small className="text-muted"><i className="fa-solid fa-phone me-1"></i>(870) 288-4149</small></p>
                <p className="card-text lh-1"><small className="text-muted"><i className="fa-solid fa-envelope me-1"></i>mike.ana@example.com</small></p>
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-start justify-content-between mt-4 mb-3">
              <button className="btn btn-secondary mb-3"><i className="fa-solid fa-pencil"></i></button>
              <button className="btn btn-secondary mb-3 me-3 bg-danger"><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-3 mt-3 mb-3 d-flex justify-content-center">
              <small>
                <img src={starTrooperImageUrl} width="150" height="150" className="img-fluid" alt="..."/>
              </small>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card-body">
                <h5 className="card-title mb-4">Lucy Anamendolla</h5>
                <p className="card-text lh-1"><i className="fa-solid fa-location-dot me-1"></i>5842 Hillcress Rd</p>
                <p className="card-text lh-1"><small className="text-muted"><i className="fa-solid fa-phone me-1"></i>(870) 288-4149</small></p>
                <p className="card-text lh-1"><small className="text-muted"><i className="fa-solid fa-envelope me-1"></i>mike.ana@example.com</small></p>
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-start justify-content-between mt-4 mb-3">
              <button onClick={() => handleEdit(item)} className="btn btn-secondary mb-3"><i className="fa-solid fa-pencil"></i></button>
              <button onClick={() => handleDelete(item)} className="btn btn-secondary mb-3 me-3 bg-danger"><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      
        <Link to="/" className="text-light">
        <p>or get back to homepage</p>
        </Link>
      
      </div>
    </div>
  );
};