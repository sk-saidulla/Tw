import React from "react";
import {
  TreeList,
  Scrolling,
  Paging,
  Pager,
  Column,
  Lookup,
} from "devextreme-react/tree-list";
import { tasks, employees } from "./data.js";
import { Box, useTheme } from "@mui/material";

const allowedPageSizes = [5, 10, 20];
const statuses = [
  "Not Started",
  "Need Assistance",
  "In Progress",
  "Deferred",
  "Completed",
];

export default function DashboardTreeList() {
  const theme = useTheme();
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

        ".dx-treelist-headers": {
          bgcolor: theme.palette.primary2[400],
          color: theme.palette.text.primary,
        },

        ".dx-treelist-borders>.dx-treelist-pager": {
          bgcolor: theme.palette.primary2[400],
          color: theme.palette.text.primary,
        },
      }}
    >
      <TreeList
        id="tasks"
        dataSource={tasks}
        autoExpandAll={true}
        columnAutoWidth={true}
        showBorders={true}
        keyExpr="Task_ID"
        parentIdExpr="Task_Parent_ID"
      >
        <Scrolling mode="standard" />
        <Paging enabled={true} defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={allowedPageSizes}
          showInfo={true}
        />
        <Column width={390} dataField="Task_Subject" />
        <Column dataField="Task_Assigned_Employee_ID" caption="Assigned">
          <Lookup dataSource={employees} valueExpr="ID" displayExpr="Name" />
        </Column>
        <Column dataField="Task_Status" caption="Status">
          <Lookup dataSource={statuses} />
        </Column>
        <Column
          width={100}
          dataField="Task_Start_Date"
          caption="Start Date"
          dataType="date"
        />
        <Column
          width={100}
          dataField="Task_Due_Date"
          caption="Due Date"
          dataType="date"
        />
      </TreeList>
    </Box>
  );
}
