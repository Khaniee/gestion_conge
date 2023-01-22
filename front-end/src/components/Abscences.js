import { Component } from "react";

import { getAbscences, putAbscence, ABSCENCES_STATUS } from "../services/apiAbscence";
import Button, { BUTTON_TYPE } from "./widgets/Button";

import { askConfirmation, notify } from "../services/notify";
class ValidationAbscence extends Component{
    constructor(props){
        super(props)
        this.state={
            abscences : []
        }
    }
    componentDidMount = async ()=>{
        const abscences = await getAbscences();
        this.setState({abscences: abscences});
    }
    handleAcceptBtnClick = async (id) => {
        let abscence = {
            ...this.state.abscences.find((abscence) => abscence.id === id)
        };
        const confirmation = await askConfirmation(`Le congé de ${abscence.employee.firstname} ${abscence.employee.lastname} sera acceptée!`, "Oui, accepter");
        if (!confirmation.isConfirmed) {
            return;
        }
        abscence.valide = ABSCENCES_STATUS.ACCEPTED
        putAbscence(abscence);
        notify(`Congé #${abscence.id} acceptée!`);
        const abscences = this.state.abscences.map((_) => {
            if (_.id === abscence.id) {
                return abscence;
            } else {
                return _;
            }
        })
        this.setState({ abscences });
    }
    handleDeclineBtnClick = async (id) => {
        let abscence = {
            ...this.state.abscences.find((abscence) => abscence.id === id)
        };
        const confirmation = await askConfirmation(`Le congé de ${abscence.employee.firstname} ${abscence.employee.lastname} sera refusée!`, "Oui, refuser");
        if (!confirmation.isConfirmed) {
            return;
        }
        abscence.valide = ABSCENCES_STATUS.REJECTED
        putAbscence(abscence);
        notify(`Congé #${abscence.id} refusée!`);
        const abscences = this.state.abscences.map((_) => {
            if (_.id === abscence.id) {
                return abscence;
            } else {
                return _;
            }
        })
        this.setState({ abscences });
    }

    render(){
        const {abscences}= this.state
        return(
            <div className="card m-3">
                <div className="card-header">
                    Demandes d'abscence
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-head-fixed table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Status</th>
                                <th>Nom</th>
                                <th>Date de demande</th>
                                <th>Date début</th>
                                <th>Date fin</th>
                                <th>Motif</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {abscences.map((e)=>(
                                <tr>
                                <td className="fw-bold">{e.id}</td>
                                <td>
                                { (e.valide === ABSCENCES_STATUS.ACCEPTED) ? (
                                    <span className="badge bg-success">Acceptée</span>
                                ) : (e.valide === ABSCENCES_STATUS.REJECTED) ? (
                                    <span className="badge bg-danger">Refusée</span>
                                ) : (
                                    <span className="badge bg-warning">En attente</span>
                                )}
                                </td>
                                <td>{e.employee  ? e.employee.lastname+" "+e.employee.firstname : "Inconnu"}</td>
                                <td>{e.date_demande}</td>
                                <td>{e.date_debut}</td>
                                <td>{e.date_fin}</td>
                                <td>{e.motif}</td>
                                { (e.valide === ABSCENCES_STATUS.PENDING) ? (
                                    <td>
                                        <Button
                                            className="mx-1"
                                            level={BUTTON_TYPE.SUCCESS}
                                            label="Accepter"
                                            onClick={ () => this.handleAcceptBtnClick(e.id) }
                                        />
                                        <Button
                                            className="mx-1"
                                            level={BUTTON_TYPE.DANGER}
                                            label="Refuser"
                                            onClick={() => this.handleDeclineBtnClick(e.id) }
                                        />
                                    </td>
                                ) : (
                                    <td></td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ValidationAbscence