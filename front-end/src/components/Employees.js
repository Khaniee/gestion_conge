import { Component } from "react";

import Header from "./Header";

import { 
    getEmployees,
    postEmployee,
    deleteEmployee,
    putEmployee,
} from "../services/apiEmployee";
import { askConfirmation, notify } from "../services/notify";
import Button, { BUTTON_TYPE } from "./widgets/Button";

const ACTION = {
    CREATE_AND_UPDATE: 'create_and_update',
    CREATE: 'create',
    UPDATE: 'update',
};

class Employees extends Component {

    constructor(props){
        super(props)
        this.state={
            employee: this.getInitialForm(),
            employees: []
        }
    }

    getInitialForm = () => {
        return {
            id: 0,
            firstname: "",
            lastname: "",
            job: "",
            contact: "",
            adress: "",
            id_user: 0,
        };
    }
    componentDidMount = ()=>{
        this.setEmployees();
    }
    setEmployees = async () => {
        try {
            const employees = await getEmployees();
            this.setState({ employees: employees });
        } catch (err) {
            console.log(err);
        }
    }
    /**
     * Met a jour le formulaire d'employée avec les informations
     * obtenu par l'identifiant id
     * @param {int} id 
     */
    setEmployeeFromId = async (id) => {
        // On copie l'objet originale
        // pour eviter que les modification n'affecte ce dernier
        const employee = {
            ...this.state.employees.find((employee) => employee.id === id)
        };
        employee.id_user = employee.user.id;
        // on suprimme l'attribut `user`
        // car l'attribut ne sert pas a grand choses ici
        delete employee.user
        this.setState( { employee } )
    }
    // click on the update button in the list
    onUpdateEmployeeClick = (id) => {
        this.setEmployeeFromId(id);
    }
    // click on the delete button in the list
    onDeleteEmployeeClick = async (id) => {
        const confirmation = await askConfirmation(`L'employée #${id} sera supprimer!`, "Oui, Supprimer");
        if (!confirmation.isConfirmed) {
            return;
        }
        deleteEmployee(id);
        notify(`Employée #${id} supprimer!`)
        let employees = this.state.employees.filter((emp) => emp.id !== id);
        this.setState({ employees })
    }
    // click sur le boutton reset du formulaire
    onResetEmployeeClick = () => {
        this.setState({ employee: this.getInitialForm() });
    }
    // Form Submit Handler
    handleFormSubmit = async (event) => {
        event.preventDefault();
        let action = event.nativeEvent.submitter.value;
        if (action === ACTION.UPDATE) {
            this.onUpdateButtonClick();
        } else {
            this.onCreateButtonClick(action);
        }
    }
    onUpdateButtonClick = async () => {
        const confirmation = await askConfirmation(`Les modification seront sauvegarder!`, "Oui, continuer");
        if (!confirmation.isConfirmed) {
            return;
        }
        const employee = await putEmployee(this.state.employee)
        notify(`Employée #${this.state.employee.id} sauvegarder!`);
        const employees = this.state.employees.map((emp, i) => {
            if (emp.id === employee.id) {
                return employee;
            } else {
                return emp;
            }
        })
        this.setState({ employees })
    }
    onCreateButtonClick = async (nextAction = ACTION.CREATE) => {
        const confirmation = await askConfirmation(`L'employée ${this.state.employee.firstname} ${this.state.employee.lastname} sera créer!`, "Oui, continuer");
        if (!confirmation.isConfirmed) {
            return;
        }
        const employee = await postEmployee(this.state.employee);
        // setState etant asynchrone, on peut avoir la valeur modifiée
        // en utilisant la fonction de retour comme ci-dessous
        this.setState({ employees: this.state.employees.concat(employee) }, () => {
            if (nextAction === ACTION.CREATE_AND_UPDATE) {
                this.setEmployeeFromId(employee.id);
            } else {
                this.onResetEmployeeClick();
            }
        })
    }
    // Form Change Handler
    handleFirstNameChange = (event) => {
        let employee = this.state.employee;
        employee.firstname = event.target.value;
        this.setState({ employee })
    }
    handleLastNameChange = (event) => {
        let employee = this.state.employee;
        employee.lastname = event.target.value;
        this.setState({ employee })
    }
    handleJobChange = (event) => {
        let employee = this.state.employee;
        employee.job = event.target.value;
        this.setState({ employee })
    }
    handleContactChange = (event) => {
        let employee = this.state.employee;
        employee.contact = event.target.value;
        this.setState({ employee })
    }
    handleAdressChange = (event) => {
        let employee = this.state.employee;
        employee.adress = event.target.value;
        this.setState({ employee })
    }
    render(){
        return(
            <div>
                <Header />
                <div className="row m-3">
                    <div className="col-9">
                        <div className="card">
                            <div className="card-header">
                                Liste des Employees
                            </div>
                            <div className="card-body table-responsive">
                                <table className="table table-head-fixed table-striped table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nom & Prenom</th>
                                            <th>Poste</th>
                                            <th>Adresse</th>
                                            <th>Contact</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { this.state.employees.map((employee) => (
                                        <tr key={ employee.id }>
                                            <td>{ employee.id }</td>
                                            <td>{ employee.firstname } { employee.lastname }</td>
                                            <td>{ employee.job }</td>
                                            <td>{ employee.adress }</td>
                                            <td>{ employee.contact }</td>
                                            <td>
                                                <Button
                                                    className="mx-2"
                                                    level={ BUTTON_TYPE.WARNING }
                                                    onClick={ () => this.onUpdateEmployeeClick(employee.id) }
                                                    label="modifier"
                                                />
                                                <Button
                                                    className="mx-2"
                                                    level={ BUTTON_TYPE.DANGER }
                                                    onClick={ () => this.onDeleteEmployeeClick(employee.id) }
                                                    label="supprimer"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <span>
                                    { this.state.employee.id ? 'Modification Employée' : 'Creation Employée'}
                                </span>
                                <Button
                                    level={ BUTTON_TYPE.SECONDARY }
                                    onClick={ this.onResetEmployeeClick }
                                    label="reset"
                                />
                            </div>
                            <div className="card-body">
                                <form onSubmit={ this.handleFormSubmit }>
                                    <div className="form-group row">
                                        <label className="form-label">First Name:</label>
                                        <div className="">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={this.state.employee.firstname}
                                                onChange={this.handleFirstNameChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="form-label">Last Name:</label>
                                        <div className="">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={this.state.employee.lastname}
                                            onChange={this.handleLastNameChange}
                                            required
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="form-label">Job:</label>
                                        <div className="">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={this.state.employee.job}
                                            onChange={this.handleJobChange}
                                            required
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="form-label">Contact:</label>
                                        <div className="">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={this.state.employee.contact}
                                            onChange={this.handleContactChange}
                                            required
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="form-label">Adresse:</label>
                                        <div className="">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={this.state.employee.adress}
                                            onChange={this.handleAdressChange}
                                            required
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                    { this.state.employee.id ?
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button
                                                type="submit"
                                                value={ ACTION.UPDATE }
                                                label="modifier"
                                            />
                                        </div>
                                    : 
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button
                                                type="submit"
                                                value={ ACTION.CREATE_AND_UPDATE }
                                                label="créer et éditer"
                                            />
                                            <Button
                                                type="submit"
                                                value={ ACTION.CREATE }
                                                label="créer"
                                            />
                                        </div>
                                    }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default Employees