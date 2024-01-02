import React from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardHeader,
  CAlert,
} from "@coreui/react";
import { CSpinner } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { AuthenticationService } from "../services/AuthServices";
import { Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { withRouter } from "../WithRouter";
import Config from "../config";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      alert: false,
      errorMessage: "",
    };
    this.onTextChange = this.onTextChange.bind(this);
  }
  componentDidMount() {
    localStorage.clear();
    var currentUser = AuthenticationService.currentUserValue;
    if (currentUser !== null && currentUser !== undefined) {
      this.props.navigate(Config.dahboardUrl);
    }
  }
  onTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <Formik
              enableReinitialize
              initialValues={{
                username: this.state.username,
                password: this.state.password,
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required("this field is required"),
                password: Yup.string().required("this field is required"),
              })}
              onSubmit={(
                { username, password },
                { setStatus, setSubmitting }
              ) => {
                setSubmitting(true);
                this.setState({ alert: false, errorMessage: "" });
                AuthenticationService.login(username, password).then(
                  (res) => {
                    if (res.isSuccess) {
                      this.props.navigate("/dashboardhome/dashboard");
                      return;
                    }
                    this.setState({ alert: true, errorMessage: res.message });
                    setSubmitting(false);
                  },
                  (error) => {
                    this.setState({
                      alert: true,
                      errorMessage: "Internal Server Error!",
                    });
                    setSubmitting(false);
                  }
                );

                setStatus();
              }}
              render={({ values, errors, status, touched, isSubmitting }) => (
                <Form>
                  <CCol md={8}>
                    <CCardGroup>
                      <CCard className="p-4">
                        {this.state.alert && (
                          <CCardHeader
                            style={{ backgroundColor: "transparent" }}
                          >
                            <CAlert color="danger">
                              {this.state.errorMessage}
                            </CAlert>
                          </CCardHeader>
                        )}

                        <CCardBody>
                          <h1>Login</h1>
                          <p className="text-body-secondary">
                            Sign In to your account
                          </p>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              name="username"
                              placeholder="Enter Username"
                              autoComplete="username"
                              onChange={this.onTextChange}
                              className={
                                "form-control" +
                                (errors.username && touched.username
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="invalid-feedback"
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-4">
                            <CInputGroupText>
                              <CIcon icon={cilLockLocked} />
                            </CInputGroupText>
                            <CFormInput
                              name="password"
                              type="password"
                              placeholder="Enter Password"
                              autoComplete="current-password"
                              onChange={this.onTextChange}
                              className={
                                "form-control" +
                                (errors.password && touched.password
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                          </CInputGroup>
                          <CRow>
                            <CCol xs={6}>
                              <CButton
                                type="submit"
                                color="primary"
                                className="px-4"
                                onClick={this.login}
                                disabled={isSubmitting}
                              >
                                {isSubmitting && (
                                  <CSpinner
                                    component="span"
                                    size="sm"
                                    aria-hidden="true"
                                  />
                                )}
                                Login{isSubmitting && "..."}
                              </CButton>
                            </CCol>
                            <CCol xs={6} className="text-right">
                              <CButton color="link" className="px-0">
                                Forgot password?
                              </CButton>
                            </CCol>
                          </CRow>
                        </CCardBody>
                      </CCard>
                      <CCard
                        className="text-white bg-primary py-5"
                        style={{ width: "44%" }}
                      >
                        <CCardBody className="text-center">
                          <div>
                            <h2>BBSC</h2>
                            <p style={{ fontSize: "18px" }}>
                              <b>Bipin Bihari Singh Private Limmited</b>
                            </p>
                            <p>
                              You will be able to see through this software that
                              if any insurance of your vehicle is not failed.
                            </p>
                            <Link to="/register">
                              <CButton
                                color="primary"
                                className="mt-3"
                                active
                                tabIndex={-1}
                              >
                                Go To Home!
                              </CButton>
                            </Link>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCardGroup>
                  </CCol>
                </Form>
              )}
            />
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default withRouter(Login);
