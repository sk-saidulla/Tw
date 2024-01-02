import React, { Suspense } from "react";
import {
  Outlet
} from "react-router-dom";
import { CSpinner } from "@coreui/react";
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
