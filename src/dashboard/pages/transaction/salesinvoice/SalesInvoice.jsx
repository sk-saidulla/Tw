import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdown,
} from "@coreui/react";
import DataGrid, {
  Column,
  ColumnFixing,
  Paging,
  SearchPanel,
  Summary,
  TotalItem,
  // LoadPanel,
  Button,
} from "devextreme-react/data-grid";
import { LoadPanel } from 'devextreme-react/load-panel';
import "devextreme/dist/css/dx.light.css";
import { AuthenticationService } from "../../../../services/AuthServices";
import { SalesInvoiceServices } from "../../../../services/SalesInvoiceServices";
import { withRouter } from "../../../../WithRouter";
import Config from "../../../../config";
import * as moment from "moment";
import CIcon from "@coreui/icons-react";
import { CellData } from "./CellData";
import { cilArrowThickRight, cilCloudDownload, cilSearch } from "@coreui/icons";
import notify from "devextreme/ui/notify";
import DateRangeBox from "devextreme-react/date-range-box";
const buttonRender = (data) => {
  return <div className="dx-icon-email" style="display: inline-block"></div>;
};
const commonSettings = {
  showClearButton: true,
  useMaskBehavior: true,
  openOnFieldClick: false,
};
class SalesInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isException: false,
      isDownload: false,
      loadGrid: false,
      salesInvoices: [],
      startDate: moment().subtract("2", "months").format("DD/MM/YYYY"),
      endDate: moment().format("DD/MM/YYYY"),
      isSearch: false,
    };
    this.pdfReportDownload = this.pdfReportDownload.bind(this);
    this.excelReportDownload = this.excelReportDownload.bind(this);
    this.loadGridData = this.loadGridData.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }
  componentDidMount() {
    var currentUser = AuthenticationService.currentUserValue;
    if (currentUser === null || currentUser === undefined) {
      AuthenticationService.logout();
      this.props.navigate(Config.signInPath);
    }
    this.loadGridData();
  }
  loadGridData = () => {
    this.setState({ isSearch: true, salesInvoices: [] });
    SalesInvoiceServices.getSalesInvoices(
      moment(this.state.startDate, "DD/MM/YYYY").format("MM/DD/YYYY"),
      moment(this.state.endDate, "DD/MM/YYYY").format("MM/DD/YYYY")
    ).then(
      (res) => {
        this.setState({ isSearch: false });
        if (res.isSuccess) {
          let arr = [];
          var totalAmount = 0.0;
          var totalAmount2 = 0.0;

          res.salesInvoices.map((invoice) => {
            var splitamount = Number(
              invoice.totalAmountNumeric.replace(/[^0-9\.-]+/g, "")
            );
            totalAmount = totalAmount + parseFloat(splitamount);

            var splitamount2 = Number(
              invoice.totalTax.replace(/[^0-9\.-]+/g, "")
            );
            totalAmount2 = totalAmount2 + parseFloat(splitamount2);

            var vechicleDetails = "";
            if (invoice.vehicleNumber != null && invoice.vehicleOwner) {
              vechicleDetails =
                invoice.vehicleNumber + " (" + invoice.vehicleOwner + ")";
            } else {
              vechicleDetails = "";
            }
            var data = {
              id: invoice.id,
              invoiceDate: moment(invoice.invoiceDate).format("DD-MM-YYYY"),
              invoiceNumber: invoice.invoiceNumber,
              companyName: invoice.companyName,
              billedTo: invoice.billedTo,
              billedToGstin: invoice.billedToGstin,
              gstin: invoice.gstin,
              billedToAddressCombined: invoice.billedToAddressCombined,
              totalCgst: invoice.totalCgst,
              totalIgst: invoice.totalIgst,
              totalSgst: invoice.totalSgst,
              totalTax: invoice.totalTax,
              totalAmountNumeric: invoice.totalAmountNumeric,
              Pname: invoice.salesInvoiceParticularDetailsList,
              vehicleDetails: vechicleDetails,
              irnStatus: invoice.irnStatus,
            };
            arr.push(data);
          });
          this.setState({
            salesInvoices: arr,
            TotalAmount: totalAmount,
            TotalAmount2: totalAmount2,
          });
        } else {
          this.setState({ isException: true });
        }
      },
      (error) => {
        this.setState({ isSearch: false, isException: true });
      }
    );
  };
  onDateChange = (e) => {
    this.setState({ startDate: e.value[0], endDate: e.value[1] });
  };

  pdfReportDownload = () => {
    this.setState({ isDownload: true });
    SalesInvoiceServices.DownSalesInvoiceReports(
      moment(this.state.startDate, "DD/MM/YYYY").format("MM/DD/YYYY"),
      moment(this.state.endDate, "DD/MM/YYYY").format("MM/DD/YYYY")
    ).then(
      (report) => {
        this.setState({ isDownload: false });
        return report;
      },
      (error) => {
        this.setState({ isDownload: false });
        debugger;
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
          5000
        );
      }
    );
  };
  excelReportDownload = () => {};
  render() {
    if (this.state.isException) {
      throw new Error();
    }
    return (
      <>
        <CCol xs={12}>
          <CCard className="mb-4" style={{ margin: "20px" }}>
            <CCardHeader>
              <CRow>
                <CCol xs={6}>
                  <h4>
                    <strong>Sales</strong> <small>Invoice</small>
                  </h4>
                </CCol>
                <CCol xs={6}>
                  <CButton
                    className="float-end"
                    color="primary"
                    onClick={() => {
                      this.props.navigate("/dashboardhome/groups/creategroups");
                    }}
                  >
                    Create SalesInvoice
                    <CIcon
                      style={{ marginLeft: "5px", paddingTop: "3px" }}
                      icon={cilArrowThickRight}
                      size="lg"
                    />
                  </CButton>
                  {/* <CButton color="primary" className="float-end" style={{marginRight:'5px'}}>
                    <CIcon icon={cilCloudDownload} />
                  </CButton> */}

                  <CDropdown className="float-end">
                    <CDropdownToggle
                      color="primary"
                      style={{ marginRight: "5px" }}
                      disabled={this.state.isDownload}
                    >
                      {this.state.isDownload ? (
                        "Downloading..."
                      ) : (
                        <CIcon icon={cilCloudDownload} />
                      )}
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={this.pdfReportDownload}>
                        <span style={{ cursor: "pointer" }}>Pdf Report</span>
                      </CDropdownItem>
                      <CDropdownItem onClick={this.excelReportDownload}>
                        Excel Report
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={3}>
                  <DateRangeBox
                    startDatePlaceholder={this.state.startDate}
                    endDatePlaceholder={this.state.endDate}
                    onValueChanged={this.onDateChange}
                    displayFormat={"dd/MM/yyyy"}
                    {...commonSettings}
                    disabled={this.state.isSearch}
                  />
                </CCol>
                <CCol xs={1}>
                  <CButton
                    className="float-end"
                    color="primary"
                    onClick={this.loadGridData}
                    disabled={this.state.isSearch}
                  >
                    {this.state.isSearch ? (
                      "Searching..."
                    ) : (
                      <CIcon
                        style={{ paddingTop: "3px" }}
                        icon={cilSearch}
                        size="lg"
                      />
                    )}
                  </CButton>
                </CCol>
              </CRow>
              <div id="#load">
                <DataGrid
                  id="gridContainer"
                  dataSource={this.state.salesInvoices}
                  allowColumnReordering={true}
                  allowColumnResizing={true}
                  columnAutoWidth={true}
                  showBorders={true}
                  defaultCurrentDate={true}
                  loading={true}
                >
                  <LoadPanel
                    shadingColor="rgba(0,0,0,0.4)"
                    position={{ of: "#load" }}
                    visible={true}
                    showIndicator={true}
                  />
                  <SearchPanel visible={true} />
                  <Paging defaultPageSize={5} />
                  <ColumnFixing enabled={true} />

                  <Column dataField="id" visible={false} />
                  <Column dataField="invoiceDate" />
                  <Column dataField="invoiceNumber" />
                  <Column caption="Party Details" alignment="center">
                    <Column dataField="billedTo" />
                    <Column caption="GST" dataField="billedToGstin" />
                  </Column>
                  <Column caption="Particulars" alignment="center">
                    <Column
                      caption="Name"
                      cellRender={CellData.Name}
                      width={250}
                    />
                    <Column caption="Amount" cellRender={CellData.Amount} />
                  </Column>
                  <Column caption="TAX" dataField="totalTax" />
                  <Column
                    caption="Total Amount"
                    dataField="totalAmountNumeric"
                  />
                  <Column
                    caption="Cost Center"
                    cellRender={CellData.CostCenter}
                  />
                  <Column dataField="irnStatus" caption="IRN Status" />
                  <Column
                    type={"buttons"}
                    caption="Actions"
                    buttons={[
                      { hint: "Print", text: "Print", onClick: this.print },
                      {
                        hint: "Edit",
                        text: "Edit",
                        onClick: this.EditSalesInvoice,
                      },
                      {
                        hint: "Print Json",
                        text: "Json",
                        onClick: this.printJson,
                      },
                      {
                        hint: "Cancle IRN",
                        text: "Cancel-IRN",
                        onClick: this.CancelIRN,
                      },
                    ]}
                  />
                  <Column type="buttons">
                    {/* <Button
                     render={buttonRender}
                /> */}
                  </Column>
                  <Summary>
                    {/* <TotalItem column="invoiceDate" summaryType="count" /> */}
                    <TotalItem
                      showInColumn="Invoice Date"
                      customizeText={this.Total}
                    />
                    <TotalItem
                      showInColumn="totalAmountNumeric"
                      customizeText={this.customizeAmount}
                    />
                    <TotalItem
                      showInColumn="totalTax"
                      customizeText={this.customizeAmount2}
                    />
                  </Summary>
                </DataGrid>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </>
    );
  }
}
export default withRouter(SalesInvoice);
