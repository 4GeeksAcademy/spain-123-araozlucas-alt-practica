// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import starTrooperImageUrl from "../assets/img/soldadoimperial_reduced.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react";

export const Contactlist = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  const url = 'https://playground.4geeks.com/contact';
  const user = 'lucas';

  const [ newContact, setNewContact ] = useState({name: '',
                                                  phone: '',
                                                  email: '',
                                                  address: '',
  });
  const [ editContact, setEditContact ] = useState({name: '',
                                                  phone: '',
                                                  email: '',
                                                  address: '',
  });

  const [ allContacts, setAllContacts ] = useState([]);
  const [ editAllContacts, setEditAllContacts ] = useState({});
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isAdd, setIsAdd ] = useState(false);
  const [ view, setView ] = useState("list");

  const [ contactToDelete, setContactToDelete ] = useState('');

  const handleNewContact = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({
      ...prev, [name]: value
    }));
    };

  const handleEditContact = (e) => {
    const { name, value } = e.target;
    setEditContact((prev) => ({
      ...prev, [name]: value
    }));
    };

  const handleDelete = async(deleteContact) => {
    const uri = `${url}/agendas/${user}/contacts/${deleteContact.id}`;
    const options = {
      method: 'DELETE'};
    const response = await fetch (uri, options);
    if(!response.ok) {
      console.log('Error', response.status, response.statusText);
      return
    }
    console.log("Contacto ELIMINADO correctamente");  
    getContacts()
    
   }

  const handleEdit = (item) => {
    setEditAllContacts(item)
    setEditContact (item)
    setView("edit");
    console.log('Editando:', item);
  }

  const handleAdd = () => {
    setView("add");
  }
  const contactsList = () => {
    setView("list");
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const dataToSend = {
      name: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      address: newContact.address,
    }
    if (!newContact.name || !newContact.phone || !newContact.email || !newContact.address ) {
      console.log("Faltan datos");
      return;
    }

    const uri = `${url}/agendas/${user}/contacts`
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(dataToSend)
    };
    const response = await fetch (uri, options)
    if (!response.ok) {
      console.log('Error', response.status, response.statusText);
      return
    }
    console.log("Contacto CREADO correctamente");
    
    const data = await response.json()
    console.log(data);
    setNewContact({name: '',
                    phone: '',
                    email: '',
                    address: '',

    })
    getContacts();
    setView("list");
  }

  const handleSubmitEdit = async (event) => {
    event.preventDefault()
    const dataToSend = {
      name: editContact.name,
      phone: editContact.phone,
      email: editContact.email,
      address: editContact.address
    }

    if ( !editContact.name || !editContact.phone || !editContact.email || !editContact.address ) {
      console.log('Faltan datos');
      return
    }

    const uri = `${url}/agendas/${user}/contacts/${editAllContacts.id}`;
    const options = {
      method: 'PUT',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(dataToSend)
      }

    const response = await fetch (uri, options)
    if (!response.ok) {
      console.log('Error', response.status, response.statusText);
      return
    }
    console.log("Contacto EDITADO correctamente");
    const data = await response.json()
    console.log(data);

    setEditContact({name: '',
                    phone: '',
                    email: '',
                    address: '',
    })
    getContacts()
    setView("list");
  }

  const ensureAgenda = async () => {
    try {
      const res = await fetch (`${url}/agendas/${user}`);

      if (res.status === 404) {
        const createRes = await fetch (`${url}/agendas/${user}`, {method: 'POST'});
        if (!createRes.ok) return false 
        }
        return true
      } catch (error) {
        console.error('Error revisando agenda', error);
        return false
      }
    };
  
  const getContacts = async() => {
    const ready = await ensureAgenda();
    if (!ready) return;

    const response = await fetch (`${url}/agendas/${user}/contacts`)
    if (!response.ok) {
      console.log('Error', response.status, response.statusText);
      return
    }
    const data = await response.json()
    console.log('Contactos:',data.contacts);
    setAllContacts(data.contacts || [])
  }

  useEffect (() => {
    getContacts()
  },[])

  return (
    <div className="container mt-3">
      { view === "add" && (
        <div className="col-10 col-sm-8 col-md-6 col-lg-6 m-auto text-secondary">
          <h1 className="text-start mt-3 text-light display-6">Add contact</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">Full name</label>
              <input type="text" className="form-control" id="exampleInputName" name="name" placeholder="Full name"
              value={newContact.name} onChange={handleNewContact}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">Address</label>
              <input type="text" className="form-control" id="exampleInputAddress" name="address" placeholder="Enter address"
              value={newContact.address} onChange={handleNewContact}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
              <input type="text" className="form-control" id="exampleInputPhone" name="phone" placeholder="Enter phone"
              value={newContact.phone} onChange={handleNewContact}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" name="email" placeholder="Enter email"
              value={newContact.email} onChange={handleNewContact}/>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                  <Link to="/" className="text-light">
                  <p>or get back to homepage</p>
                  </Link>
              </div>
              <div className="d-grid gap-2 d-md-flex">
                  <button className="btn btn-warning me-md-2" type="submit">Save</button>
                  <button onClick={() => setView("list")} className="btn btn-secondary" type="reset">Cancel</button>
              </div>
            </div>
          </form>
        </div>

      )}

      { view === "edit" && (
        <div className="col-10 col-sm-8 col-md-6 col-lg-6 m-auto text-secondary">
          <h1 className="text-start mt-3 text-light display-6">Edit contact</h1>
          <form onSubmit={handleSubmitEdit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">Full name</label>
              <input type="text" className="form-control" id="exampleInputName" name="name" placeholder="Full name"
              value={editContact.name} onChange={handleEditContact} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">Address</label>
              <input type="text" className="form-control" id="exampleInputAddress" name="address" placeholder="Enter address"
              value={editContact.address} onChange={handleEditContact} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
              <input type="text" className="form-control" id="exampleInputPhone" name="phone" placeholder="Enter phone"
              value={editContact.phone} onChange={handleEditContact} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" name="email" placeholder="Enter email"
              value={editContact.email} onChange={handleEditContact} />
            </div>
            <div className="d-flex justify-content-between">
              <div>
                  <Link to="/" className="text-light">
                  <p>or get back to homepage</p>
                  </Link>
              </div>
              <div className="d-grid gap-2 d-md-flex">
                  <button className="btn btn-warning me-md-2" type="submit">Save</button>
                  <button onClick={() => setView("list")} className="btn btn-secondary" type="reset">Cancel</button>
              </div>
            </div>
          </form>
          
      </div> 
      )}

      { view === "list" && (
        <div className="col-10 col-sm-8 col-md-8 col-lg-8 m-auto text-light">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-start text-light display-5">Contacts</h1>
            <div>
              <button onClick={handleAdd} type="button" className="btn btn-secondary mb-3">New User</button>
            </div>
          </div>
          
          {allContacts.map((contacts) => {
            return (
            <div key={contacts.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-3 mt-3 mb-3 d-flex justify-content-center">
                  <small>
                    <img src={starTrooperImageUrl} width="150" height="150" className="img-fluid" alt="..."/>
                  </small>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card-body">
                    <h5 className="card-title mb-4">{contacts.name}</h5>
                    <p className="card-text lh-1"><i className="fa-solid fa-location-dot me-1"></i>{contacts.address}</p>
                    <p className="card-text lh-1"><small className="text-muted"><i className="fa-solid fa-phone me-1"></i>{contacts.phone}</small></p>
                    <p className="card-text lh-1"><small className="text-muted"><i className="fa-solid fa-envelope me-1"></i>{contacts.email}</small></p>
                  </div>
                </div>
                <div className="col-md-3 d-flex align-items-start justify-content-between mt-4 mb-3">
                  <button onClick={() => handleEdit(contacts)} className="btn btn-secondary mb-3"><i className="fa-solid fa-pencil"></i></button>
                  <button onClick={() => setContactToDelete(contacts)} 
                    className="btn btn-secondary mb-3 me-3 bg-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  ><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            </div>
            )
          })}
          
          <div className="modal fade" 
              id="deleteModal" 
              tabindex="-1" 
              aria-labelledby="deleteModalLabel" 
              aria-hidden="true"
            >
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-light border-secondary">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="deleteModalLabel">Confirm delete</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  {contactToDelete ? (
                    <p>Delete{" "}<strong>{contactToDelete.name}</strong>, are you sure you want?</p>
                    ):
                    (<p>Loading...</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button 
                    type="button" 
                    className="btn btn-warning"
                    data-bs-dismiss="modal"
                    onClick={()=> handleDelete(contactToDelete)}
                  >Delete</button>
                </div>
              </div>
            </div>
          </div>
      
          <Link to="/" className="text-light">
          <p>or get back to homepage</p>
          </Link>
      
        </div>
      )}
    </div>
  );
};