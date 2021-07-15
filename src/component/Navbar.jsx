import React ,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { DataContext } from "../context/DataContext";

const Navbar = () => {
  const  {cart }  = useContext(DataContext);
    return (
        <>
        
<nav className="navbar navbar-expand-md navbar-light bg-white fixed-top scrolling-navbar">
    <div className="container">

  <NavLink to="/" className="navbar-brand" >
    <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="30" alt="mdb logo" />
  </NavLink>

  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav1"
    aria-controls="basicExampleNav1" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  
  
  
  <div className="collapse navbar-collapse" id="basicExampleNav1">

    
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink to="/cart" className="nav-link navbar-link-2 waves-effect">
          <span className="badge badge-pill red">{cart.total_unique_items}</span>
          <i className="fas fa-shopping-cart pl-0"></i>
        </NavLink>
      </li>
     
      
      <li className="nav-item pl-2 mb-2 mb-md-0">
        <NavLink to="" type="button"
          className="btn btn-outline-info btn-md btn-rounded btn-navbar waves-effect waves-light">Sign In</NavLink>
      </li>
    </ul>

  </div>
  </div>

</nav>

            
        </>
    )
}

export default Navbar
