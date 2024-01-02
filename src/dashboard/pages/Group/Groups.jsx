import React from "react";
import { withRouter } from "../../../WithRouter";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSwitch,
  CRow,
} from "@coreui/react";
import {
  TreeList,
  Editing,
  Column,
  RequiredRule,
  Paging,
  Pager,
  SearchPanel,
  Scrolling,
} from "devextreme-react/tree-list";
import CIcon from "@coreui/icons-react";
import { cilArrowThickRight } from "@coreui/icons";
import { GroupServices } from "../../../services/GroupServices";
import { AuthenticationService } from "../../../services/AuthServices";
import Config from "../../../config";
import notify from "devextreme/ui/notify";
// import { Button } from "devextreme-react/button";
const allowedPageSizes = [5, 10, 20];
class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isException: false,
      groups: [],
      isExpand: false,
    };
    this.loadDataToGrid = this.loadDataToGrid.bind(this);
    this.onSwitchBoxChange = this.onSwitchBoxChange.bind(this);
    this.EditCell = this.EditCell.bind(this);
  }
  componentDidMount() {
    var currentUser = AuthenticationService.currentUserValue;
    if (currentUser === null || currentUser === undefined) {
      AuthenticationService.logout();
      this.props.navigate(Config.signInPath);
    }
    this.loadDataToGrid();
  }
  loadDataToGrid = () => {
    GroupServices.getAccountGroups().then(
      (res) => {
        if (res.isSuccess) {
          res.accountGroupRoot.map((group) => {
            var data = {
              id: group.id,
              name: group.name,
              description: group.description,
              isDefault: group.isDefault,
              parentId: group.parentId,
            };
            ret.push(data);
          });
          this.setState({ groups: ret });
        } else {
          this.setState({ isException: true });
        }
      },
      (error) => {
        this.setState({ isException: true });
      }
    );
    let ret = [];
  };
  onSwitchBoxChange = (e) => {
    this.setState({ isExpand: true });
  };

  EditCell = (e) => {
    if (e.changes.length == 0) {
      notify(
        {
          message: "Not Changes Any Group",
          width: 400,
          position: {
            my: "center top",
            at: "center top",
          },
        },
        "error",
        4000
      );
    } else {
      var name1, description1;
      let data = this.state.groups.find((v) => v.id === e.changes[0].key);
      if (data && data.isDefault == false) {
        if (e.changes[0].data.name == undefined) {
          name1 = data.name;
          description1 = e.changes[0].data.description;
        }
        if (e.changes[0].data.description == undefined) {
          description1 = data.description;
          name1 = e.changes[0].data.name;
        }
        if (
          e.changes[0].data.name != undefined &&
          e.changes[0].data.description != undefined
        ) {
          name1 = e.changes[0].data.name;
          description1 = e.changes[0].data.description;
        }
        GroupServices.updateAccountGroup(data.id, name1, description1).then(
          (res) => {
            if (res.isSuccess === true) {
              notify(
                {
                  message: res.message,
                  width: 400,
                  position: {
                    my: "center top",
                    at: "center top",
                  },
                },
                "success",
                4000
              );
              this.loadDataToGrid();
            }
          }
        );
      } else {
        this.loadDataToGrid();
        notify(
          {
            message: "Parent Groups Can Not Edit",
            width: 400,
            position: {
              my: "center top",
              at: "center top",
            },
          },
          "error",
          4000
        );
      }
    }
  };
  render() {
    if(this.state.isException){
      throw new Error();
    }
    return (
      <CCol xs={12}>
        <CCard className="mb-4" style={{ margin: "20px" }}>
          <CCardHeader>
            <CRow>
              <CCol xs={6}>
                <h4>
                  <strong>View</strong> <small>Groups</small>
                </h4>
              </CCol>
              <CCol xs={6}>
                <span style={{ float: "right" }}>
                  <CButton
                    color="primary"
                    onClick={() => {
                      this.props.navigate("/dashboardhome/groups/creategroups");
                    }}
                  >
                    Create Groups
                    <CIcon
                      style={{ marginLeft: "5px", paddingTop: "3px" }}
                      icon={cilArrowThickRight}
                      size="lg"
                    />
                  </CButton>
                </span>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CFormSwitch
              size="xl"
              name="isExpand"
              checked={this.state.isExpand}
              onChange={this.onSwitchBoxChange}
              label="Expand All Groups"
            />

            <TreeList
              columnAutoWidth={true}
              showRowLines={true}
              showBorders={true}
              dataSource={this.state.groups}
              autoExpandAll={this.state.isExpand}
              onSaving={this.EditCell}
              keyExpr="id"
              parentIdExpr="parentId"
            >
              <Editing allowUpdating={true} mode="row" caption="h" />
              <Scrolling mode="standard" />
              <Paging enabled={true} defaultPageSize={16} />
              <Pager
                // showPageSizeSelector={true}
                allowedPageSizes={allowedPageSizes}
                showInfo={true}
              />
              <SearchPanel visible={true} width={250} />
              <Column dataField="name" RequiredRule>
                {" "}
                <RequiredRule message="this field is required" />
              </Column>
              <Column dataField="description" />
              <Column type="buttons" caption="Update"></Column>
            </TreeList>
          </CCardBody>
        </CCard>
      </CCol>
    );
  }
}
export default withRouter(Groups);
