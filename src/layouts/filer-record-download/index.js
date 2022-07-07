/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getCSVData } from "../../services";
// import { createTheme } from "@mui/material/styles";

// const useStyles = createTheme({
//   components: {
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           border: "none",
//         },
//       },
//     },
//   },
// });

function Tables() {
  const [csvColumns, setCsvColumns] = useState([]);
  const [csvRows, setCsvRows] = useState([]);
  // initial data load
  // initial data load
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    retrieveCSVData();
  }, []);

  async function retrieveCSVData() {
    try {
      // eslint-disable-next-line no-shadow
      const { data } = await getCSVData();
      setCsvRows(data.rows);
      setCsvColumns(data.columns);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }

  const [pageSize, setPageSize] = useState(10);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  All Records
                </MDTypography>
              </MDBox>
              <MDBox pt={5} pb={5}>
                {csvColumns.length ? (
                  <DataGrid
                    style={{ border: "none" }}
                    disableColumnSelector
                    rows={csvRows}
                    columns={csvColumns}
                    autoHeight
                    canSearch
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                  />
                ) : null}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
