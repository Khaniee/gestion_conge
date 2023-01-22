import { Component } from "react";
import Header from './Header'
import $ from 'jquery'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class DemandeAbscence extends Component{
    constructor(props){
        super(props)
        this.state = {
            // id_employee : "",
            // date_demande : "",
            // date_debut : "",
            // date_fin : "",
            // motif : "",
            employees : []
        }

    }
    /**
     * 
     * @param {Any} data - Data passed is not stringified, and will be stringified inside the function
     * @returns - Json response of the call
     */
    postDemandeAbscence = async (data) => {
        const url = "http://localhost:8000/api/abscences/"
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
    componentDidMount = ()=>{
        const url= "http://localhost:8000/api/employees/"
        fetch(url)
            .then((res) => res.json())
            .then((data) => this.setState({employees: data["data"]}))
    } 
    submit = async (e) => {
        e.preventDefault()
        let array = $('#demandeForm').serializeArray()
        let final_array = {}
        $.map(array, (n,i)=>{
            final_array[n['name']] = n['value']
        })
        try {
            const rawResponse = await this.postDemandeAbscence(final_array);
            const response = await rawResponse.json();
        
            if (!rawResponse.ok) {
                console.log("error_detail :", response)
                
                // OK
                // throw new Error("error has occured");
                
                // OK ?
                // eslint-disable-next-line no-throw-literal
                throw {
                    name: "ERROR",
                    message: "SOMETHING GONE BAD (-_-)",
                    extra: response,
                }
            }
            console.log(response);
            
            MySwal.fire(
                "insertion effectué avec succès",
                "",
                "success"
            )
            // réinitialise le formulaire pour permmetre
            // l'initiation d'une autre demande
            // NB: l'objet JQuery n'ayant pas la méthode nécessaire
            // on utilise l'Element DOM Javascript
            $('#demandeForm')[0].reset()
        } catch (err) {
            MySwal.fire(
                "erreur lors de l'insertion",
                err,
                "error"
            )
        }
    }
    render(){
        const {employees} = this.state
        return(
            <div>
                <Header />
                <div className="centerBox">
                <div className="card w-50">
                    <div className="card-header">
                        Veuillez remplir le formulaire
                    </div>
                        <div className="card-body">
                            <form className="form" onSubmit={this.submit} id="demandeForm">
                                <label className="form-label">Nom</label>
                                <select className="form-control" name="id_employee" id="">
                                    {employees.map(e=>(
                                            <option value={e.id}>{e.lastname+" "+e.firstname}</option>
                                    ))}
                                </select>
                                <label className="form-label">date de la demande</label>
                                <input type="date" className="form-control" name="date_demande"></input>
                                <label className="form-label">date de début abscence</label>
                                <input type="date" className="form-control" name="date_debut"></input>
                                <label className="form-label" >date de fin abscence</label>
                                <input type="date" className="form-control" name="date_fin"></input>
                                <input type="hidden" className="form-control" name="valide" value=""></input>
                                <label className="form-label" >Motif</label>
                                <textarea className="form-control" name="motif">

                                </textarea>
                                <div className="mt-5 text-center">
                                    <button className="btn btn-primary" type="submit">
                                    Envoyer la demande
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DemandeAbscence