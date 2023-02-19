import { Component } from "react";
import { withRouter } from "../common/with-router";
import { login, whoami } from "../services/auth";

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: "",
      password: "",
      loading: false,
      message: "",
    }
  }

  handleLogin = async (event) => {
    event.preventDefault();

    this.setState({
      message: "",
      loading: true,
    })

    try {
      const res = await login(this.state.login, this.state.password);
      if (res && res.detail) {
        this.setState({ message: res.detail });
      } else {
        this.props.router.navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      this.setState({ message: "ERREUR INCONNU" })
    }

    this.setState({ loading: false });
  }

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  onChangeLogin = (event) => {
    this.setState({
      login: event.target.value,
    });
  }

  render() {
    return (
      <div className="centerBox">
        <div className="card w-50">
          <div className="card-header">
            Veuillez vous authentifier
          </div>
          <div className="card-body">
            <form
              className="form"
              onSubmit={this.handleLogin}
            >
              <label className="form-label">
                Login
              </label>

              <input
                className="form-control"
                type="text"
                value={this.state.login}
                onChange={this.onChangeLogin}
              />

              <label className="form-label">
                Mot de passe
              </label>

              <input
                className="form-control"
                type="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />

              <div className="text-center  mt-5">
                {this.state.message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  </div>
                )}
                <button
                  className="btn btn-primary"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Se connecter</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Login);