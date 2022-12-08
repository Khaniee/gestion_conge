import { Component } from "react";
import Header from "./Header";

class ValidationAbscence extends Component{
    constructor(props){
        super(props)
        this.state={
            id : "",
            name : "",
            date_demande : "",
            date_debut : "",
            date_fin : "",
            motif : "",
            valide : ""
        }
    }

    render(){
        return(
            <div>
                <Header />
                <div className="card m-3">
                    <div className="card-header">
                        Demandes d'abscence
                    </div>
                    <div className="card-body table-responsive">
                        <table className="table table-head-fixed table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nom</th>
                                    <th>Date début</th>
                                    <th>Date fin</th>
                                    <th>Motif</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Tsitana Khanie</td>
                                    <td>20 Juin 2004</td>
                                    <td>20 Juin 2023</td>
                                    <td>Fatigue</td>
                                    <td>
                                        <button type="button" className="btn btn-primary btn-sm">
                                            Accepter
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-warning btn-sm">
                                            Refuser
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

export default ValidationAbscence