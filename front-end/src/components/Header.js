import { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component{
    render(){
        return(
            <nav className="navbar navbar-fixed navbar-dark bg-dark navbar-expand-lg">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/demandeAbscence">Demande d'abscence</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/historiqueMesAbscence">Historique de mes abscences</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/validationDemande">Validation demandes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/employees">Gestion des employées</Link>
                    </li>
                    
                </ul>
                <ul className="m-0">
                    <li  className="nav-item">
                        <a className="nav-link" href="">
                        Se déconnecter
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        )
    }
} 
export default Header