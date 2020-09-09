import React from "react"
import {Link, NavLink} from "react-router-dom"

const Navbar = () => {
    return (
        <nav className= "navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <a className= "navbar-brand" href="#">Logo</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                 data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" 
                  aria-expanded="false"
                   aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Accueil </Link>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users">Gestion utilisateur</NavLink>
                        </li>
                    </ul>
                </div>

               
            </div>
        </nav>
    )
}


export default Navbar;