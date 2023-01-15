import { Component } from "react";
class Login extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            Login:"",
            Password:"",
            Privilege:""
        }
    }
    render(){
        return(
            <div className="centerBox">
                <h3>
                    Gestion d'abscence
                </h3>
                <div className="card w-50">
                <div className="card-header">
                    Veuillez vous auhentifier
                </div>
                <div className="card-body">
                    <form className="form">
                        <label className="form-label">
                            Login
                        </label>
                        <input className="form-control" type="text"></input>

                        <label className="form-label">
                            Mot de passe
                        </label>
                        <input className="form-control" type="password"></input>

                        <label className="form-label">
                            Privilege
                        </label>
                        <select className="form-control" name="" id="">
                        <option>Utilisateur</option>
                        <option>Responsable</option>
                        </select>
                        <div className="text-center  mt-5">
                            <button className="btn btn-primary">
                                Se connecter
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}
export default Login;