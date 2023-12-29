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
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSwitch,
} from "@coreui/react";
import * as Yup from "yup";
import DocsExample from "../../../components/DocsExample";
import { IMaskMixin } from "react-imask";
import { Formik, ErrorMessage, Form } from "formik";
import Select from "react-select";
import { CompanyServices } from "../../../services/CompanyServices";
import { AuthenticationService } from "../../../services/AuthServices";
import { LocationService } from "../../../services/LocationServices";
import { GstServices } from "../../../services/GstServices";
import { withRouter } from "../../../WithRouter";
import Config from "../../../config";
import * as moment from "moment";
import { CSpinner } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowThickRight } from "@coreui/icons";
import notify from "devextreme/ui/notify";
const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }) => (
  <CFormInput {...props} ref={inputRef} />
));
const rowSize = "20px";
const requirementIcon="4px";
class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      states: [],
      gstLocations: [],
      companyName: "",
      legalName: "",
      mallingName: "",
      country: "",
      state: "",
      address: "",
      phoneNumber: "",
      email: "",
      pan: "",
      isGstApplicable: false,
      gstNumber: "",
      gstUserName: "",
      gstLocation: "",
      applicableFrom: "",
      isEinvoice: false,
      eInvoiceUserName: "",
      eInvoicePassword: "",
      isEwayBill: false,
      ewayBillUserName: "",
      eWayBilPassword: "",
      tdsApplicable: false,
      tanNumber: "",
      tdsapplicableFrom: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.loadCompanyData = this.loadCompanyData.bind(this);
    this.onDropDownChange = this.onDropDownChange.bind(this);
  }
  componentDidMount() {
    var currentUser = AuthenticationService.currentUserValue;
    if (!currentUser) {
      AuthenticationService.logout();
      this.props.navigate(Config.signInPath);
    }
    LocationService.getCountry().then(
      (res) => {
        if (res.isSuccess) {
          let ret = [];
          res.countries.map((country) => {
            ret.push({
              label: country.countryName,
              value: { label: country.countryName, value: country.id },
            });
          });
          this.setState({ countries: ret });
        }
      },
      (error) => {}
    );
    GstServices.getGstLocations().then(
      (res) => {
        if (res.isSuccess) {
          let ret = [];
          res.locations.map((gstLocation) => {
            ret.push({
              label: gstLocation.locationName,
              value: {
                label: gstLocation.locationName,
                value: gstLocation.locationCode,
              },
            });
          });
          this.setState({ gstLocations: ret });
        }
      },
      (error) => {}
    );
    CompanyServices.getCompanyDetails().then(
      (res) => {
        if (res.isSuccess) {
          this.loadCompanyData(res);
        }
      },
      (error) => {}
    );
  }
  loadCompanyData = (res) => {
    this.setState({
      companyName: res.companyName,
      legalName: res.aliasName,
      mallingName: res.mailingName,
      country: res.address && {
        label: res.address.country,
        value: res.address.countryId,
      },
      state: res.address && {
        label: res.address.state,
        value: res.address.stateId,
      },
      address: res.address.address,
      phoneNumber: res.phoneNo,
      email: res.email,
      pan: res.pan,
      isGstApplicable: res.isGstApplicable,
      gstNumber: res.gstNumber,
      gstUserName: res.gstUserName,
      gstLocation: res.gstStateCode,
      applicableFrom: res.gstApplicableFrom
        ? moment(res.gstApplicableFrom).format("YYYY-MM-DD")
        : "",
      isEinvoice: res.isEInvoiceApplicable,
      eInvoiceUserName: res.eInvoiceUserName,
      eInvoicePassword: res.eInvoicePassword,
      isEwayBill: res.isEwayBillApplicable,
      ewayBillUserName: res.ewayBillUserName,
      eWayBilPassword: res.ewayBillPassword,
      tdsApplicable: res.isTdsApplicable,
      tanNumber: res.tinNumber,
      tdsapplicableFrom: res.tdsApplicableFrom
        ? moment(res.tdsApplicableFrom).format("YYYY-MM-DD")
        : "",
    });
  };

  onTextChange = (e) => {
    debugger;
    this.setState({ [e.target.name]: e.target.value });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  };
  onDropDownChange(value, action) {
    this.setState({ [action.name]: value.value });
    if (action.name == "country") {
      var ret = [];
      LocationService.getStates(value.value.value).then(
        (res) => {
          if (res.isSuccess) {
            res.states.map((state) => {
              ret.push({
                label: state.stateName,
                value: { label: state.stateName, value: state.id },
              });
            });
            this.setState({ states: ret });
          }
        },
        (error) => {}
      );
    }
  }
  render() {
    return (
      <>
        <CCol xs={12}>
          <CCard className="mb-4" style={{ margin: "20px" }}>
            <CCardHeader>
              <h4>
                <strong>Company</strong> <small>Information</small>
              </h4>
            </CCardHeader>
            <CCardBody>
              <Formik
                enableReinitialize
                initialValues={{
                  companyName: this.state.companyName,
                  legalName: this.state.legalName,
                  mallingName: this.state.mallingName,
                  country: this.state.country,
                  state: this.state.state,
                  address: this.state.address,
                  phoneNumber: this.state.phoneNumber,
                  email: this.state.email,
                  pan: this.state.pan,
                  isGstApplicable: this.state.isGstApplicable,
                  gstNumber: this.state.gstNumber,
                  gstUserName: this.state.gstUserName,
                  gstLocation: this.state.gstLocation,
                  applicableFrom: this.state.applicableFrom,
                  isEinvoice: this.state.isEinvoice,
                  eInvoiceUserName: this.state.eInvoiceUserName,
                  eInvoicePassword: this.state.eInvoicePassword,
                  isEwayBill: this.state.isEwayBill,
                  ewayBillUserName: this.state.ewayBillUserName,
                  eWayBilPassword: this.state.eWayBilPassword,
                  tdsApplicable: this.state.tdsApplicable,
                  tanNumber: this.state.tanNumber,
                  tdsapplicableFrom: this.state.tdsapplicableFrom,
                }}
                validationSchema={Yup.object().shape({
                  isGstApplicable: Yup.boolean(),
                  isEinvoice: Yup.boolean(),
                  isEwayBill: Yup.boolean(),
                  tdsApplicable: Yup.boolean(),
                  companyName: Yup.string()
                    .required("this field is required")
                    .min(3, "Must be exactly 3 Charecter"),
                  legalName: Yup.string()
                    .required("this field is required")
                    .min(3, "Must be exactly 3 Charecter"),
                  mallingName: Yup.string()
                    .required("this field is required")
                    .min(3, "Must be exactly 3 Charecter"),
                  // country:Yup.string().required("this field is required"),
                  // state:Yup.string().required("this field is required")
                  address: Yup.string()
                    .required("this field is required")
                    .min(10, "Must be exactly 10 Charecter"),
                  phoneNumber: Yup.string()
                    .required("this field is required")
                    .min(16, "invalid phone number")
                    .max(16, "invalid phone number"),
                  email: Yup.string()
                    .required("this field is required")
                    .email("Valid Email is Required"),
                  pan: Yup.string()
                    .matches(
                      /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                      "invalid pan number"
                    )
                    .required("this field is required"),

                  // Yup.string().required("this field is required"),
                  gstNumber: Yup.string().when("isGstApplicable", {
                    is: true,
                    then: Yup.string()
                      .matches(
                        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}Z[0-9]{1}$/,
                        "invalid gGST number"
                      )
                      .required("this field is required"),
                  }),
                  gstUserName: Yup.string().when("isGstApplicable", {
                    is: true,
                    then: Yup.string().required("this field is required"),
                  }),
                  // gstLocation:
                  applicableFrom: Yup.date().when("isGstApplicable", {
                    is: true,
                    then: Yup.date().required("this field is required"),
                  }),
                  eInvoiceUserName: Yup.string().when("isEinvoice", {
                    is: true,
                    then: Yup.string().required("this field is required"),
                  }),
                  eInvoicePassword: Yup.string().when("isEinvoice", {
                    is: true,
                    then: Yup.string().required("this field is required"),
                  }),
                  ewayBillUserName: Yup.string().when("isEwayBill", {
                    is: true,
                    then: Yup.string().required("this field is required"),
                  }),
                  eWayBilPassword: Yup.string().when("isEwayBill", {
                    is: true,
                    then: Yup.string().required("this field is required"),
                  }),
                  tanNumber: Yup.string().when("tdsApplicable", {
                    is: true,
                    then: Yup.string().required("this field is required"),
                  }),
                  tdsapplicableFrom: Yup.date().when("tdsApplicable", {
                    is: true,
                    then: Yup.date().required("this field is required"),
                  }),
                })}
                onSubmit={(
                  {
                    isGstApplicable,
                    isEinvoice,
                    tdsApplicable,
                    companyName,
                    legalName,
                    mallingName,
                    country,
                    state,
                    address,
                    phoneNumber,
                    email,
                    pan,
                    gstNumber,
                    gstUserName,
                    gstLocation,
                    applicableFrom,
                    eInvoiceUserName,
                    eInvoicePassword,
                    isEwayBill,
                    ewayBillUserName,
                    eWayBilPassword,
                    tanNumber,
                    tdsapplicableFrom,
                  },
                  { setStatus, setSubmitting }
                ) => {
                  CompanyServices.updateCompany(
                    companyName,
                    address,
                    legalName,
                    mallingName,
                    country.value,
                    state.value,
                    "721446",
                    phoneNumber,
                    "",
                    "",
                    "",
                    pan,
                    isGstApplicable,
                    gstNumber,
                    gstUserName,
                    gstLocation.value,
                    applicableFrom,
                    tdsApplicable,
                    tanNumber,
                    tdsapplicableFrom,
                    isEinvoice,
                    eInvoiceUserName,
                    eInvoicePassword,
                    isEwayBill,
                    ewayBillUserName,
                    eWayBilPassword
                  ).then(
                    async (res) => {
                      setSubmitting(false);
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
                        window.location.reload(true);
                      }
                    },
                    (error) => {
                      setSubmitting(false);
                    }
                  );
                  setStatus();
                }}
                render={({ values, errors, status, touched, isSubmitting }) => (
                  <Form>
                    <div style={{ marginTop: rowSize }}>
                      <CRow>
                        <CCol md={4}>
                          <CFormLabel htmlFor="companyName">
                            Company Name
                            <span style={{ color: "red", marginLeft: requirementIcon }}>
                              *
                            </span>
                          </CFormLabel>
                          <CFormInput
                            type="text"
                            name="companyName"
                            value={this.state.companyName}
                            onChange={this.onTextChange}
                            placeholder="Enter Company Name"
                            className={
                              "form-control" +
                              (errors.companyName && touched.companyName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="companyName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CCol>
                        <CCol md={4}>
                          <CFormLabel htmlFor="legalName">
                            Legal Name
                          </CFormLabel>
                          <CFormInput
                            type="text"
                            name="legalName"
                            value={this.state.legalName}
                            onChange={this.onTextChange}
                            placeholder="Enter Company Name"
                            className={
                              "form-control" +
                              (errors.legalName && touched.legalName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="legalName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CCol>
                        <CCol md={4}>
                          <CFormLabel htmlFor="mallingName">
                            Malling Name{" "}
                            <span style={{ color: "red", marginLeft: requirementIcon }}>
                              *
                            </span>
                          </CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="text"
                              name="mallingName"
                              value={this.state.mallingName}
                              onChange={this.onTextChange}
                              placeholder="Enter Malling Name"
                              className={
                                "form-control" +
                                (errors.mallingName && touched.mallingName
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="mallingName"
                              component="div"
                              className="invalid-feedback"
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>
                    </div>

                    <div style={{ marginTop: rowSize }}>
                      <CRow>
                        <CCol md={4}>
                          <CFormLabel htmlFor="country">
                            Country{" "}
                            <span style={{ color: "red", marginLeft: requirementIcon }}>
                              *
                            </span>
                          </CFormLabel>
                          <Select
                            name="country"
                            value={this.state.country}
                            onChange={this.onDropDownChange}
                            options={this.state.countries}
                            classNamePrefix="select"
                            className={
                              errors.country && touched.country
                                ? " is-invalid"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="country"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="state">
                            state{" "}
                            <span style={{ color: "red", marginLeft: requirementIcon }}>
                              *
                            </span>
                          </CFormLabel>
                          <Select
                            name="state"
                            value={this.state.state}
                            onChange={this.onDropDownChange}
                            options={this.state.states}
                            classNamePrefix="select"
                            className={
                              errors.state && touched.state ? " is-invalid" : ""
                            }
                          />
                          <ErrorMessage
                            name="state"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="address">
                            Address{" "}
                            <span style={{ color: "red", marginLeft: requirementIcon }}>
                              *
                            </span>
                          </CFormLabel>
                          <CFormTextarea
                            rows={2}
                            type="text"
                            name="address"
                            onChange={this.onTextChange}
                            value={this.state.address}
                            placeholder="Enter Address"
                            className={
                              "form-control" +
                              (errors.address && touched.address
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CCol>
                      </CRow>
                    </div>

                    <div style={{ marginTop: rowSize }}>
                      <CRow>
                        <CCol md={4}>
                          <CFormLabel htmlFor="phoneNumber">
                            Phone No{" "}
                            <span style={{ color: "red", marginLeft: requirementIcon }}>
                              *
                            </span>
                          </CFormLabel>
                          <CFormInputWithMask
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            mask="+{91}(000)0000-000"
                            onChange={this.onTextChange}
                            className={
                              "form-control" +
                              (errors.phoneNumber && touched.phoneNumber
                                ? " is-invalid"
                                : "")
                            }
                          />

                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="invalid-feedback"
                          />
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="email">
                            Email{" "}
                            <span style={{ color: "red", marginLeft: requirementIcon }}>
                              *
                            </span>
                          </CFormLabel>
                          <CInputGroup>
                            <CInputGroupText id="email">@</CInputGroupText>
                            <CFormInput
                              type="email"
                              name="email"
                              value={this.state.email}
                              onChange={this.onTextChange}
                              placeholder="Enter Email Id"
                              className={
                                "form-control" +
                                (errors.email && touched.email
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={4}>
                          <CFormLabel htmlFor="pan">
                            Pan{" "}
                            <span style={{ color: "red", marginLeft: requirementIcon }}>
                              *
                            </span>
                          </CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="text"
                              name="pan"
                              value={this.state.pan}
                              onChange={this.onTextChange}
                              placeholder="Enter Pan Number"
                              className={
                                "form-control" +
                                (errors.pan && touched.pan ? " is-invalid" : "")
                              }
                            />
                            <ErrorMessage
                              name="pan"
                              component="div"
                              className="invalid-feedback"
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>
                    </div>

                    <div style={{ marginTop: rowSize }}>
                      <CRow>
                        <CCol md={2}>
                          <CFormSwitch
                            label="GST Applicable"
                            name="isGstApplicable"
                            checked={this.state.isGstApplicable}
                            onChange={this.onChange}
                          />
                        </CCol>

                        {this.state.isGstApplicable && (
                          <>
                            <CCol md={2}>
                              <CFormLabel htmlFor="gstNumber">
                                GST Number{" "}
                                <span
                                  style={{ color: "red", marginLeft: requirementIcon }}
                                >
                                  *
                                </span>
                              </CFormLabel>

                              <CFormInput
                                type="text"
                                name="gstNumber"
                                value={this.state.gstNumber}
                                onChange={this.onTextChange}
                                placeholder="Enter Company Name"
                                className={
                                  "form-control" +
                                  (errors.gstNumber && touched.gstNumber
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="gstNumber"
                                component="div"
                                className="invalid-feedback"
                              />
                            </CCol>

                            <CCol md={2}>
                              <CFormLabel htmlFor="gstUserName">
                                GST UserName{" "}
                                <span
                                  style={{ color: "red", marginLeft: requirementIcon }}
                                >
                                  *
                                </span>
                              </CFormLabel>
                              <CInputGroup className="has-validation">
                                <CFormInput
                                  type="text"
                                  name="gstUserName"
                                  value={this.state.gstUserName}
                                  onChange={this.onTextChange}
                                  placeholder="Enter Gst UserName"
                                  className={
                                    "form-control" +
                                    (errors.gstUserName && touched.gstUserName
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="gstUserName"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </CInputGroup>
                            </CCol>

                            <CCol md={3}>
                              <CFormLabel htmlFor="gstLocation">
                                GST Location{" "}
                                <span
                                  style={{ color: "red", marginLeft: requirementIcon }}
                                >
                                  *
                                </span>
                              </CFormLabel>
                              <Select
                                name="gstLocation"
                                value={this.state.gstLocation}
                                onChange={this.onDropDownChange}
                                options={this.state.gstLocations}
                                classNamePrefix="select"
                                className={
                                  errors.gstLocation && touched.gstLocation
                                    ? " is-invalid"
                                    : ""
                                }
                              />
                              <ErrorMessage
                                name="gstLocation"
                                component="div"
                                className="invalid-feedback"
                              />
                            </CCol>

                            <CCol md={3}>
                              <CFormLabel htmlFor="applicableFrom">
                                Applicable From{" "}
                                <span
                                  style={{ color: "red", marginLeft: requirementIcon }}
                                >
                                  *
                                </span>
                              </CFormLabel>
                              <CInputGroup className="has-validation">
                                <CFormInput
                                  type="date"
                                  name="applicableFrom"
                                  value={this.state.applicableFrom}
                                  onChange={this.onTextChange}
                                  className={
                                    "form-control" +
                                    (errors.applicableFrom &&
                                    touched.applicableFrom
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="applicableFrom"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </CInputGroup>
                            </CCol>
                          </>
                        )}
                      </CRow>
                    </div>

                    <div style={{ marginTop: rowSize }}>
                      <CRow>
                        <CCol md={2}>
                          <CFormSwitch
                            label="Is E-Invoice"
                            name="isEinvoice"
                            checked={this.state.isEinvoice}
                            onChange={this.onChange}
                          />
                        </CCol>

                        {this.state.isEinvoice && (
                          <>
                            <CCol md={5}>
                              <CFormLabel htmlFor="eInvoiceUserName">
                                E-Invoice UseName{" "}
                                <span
                                  style={{ color: "red", marginLeft: requirementIcon }}
                                >
                                  *
                                </span>
                              </CFormLabel>
                              <CInputGroup className="has-validation">
                                <CFormInput
                                  type="text"
                                  name="eInvoiceUserName"
                                  value={this.state.eInvoiceUserName}
                                  onChange={this.onTextChange}
                                  placeholder="Enter Gst Number"
                                  className={
                                    "form-control" +
                                    (errors.eInvoiceUserName &&
                                    touched.eInvoiceUserName
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="eInvoiceUserName"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </CInputGroup>
                            </CCol>

                            <CCol md={5}>
                              <CFormLabel htmlFor="eInvoicePassword">
                                E-Invoice Password{" "}
                                <span
                                  style={{ color: "red", marginLeft: requirementIcon }}
                                >
                                  *
                                </span>
                              </CFormLabel>
                              <CInputGroup className="has-validation">
                                <CFormInput
                                  type="text"
                                  name="eInvoicePassword"
                                  onChange={this.onTextChange}
                                  value={this.state.eInvoicePassword}
                                  placeholder="Enter E-Invoice Password"
                                  className={
                                    "form-control" +
                                    (errors.eInvoicePassword &&
                                    touched.eInvoicePassword
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="eInvoicePassword"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </CInputGroup>
                            </CCol>
                          </>
                        )}
                      </CRow>
                    </div>

                    <div style={{ marginTop: rowSize }}>
                      <CRow>
                        <CCol md={2}>
                          <CFormSwitch
                            label="Is E-Way Bil"
                            name="isEwayBill"
                            checked={this.state.isEwayBill}
                            onChange={this.onChange}
                          />
                        </CCol>

                        {this.state.isEwayBill && (
                          <>
                            <CCol md={5}>
                              <CFormLabel htmlFor="ewayBillUserName">
                                E-Way Bill UserName{" "}
                                <span
                                  style={{ color: "red", marginLeft: requirementIcon }}
                                >
                                  *
                                </span>
                              </CFormLabel>
                              <CInputGroup className="has-validation">
                                <CFormInput
                                  type="text"
                                  name="ewayBillUserName"
                                  value={this.state.ewayBillUserName}
                                  placeholder="Enter E-Way Bill UserName"
                                  onChange={this.onTextChange}
                                  className={
                                    "form-control" +
                                    (errors.ewayBillUserName &&
                                    touched.ewayBillUserName
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="ewayBillUserName"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </CInputGroup>
                            </CCol>

                            <CCol md={5}>
                              <CFormLabel htmlFor="eWayBilPassword">
                                E-Way Bill Password{" "}
                                <span
                                  style={{ color: "red", marginLeft: requirementIcon }}
                                >
                                  *
                                </span>
                              </CFormLabel>
                              <CInputGroup className="has-validation">
                                <CFormInput
                                  type="text"
                                  name="eWayBilPassword"
                                  value={this.state.eWayBilPassword}
                                  onChange={this.onTextChange}
                                  placeholder="Enter E-Way Bill Password"
                                  className={
                                    "form-control" +
                                    (errors.eWayBilPassword &&
                                    touched.eWayBilPassword
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="eWayBilPassword"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </CInputGroup>
                            </CCol>
                          </>
                        )}
                      </CRow>
                    </div>

                    <div style={{ marginTop: rowSize }}>
                      <CRow>
                        <CCol md={2}>
                          <CFormSwitch
                            label="TDS Applicable"
                            name="tdsApplicable"
                            checked={this.state.tdsApplicable}
                            onChange={this.onChange}
                          />
                        </CCol>

                        {this.state.tdsApplicable && (
                          <>
                            <CCol md={5}>
                              <CFormLabel htmlFor="tanNumber">
                                Tan Number{" "}
                                <span
                                  style={{ color: "red", marginLeft: requirementIcon }}
                                >
                                  *
                                </span>
                              </CFormLabel>
                              <CInputGroup className="has-validation">
                                <CFormInput
                                  type="text"
                                  name="tanNumber"
                                  value={this.state.tanNumber}
                                  placeholder="Enter TAN Number"
                                  onChange={this.onTextChange}
                                  className={
                                    "form-control" +
                                    (errors.tanNumber && touched.tanNumber
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="tanNumber"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </CInputGroup>
                            </CCol>

                            <CCol md={5}>
                              <CFormLabel htmlFor="tdsapplicableFrom">
                                Applicable From{" "}
                                <span
                                  style={{ color: "red", marginLeft: requirementIcon }}
                                >
                                  *
                                </span>
                              </CFormLabel>
                              <CInputGroup className="has-validation">
                                <CFormInput
                                  type="date"
                                  name="tdsapplicableFrom"
                                  value={this.state.tdsapplicableFrom}
                                  onChange={this.onTextChange}
                                  className={
                                    "form-control" +
                                    (errors.tdsapplicableFrom &&
                                    touched.tdsapplicableFrom
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="tdsapplicableFrom"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </CInputGroup>
                            </CCol>
                          </>
                        )}
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
                          Update Company
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

export default withRouter(Company);
