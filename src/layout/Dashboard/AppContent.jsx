import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Outlet
} from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
import routes from "../../routes";
class AppContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    return (
      <>
      
      {/* <CContainer  > */}
        <Suspense fallback={<CSpinner color="primary" />}>
          <Outlet/>
        </Suspense>
      {/* </CContainer> */}
      </>
      
    );
  }
}
export default AppContent;
