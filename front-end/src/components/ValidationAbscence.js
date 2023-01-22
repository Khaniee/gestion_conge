import { Component } from "react";
import Header from "./Header";

class ValidationAbscence extends Component{
    constructor(props){
        super(props)
        this.state={
            // id : "",
            // name : "",
            // date_demande : "",
            // date_debut : "",
            // date_fin : "",
            // motif : "",
            // valide : ""
            abscences : []
        }
    }
    componentDidMount = ()=>{
        const url= "http://localhost:8000/api/abscences/"
        fetch(url)
            .then((res) => res.json())
            .then((data) => this.setState({abscences: data["data"]}))
    } 
    render(){
        const {abscences}= this.state
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
                                    <th>Date de demande</th>
                                    <th>Date début</th>
                                    <th>Date fin</th>
                                    <th>Motif</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {abscences.map((e)=>(
                                    <tr>
                                    <td>{e.id}</td>
                                    <td>{e.employee ? e.employee.lastname+" "+e.employee.firstname : "Inconnu"}</td>
                                    <td>{e.date_demande}</td>
                                    <td>{e.date_debut}</td>
                                    <td>{e.date_fin}</td>
                                    <td>{e.motif}</td>
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
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ValidationAbscence;