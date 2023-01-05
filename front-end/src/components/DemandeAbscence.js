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
    submit(e){
        e.preventDefault()
        let array = $('#demandeForm').serializeArray()
        let final_array = {}
        $.map(array, (n,i)=>{
            final_array[n['name']] = n['value']
        })
        // console.log(test)
        let data = JSON.stringify(final_array)
        console.log(data)
        const url = "http://localhost:8000/api/abscences/"
        $.ajax({
            type: "POST",
            url: url,
            data: final_array,
            dataType: 'application/json',
            success: ()=>{
                alert('ok')
            }
        })
        // fetch(url, {
        //     method: 'POST',
        //     mode : 'cors',
        //     body : data
        // })
        alert("success")
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