import React from "react";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import ODataStore from "devextreme/data/odata/store";
import { useCallback, useState } from "react";

import { Box, ThemeProvider, useTheme } from "@mui/material";
import DiscountCell from "./DiscountCell";
import { useColorModes } from "@coreui/react";

const pageSizes = [10, 25, 50, 100];

const dataSourceOptions = {
  store: new ODataStore({
    version: 2,
    url: "https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes",
    key: "Id",
    beforeSend(request) {
      const year = new Date().getFullYear() - 1;
      request.params.startDate = `${year}-05-10`;
      request.params.endDate = `${year}-5-15`;
    },
  }),
};

const DashboardDataGrid = () => {
  const [collapsed, setCollapsed] = useState(true);
  const theme = useTheme();

  const onContentReady = useCallback(
    (e) => {
      if (collapsed) {
        e.component.expandRow(["EnviroCare"]);
        setCollapsed(false);
      }
    },
    [collapsed]
  );

  const customizeCellStyle = (cellInfo) => {
    return {
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
    };
  };

  return (
    <Box
      sx={{
        boxShadow: theme.shadows[1],
        p: 1,
        bgcolor: theme.palette.primary2[400],
        ".dx-datagrid-header-panel": {
          bgcolor: theme.palette.primary2[400],
          // border: `1px solid ${theme.palette.primary2[400]}`,
        },

        ".dx-datagrid-borders>.dx-datagrid-pager": {
          // bgcolor: theme.palette.grey[700],
          // border: `1px solid ${theme.palette.primary2[400]}`,
          color: theme.palette.text.primary,
          mt: 0,
        },
        ".dx-datagrid-headers": {
          bgcolor: theme.palette.primary2[400],
          color: theme.palette.text.primary,
        },
        ".dx-datagrid-borders>.dx-datagrid-headers": {
          p: 0,
        },
        ".dx-bordered-bottom-view": {
          bgcolor: theme.palette.primary2[400],
          color: theme.palette.text.primary,
        },
        ".dx-datagrid-rowsview .dx-row.dx-group-row": {
          bgcolor: theme.palette.primary2[400],
          color: theme.palette.text.primary,
        },
        ".dx-datagrid .dx-row-alt>td ": {
          bgcolor: theme.palette.primary2[400],
          // color: theme.palette.text.primary,
        },
      }}
    >
      <DataGrid
        dataSource={dataSourceOptions}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        width="100%"
        onContentReady={onContentReady}
        customizeCellStyle={customizeCellStyle}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />

        <Column dataField="Product" groupIndex={0} />
        <Column
          dataField="Amount"
          caption="Sale Amount"
          dataType="number"
          format="currency"
          alignment="right"
        />
        <Column
          dataField="Discount"
          caption="Discount %"
          dataType="number"
          format="percent"
          alignment="right"
          allowGrouping={false}
          cellRender={DiscountCell}
          cssClass="bullet"
        />
        <Column dataField="SaleDate" dataType="date" />
        <Column dataField="Region" dataType="string" />
        <Column dataField="Sector" dataType="string" />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Customer" dataType="string" width={150} />

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </Box>
  );
};

export default DashboardDataGrid;
