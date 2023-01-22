import { Component } from "react";
import Header from "./Header";

class HistoriqueMesAbscence extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            id : "",
            date_debut : "",
            date_fin : "",
            motif : "",
            statut : ""
        }
    }
    render(){
        return(
            <div>
                <div className="card m-3">
                    <div className="card-header">
                        Historique de vos abscences
                    </div>
                    <div className="card-body table-responsive">
                        <table className="table table-head-fixed table-striped table-hover table-sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date debut</th>
                                    <th>Date fin</th>
                                    <th>Motif</th>
                                    <th>Statut</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>15 Dec 2021</td>
                                    <td> 1 Janv 2021</td>
                                    <td>vacances</td>
                                    <td>
                                        <button type="button" className="btn btn-success btn-sm">
                                            validé
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
export default HistoriqueMesAbscence