// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container mt-3">
      <div className="col-10 col-sm-8 col-md-6 col-lg-6 m-auto">
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
          <button type="submit" className="form-control btn btn-primary mt-3">save</button>
          <Link to="/">
          <p>or get back to contacts</p>
          </Link>
        </form>
      </div>
      <ul className="list-group mt-5">
        {/* Map over the 'todos' array from the store and render each item as a list element */}
        {store && store.todos?.map((item) => {
          return (
            <li
              key={item.id}  // React key for list items.
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}>

              {/* Link to the detail page of this todo. */}
              <Link to={"/single/" + item.id}>Link to: {item.title} </Link>

              <p>Open file ./store.js to see the global store that contains and updates the list of colors</p>

              <button className="btn btn-success"
                onClick={() => dispatch({
                  type: "add_task",
                  payload: { id: item.id, color: '#ffa500' }
                })}>
                Change Color
              </button>
            </li>
          );
        })}
      </ul>
      <br />

      
    </div>
  );
};
