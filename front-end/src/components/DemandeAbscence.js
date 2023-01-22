import { Component } from "react";
import Header from './Header'
import $ from 'jquery'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './../css/demandeAbscence.css';

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
    send = ()=>{
        let env = document.querySelector(".envelope");
        let envPos = env.getBoundingClientRect()
        let boite = document.querySelector("#boite")
        let boitePos = boite.getBoundingClientRect();
        let wrapper = document.querySelector(".wrapper");
        let demandeForm = document.querySelector("#demandeForm");
        let old = { ... wrapper.style };
        
        wrapper.classList.add("wrapperClose")
        wrapper.classList.remove("wrapper")
        setTimeout(() => { 
            wrapper.classList.add("send")
            wrapper.style.transform = `translateY(${(boitePos.top - envPos.top)}px) translateX(${(boitePos.right - envPos.right + 200)}px) perspective(50px) translateZ(-200px) `
        }, 1200);   
        setTimeout(() => { 
            MySwal.fire(
                "Demande bien envoyé",
                "",
                "success"
            ).then(()=>{
                setTimeout(() => { 
                    wrapper.classList.remove("send")
                    wrapper.style = old;
                    wrapper.classList.add("wrapper")
                    wrapper.classList.remove("wrapperClose")
                }, 500); 
            })
        }, 2500);
        // setTimeout(() => { 
        //     document.querySelector('#ok').style.display= "block";
        // }, 2500); 
        // setTimeout(() => { 
        //     document.querySelector('#ok').style.display= "none";
        // }, 4500); 
        // setTimeout(() => { 
        //     env.classList.remove("send")
        //     env.style = old;
        //     wrapper.classList.add("wrapper")
        //     wrapper.classList.remove("wrapperClose")
        // }, 5000); 
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
            
            // réinitialise le formulaire pour permmetre
            // l'initiation d'une autre demande
            // NB: l'objet JQuery n'ayant pas la méthode nécessaire
            // on utilise l'Element DOM Javascript
            $('#demandeForm')[0].reset()
            this.send()

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
            <div className="demandeAbscence">
                {/* <Header /> */}
                <img src="./images/boite.png" className="boite" id="boite" alt="dfgdg"/>
                    <img src="./images/trois.gif"  className="boite" id="ok" Style="display: none" alt=""/>
                <div className="wrapper">

                    <div className="lid one "></div>
                    <div className="lid two "></div>
                    <div className="envelope "></div>
                    <div className="fond "></div>
                    <div className="patch ">

                    </div>
                    <div className="letter ">
                        {/* <p>Hello lova</p> */}
                        <form className="form" onSubmit={this.submit} id="demandeForm">
                                <div className="form-group row">
                                    <label for="inputName" className="col-5 col-form-label">Nom</label>
                                    <div className="col-7">
                                    <select className="form-control" name="id_employee" id="" required>
                                    {employees.map(e=>(
                                            <option value={e.id}>{e.lastname+" "+e.firstname}</option>
                                    ))}
                                </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputName" className="col-5 col-form-label">date de la demande</label>
                                    <div className="col-7">
                                    <input type="date" className="form-control" name="date_demande" required></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputName" className="col-5 col-form-label">début abscence</label>
                                    <div className="col-7">
                                    <input type="date" className="form-control" name="date_debut" required></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label for="inputName" className="col-5 col-form-label">fin abscence</label>
                                    <div className="col-7">
                                    <input type="date" className="form-control" name="date_fin" required></input>
                                    </div>
                                </div>
                                <input type="hidden" className="form-control" name="valide" value="" required></input>
                                <label className="form-label" >Motif</label>
                                <textarea className="form-control" name="motif" rows="1" required>

                                </textarea>
                                <div className="mt-2 text-center">
                                    <button className="btn btn-primary btn-sm"  type="submit">
                                    Envoyer la demande
                                    </button>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default DemandeAbscence