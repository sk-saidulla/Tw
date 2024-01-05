import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import * as Yup from "yup";
import DocsExample from "../../../components/DocsExample";
import { IMaskMixin } from "react-imask";
import { Formik, ErrorMessage, Form } from "formik";
import Select from "react-select";
import { AuthenticationService } from "../../../services/AuthServices";
import { withRouter } from "../../../WithRouter";
import Config from "../../../config";
import { CSpinner } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilArrowThickRight,
} from "@coreui/icons";
import notify from "devextreme/ui/notify";
import { GroupServices } from "../../../services/GroupServices";
const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
  <CFormInput {...props} ref={inputRef} />
));
const rowSize = "20px";
const requirementIcon = "4px";
class CreateGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isException:false,
      underGroups: [],
      groupName: "",
      underGroup: 0,
      description: "",
    };

    this.onTextChange = this.onTextChange.bind(this);

    this.onDropDownChange = this.onDropDownChange.bind(this);
  }
  componentDidMount() {
    // var currentUser = AuthenticationService.currentUserValue;
    // if (currentUser === null || currentUser === undefined)  {
    //   AuthenticationService.logout();
    //   this.props.navigate(Config.signInPath);
    // }
    GroupServices.getAccountGroups().then(
      (res) => {
        if (res.isSuccess) {
          var ret = [];
          res.accountGroupRoot.map((group) => {
            ret.push({
              label: group.name,
              value: { label: group.name, value: group.id },
            });
          });

          this.setState({ underGroups: ret });
        }
        else{
          this.setState({ isException: true });
        }
      },
      (error) => {
        this.setState({ isException: true });
      }
    );
  }

  onTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDropDownChange = (value, action) => {
    this.setState({ [action.name]: value.value });
  };
  render() {
    if(this.state.isException){
      throw new Error();
    }
    return (
      <>
        <CCol xs={12}>
          <CCard className="mb-4" style={{ margin: "20px" }}>
            <CCardHeader>
              <h4>
                <strong>Create</strong> <small>Groups</small>
              </h4>
            </CCardHeader>
            <CCardBody>
              <Formik
                enableReinitialize
                initialValues={{
                  groupName: this.state.groupName,
                  underGroup: this.state.underGroup,
                  description: this.state.description,
                }}
                validationSchema={Yup.object().shape({
                  groupName: Yup.string().required("this field is required"),
                  underGroup: Yup.object()
                    .shape({
                      label: Yup.string(),
                      value: Yup.string(),
                    })
                    .nullable()
                    .required("This field is required"),
                })}
                onSubmit={(
                  { groupName, underGroup, description },
                  { setStatus, setSubmitting }
                ) => {
                  GroupServices.saveAccountGroups(
                    groupName,
                    underGroup.value,
                    description
                  ).then(
                    async (res) => {
                      if (res.isSuccess) {
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
                          2000
                        );
                        await new Promise((resolve) =>
                          setTimeout(resolve, 2000)
                        );
                        this.props.navigate("/dashboardhome/groups");
                      } else {
                        notify(
                          {
                            message: res.message,
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
                    },
                    (error) => {
                      setSubmitting(false);
                      notify(
                        {
                          message: "Internal Server Error",
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
                  );
                  setStatus();
                }}
                render={({ values, errors, status, touched, isSubmitting }) => (
                  <Form>
                    <div style={{ marginTop: rowSize }}>
                      <CRow>
                        <CCol md={6}>
                          <CFormLabel htmlFor="groupName">
                            Name
                            <span
                              style={{
                                color: "red",
                                marginLeft: requirementIcon,
                              }}
                            >
                              *
                            </span>
                          </CFormLabel>
                          <CFormInput
                            type="text"
                            name="groupName"
                            value={this.state.groupName}
                            onChange={this.onTextChange}
                            placeholder="Enter Group Name"
                            className={
                              "form-control" +
                              (errors.groupName && touched.groupName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="groupName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel htmlFor="underGroup">
                            Under Group
                            <span
                              style={{
                                color: "red",
                                marginLeft: requirementIcon,
                              }}
                            >
                              *
                            </span>
                          </CFormLabel>
                          <Select
                            name="underGroup"
                            value={this.state.underGroup}
                            onChange={this.onDropDownChange}
                            options={this.state.underGroups}
                            classNamePrefix="select"
                            className={
                              errors.underGroup && touched.underGroup
                                ? " is-invalid"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="underGroup"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CCol>
                      </CRow>
                    </div>

                    <div style={{ marginTop: rowSize }}>
                      <CRow>
                        <CCol md={6}>
                          <CFormLabel htmlFor="description">
                            Description
                          </CFormLabel>
                          <CFormTextarea
                            rows={2}
                            type="text"
                            name="description"
                            onChange={this.onTextChange}
                            value={this.state.description}
                            placeholder="Enter Description"
                            className={
                              "form-control" +
                              (errors.description && touched.description
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CCol>
                      </CRow>
                    </div>

                    <div style={{ marginTop: rowSize }}></div>
                    <CCol xs={12}>
                      <div style={{ float: "right" }}>
                        <CButton
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting && (
                            <CSpinner
                              component="span"
                              size="sm"
                              aria-hidden="true"
                            />
                          )}
                          Create Group
                          {isSubmitting === true ? (
                            "..."
                          ) : (
                            <CIcon
                              style={{ marginLeft: "5px", paddingTop: "3px" }}
                              icon={cilArrowThickRight}
                              size="lg"
                            />
                          )}
                        </CButton>
                      </div>
                    </CCol>
                    {/* {status && (
                      <div className={"alert alert-danger"}>{status}</div>
                    )}
                    <p>
                      <pre>{JSON.stringify(values, null, 2)}</pre>
                    </p> */}
                  </Form>
                )}
              />

              <DocsExample href="forms/validation"></DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
      </>
    );
  }
}

export default withRouter(CreateGroups);
