import React from "react";
import AppSideBar from "../../layout/sidebar/AppSideBar";
import AppContent from "../../layout/Dashboard/AppContent";
import AppHeader from "../../layout/Dashboard/AppHeader";
import AppFooter from "../../layout/Dashboard/AppFooter";
import { AuthenticationService } from "../../services/AuthServices";
import Config from "../../config";
import { withRouter } from "../../WithRouter";
class DashboardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
  }
  componentDidMount() {
    var currentUser = AuthenticationService.currentUserValue;
    if (currentUser === null || currentUser === undefined)  {
      AuthenticationService.logout();
      this.props.navigate(Config.signInPath);
    }
  }
  render() {
    return (
      <div>
        <AppSideBar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    );
  }
}
export default withRouter(DashboardHome);
