import { Component } from "react";
import Header from './Header'

class HistoriqueAbscence extends Component{
    constructor(props){
        super(props)
        this.state={
            id : "",
            name : "",
            date_debut : "",
            date_fin : "",
            motif : ""
        }
    }

    render(){
        return(
            <div>
                <Header />
                <div className=" ">
                    <div className="card m-3">
                        <div className="card-header">
                            Historique des Abscences
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Tsitana Khanie</td>
                                        <td>20 Juin 2004</td>
                                        <td>20 Juin 2023</td>
                                        <td>Fatigue</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoriqueAbscence;