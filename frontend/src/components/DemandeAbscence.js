import { Component } from "react";
// import { useState } from "react";
import Header from './Header'
import $ from 'jquery'

class DemandeAbscence extends Component{
    constructor(props){
        super(props)
        this.state = {
            id_employee : "",
            date_demande : "",
            date_debut : "",
            date_fin : "",
            motif : ""
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
            alert("success")
        } catch (err) {
            console.log("error catched", err);
        }
    }
    render(){
        // const [id_employee, setid_employee] = useState([])
        // const [date_demande, setdate_demande] = useState([])
        // const [date_debut, setdate_debut] = useState([])
        // const [date_fin, setdate_fin] = useState([])
        // const [motif, setmotif] = useState([])
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
                                <input type="text" className="form-control" name="id_employee"></input>
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