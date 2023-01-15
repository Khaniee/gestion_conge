import { Component } from "react";
import {get, post} from "./../utils/API"

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            orders : [],
            name: "",
            price: ""
        }
    }
    async componentDidMount() //async : recuperer db avant vue
    {
        //qd on charge la page
        try{
            const{data} = await get('orders')
            console.log("data: ", data.data)
            var orders = data.data
            this.setState({orders: orders})
        }catch(e){
            console.log("error: ", e)
        }
    }
    render(){
        return(
            <div className="container">
                <div className="card p-3 mt-3">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Order Name</label>
                            <input 
                            type = "text"
                            name = "name"
                            value = ""
                            placeholder = "Order name"
                            className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Order Price</label>
                            <input 
                            type = "text"
                            name = "price"
                            value = ""
                            placeholder = "Order price"
                            className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <center>
                            <button className="btn btn-primary mt-3 w-50"
                            Style="border-radius: 100px">
                                Save
                            </button>
                        </center>
                    </div>
                </div>
                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* if (this) echo this
                            equivalent -> this && this */}
                            {this.state.orders && this.state.orders.map(
                                (order, idx) => {
                                    return(
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{order && order.name}</td>
                                            <td>{order && order.price}</td>
                                        </tr>   
                                    )
                                }
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Home;