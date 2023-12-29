import React from "react";
import { withRouter } from "../../../WithRouter";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSwitch,
} from "@coreui/react";
import TreeList, {
  Column,
  SearchPanel,
  Editing,
} from "devextreme-react/tree-list";
class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <CCol xs={12}>
        <CCard className="mb-4" style={{ margin: "20px" }}>
          <CCardHeader>
            <h4>
              <strong>View</strong> <small>Groups</small>
            </h4>
          </CCardHeader>
          <CCardBody>
            <TreeList
              columnAutoWidth={true}
              showRowLines={true}
              showBorders={true}
              dataSource={this.state.rows}
              autoExpandAll={this.state.autoExpand}
              onSaving={this.EditCell}
            >
              <Editing allowUpdating={true} mode="row" />
              <SearchPanel visible={true} width={250} />

              {/* <Scrolling mode="standard" />
                                            <Paging enabled={true} defaultPageSize={10} />
                                            <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} showInfo={true} /> */}

              <Column dataField="name" />
              <Column dataField="description" />
              {/* <Column caption="Action" type="buttons">
                <Button name="edit" />
              </Column> */}
            </TreeList>
          </CCardBody>
        </CCard>
      </CCol>
    );
  }
}
export default withRouter(Groups);
