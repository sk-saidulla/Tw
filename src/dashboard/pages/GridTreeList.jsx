import React from "react";
import AppSideBar from "../../layout/sidebar/AppSideBar";
import AppContent from "../../layout/Dashboard/AppContent";
import AppHeader from "../../layout/Dashboard/AppHeader";
import AppFooter from "../../layout/Dashboard/AppFooter";
import { AuthenticationService } from "../../services/AuthServices";
import Config from "../../config";
import { withRouter } from "../../WithRouter";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "devextreme-react";
import ODataStore from "devextreme/data/odata/store";
import DashboardDataGrid from "../../components/DashboardDataGrid";
import DashboardTreeList from "../../components/DashboardTreeList";
import DashboardSelect from "../../components/DashboardSelect";

const pageSizes = [10, 25, 50, 100];

class GridTreeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // var currentUser = AuthenticationService.currentUserValue;
    // if (currentUser === null || currentUser === undefined)  {
    //   AuthenticationService.logout();
    //   this.props.navigate(Config.signInPath);
    // }
  }
  render() {
    return (
      <div
        style={{
          padding: "0 20px ",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h3>Select</h3>
        <DashboardSelect />
        <br />
        <h3>Data Grid</h3>
        <DashboardDataGrid />
        <h3>Tree List</h3>
        <DashboardTreeList />
        <br />

        <br />
        <br />
      </div>
    );
  }
}
export default GridTreeList;
