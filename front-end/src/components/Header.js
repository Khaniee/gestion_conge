import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "../common/with-router";
import { logout } from "../services/auth";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    logout();
    this.props.router.navigate("/login");
    window.location.reload();
  }

  render() {
    return (
      <nav className="navbar navbar-fixed navbar-dark bg-dark navbar-expand-lg">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">REACT_FLASK</Link>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/demandeAbscence">Demande d'abscence</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/historiqueMesAbscence">Historique de mes abscences</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/abscences">Liste des abscences</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/employees">Gestion des employées</NavLink>
            </li>

          </ul>
          <ul className="m-0">
            <li className="nav-item">
              <button className="btn btn-danger" onClick={this.handleLogout}>
                Se déconnecter
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
export default withRouter(Header);