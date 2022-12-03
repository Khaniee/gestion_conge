import { Component } from "react";
import Header from './Header'
class DemandeAbscence extends Component{
    constructor(props){
        super(props)
        this.state = {
            employee : "",
            date : "",
            debut_abscence : "",
            fin_abcence : "",
            motif : ""
        }
    }
    render(){
        return(
            <div>
                <Header />
                <div className="centerBox">
                <div className="card w-50">
                    <div className="card-header">
                        Veuillez remplir le formulaire
                    </div>
                        <div className="card-body">
                            <form className="form">
                                <label className="form-label">Nom</label>
                                <input type="text" className="form-control"></input>
                                <label className="form-label">date de la demande</label>
                                <input type="date" className="form-control"></input>
                                <label className="form-label">date de début abscence</label>
                                <input type="date" className="form-control"></input>
                                <label className="form-label">date de fin abscence</label>
                                <input type="date" className="form-control"></input>
                                <label className="form-label">Motif</label>
                                <textarea className="form-control" >

                                </textarea>
                                <div className="mt-5 text-center">
                                    <button className="btn btn-primary">
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