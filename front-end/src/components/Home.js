import { Component } from "react";

import { checkAuthentification } from '../common/with-authentification';
import { withRouter } from "../common/with-router";

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    checkAuthentification(this.props.router);
  }

  render() {
    return (
      <div className="jumbotron">
        BIENVENUE SUR L'ACCEUIL
      </div>
    );
  }
}

export default withRouter(Home);
