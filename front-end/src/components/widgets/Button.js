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
    render(){
        return (
            <button
                type={ this.props.type ? this.props.type : "button"  }
                value={ this.props.value ? this.props.value : "" }
                className={`btn btn-sm ${ this.props.level ? this.props.level : BUTTON_TYPE.PRIMARY } text-uppercase fw-bold ${this.props.className}`}
                onClick={ () => this.props.onClick() }
            >
                <small>{ this.props.children ? this.props.children : this.props.label }</small>
            </button>
        )
    }
}
export default Button;