import { Component } from "react";

import { checkAuthentification } from '../common/with-authentification';
import { withRouter } from "../common/with-router";
import { getAbscenceByEmployeeId, ABSCENCES_STATUS } from "../services/apiAbscence";
import { whoami } from "../services/auth";
import { notify, NOTIFY_LEVEL } from "../services/notify";
class HistoriqueMesAbscence extends Component {
  constructor(props) {
    super(props)
    this.state = {
      abscences: []
    }
  }

  componentDidMount = async () => {
    await checkAuthentification(this.props.router);
    try {
      const user = await whoami();
      const response = await getAbscenceByEmployeeId(user.employee.id);
      if (response.detail) {
        notify(response.detail.detail, NOTIFY_LEVEL.ERROR)
      }
      console.log(response);
      this.setState({ abscences: response });
    } catch {
      notify("Unable to get the current user!", NOTIFY_LEVEL.ERROR);
    }
  }

  render() {
    return (
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
                </tr>
              </thead>
              <tbody>
                {this.state.abscences.map(abscence => (
                  <tr>
                    <td>{abscence.id}</td>
                    <td>{abscence.date_debut}</td>
                    <td>{abscence.date_fin}</td>
                    <td>{abscence.motif}</td>
                    <td>
                      {(abscence.valide === ABSCENCES_STATUS.ACCEPTED) ? (
                        <span className="badge bg-success">Acceptée</span>
                      ) : (abscence.valide === ABSCENCES_STATUS.REJECTED) ? (
                        <span className="badge bg-danger">Refusée</span>
                      ) : (
                        <span className="badge bg-warning">En attente</span>
                      )}
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
export default withRouter(HistoriqueMesAbscence)