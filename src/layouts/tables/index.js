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
import DataTable from "examples/Tables/DataTable";
import { Icon, Modal } from "@mui/material";
import { useState } from "react";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";

function Tables() {
  const style = {
    position: "absolute",
    justifyContent: "center",
  };
  // const { columns, rows } = authorsTableData();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
                <DataTable
                  canSearch
                  table={{
                    columns: [
                      { Header: "name", accessor: "name", width: "25%" },
                      { Header: "email", accessor: "position", width: "30%" },
                      { Header: "insert date", accessor: "office" },
                      { Header: "action", accessor: "action", width: "12%" },
                    ],
                    rows: [
                      {
                        name: "Hanny Baniard",
                        position: "Data Coordiator",
                        office: "Baorixile",
                        age: 42,
                        startDate: "4/11/2021",
                        action: <Icon onClick={handleOpen}>edit</Icon>,
                      },
                      {
                        name: "Lara Puleque",
                        position: "Payment Adjustment Coordinator",
                        office: "Cijangkar",
                        age: 47,
                        startDate: "8/2/2021",
                        action: "edit",
                      },
                      {
                        name: "Torie Repper",
                        position: "Administrative Officer",
                        office: "Montpellier",
                        age: 25,
                        startDate: "4/21/2021",
                        action: "edit",
                      },
                    ],
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Modal sx={style} open={open} onClose={handleClose}>
        <Grid item xs={6} lg={4}>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Register New User
              </MDTypography>
              <MDTypography display="block" variant="button" color="white" my={1}>
                Enter email and password to register
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    label="username"
                    type="text"
                    id="username"
                    name="username"
                    placeholder=""
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    label="email"
                    type="text"
                    id="email"
                    name="email"
                    placeholder=""
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    label="password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder=""
                    fullWidth
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" type="submit" fullWidth>
                    Submit
                  </MDButton>{" "}
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;
