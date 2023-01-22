import { Component } from "react";

export const BUTTON_TYPE = {
    PRIMARY: 'btn-primary',
    SECONDARY: 'btn-secondary',
    DANGER: 'btn-danger',
    SUCCESS: 'btn-success',
    WARNING: 'btn-warning',
    INFO: 'btn-info',
}

class Button extends Component {

    constructor(props) {
        super(props);
        this.level = props.level ? props.level : BUTTON_TYPE.PRIMARY
        this.type = props.type ? props.type : "button"
        this.value = props.value ? props.value : ""
    }

    handleClick = () => {
        this.props.onClick();
    }
    
    render(){
        return (
            <button
                type={ this.type }
                value={ this.value }
                className={`btn btn-sm ${this.level} text-uppercase fw-bold ${this.props.className}`}
                onClick={ this.handleClick }
            >
                <small>{ this.props.children ? this.props.children : this.props.label }</small>
            </button>
        )
    }
}
export default Button;