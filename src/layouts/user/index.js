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
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import { DialogActions, DialogContentText, Icon } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import MDButton from "../../components/MDButton";
// eslint-disable-next-line import/named
import { deleteExistingUser, viewAllUsers } from "../../services";

function Tables() {
  const [open, setOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [rowsData, setRowsData] = useState([]);
  async function retrieveUserData() {
    try {
      const res = await viewAllUsers();
      setRowsData(res.data);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
  const handleClickOpen = (username) => {
    setSelectedUsername(username);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedUsername("");
    setOpen(false);
  };
  const deleteUser = () => {
    deleteExistingUser(selectedUsername);
    setOpen(false);
    setSelectedUsername("");
    window.location.reload();
  };
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    retrieveUserData();
  }, []);
  const columns = [
    { Header: "name", accessor: "name", width: "25%" },
    { Header: "email", accessor: "email", width: "30%" },
    { Header: "role", accessor: "role" },
    { Header: "action", accessor: "action", width: "12%" },
  ];
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
                  All Users
                </MDTypography>
              </MDBox>
              <MDBox pt={5} pb={5}>
                <DataTable
                  canSearch
                  table={{
                    columns,
                    rows: rowsData.map((row) => ({
                      ...row,
                      action: (
                        <Icon
                          onClick={() => {
                            handleClickOpen(row.name);
                          }}
                        >
                          edit
                        </Icon>
                      ),
                    })),
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <div>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText id="scroll-dialog-description">
              Are you sure do delete the user
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MDButton variant="gradient" color="info" onClick={deleteUser}>
              Delete
            </MDButton>
            <MDButton variant="gradient" color="error" onClick={handleClose}>
              Cancel
            </MDButton>
          </DialogActions>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default Tables;
