import { Component } from "react";
import Header from "./Header";

class Employees extends Component{
    constructor(props){
        super(props)
        this.state={
            id : "",
            lastName : "",
            firstName : "",
            job : "",
            address : "",
            contact : ""
        }
    }
    render(){
        return(
            <div>
                <Header />
                <div className="card m-3">
                    <div className="card-header">
                        Liste des Employees
                    </div>
                    <div className="card-body table-responsive">
                        <table className="table table-head-fixed table-striped table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Poste</th>
                                    <th>Adresse</th>
                                    <th>Contact</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Tsitana</td>
                                    <td> Khanie</td>
                                    <td>dev</td>
                                    <td>Lot vf 10 Ambanidia</td>
                                    <td>0387769067</td>
                                    <td>
                                        <button type="button" className="btn btn-warning btn-sm">
                                            modifier
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger btn-sm">
                                            supprimer
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default Employees