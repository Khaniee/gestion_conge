import { Component } from "react";

class Header extends Component{
    render(){
        return(
            <nav className="navbar navbar-fixed navbar-dark bg-dark navbar-expand-lg">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="">Demande d'abscence</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Historique de mes abscences</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Validation demandes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Historique abscences</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="">Gestion des employées</a>
                    </li>
                    
                </ul>
                <ul className="m-0 p-0">
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