import React from "react";
import { CContainer } from "@coreui/react";
import { AuthenticationService } from "../../../services/AuthServices";
import Config from "../../../config";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var currentUser = AuthenticationService.currentUserValue;
    if (currentUser === null || currentUser === undefined) {
      AuthenticationService.logout();
      this.props.navigate(Config.signInPath);
    }
  }
  render() {
    return (
      // <CContainer>
      //   <h>Dashboard1</h>
      // </CContainer>
      <h1>Dashboard</h1>
    );
  }
}

export default Index;
