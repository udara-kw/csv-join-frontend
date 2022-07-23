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

// import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { DropzoneAreaBase } from "material-ui-dropzone";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import MDAlert from "../../components/MDAlert";
import { uploadCSVFile } from "../../services";

function Notifications() {
  const navigate = useNavigate();
  const myStyle = {
    fontSize: "1rem",
    fontWeight: "300",
    lineHeight: "1.25",
    color: "#F44335",
    marginTop: "10px",
  };

  const [errMsg, setErrMsg] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [errCode, setErrCode] = useState(0);
  // alert 200 404 500
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showDanger, setShowDanger] = useState(false);

  useEffect(() => {
    setErrMsg("");
    setErrCode(0);
  }, []);

  // file
  const [files, setFiles] = useState([]);
  const [filesErr, setFilesErr] = useState(true);
  const [filesTouched, setFilesTouchedErr] = useState(false);

  const handleAdd = (newFiles) => {
    setFilesTouchedErr(true);
    setFilesErr(false);
    const Files = newFiles.filter((file) => !files.find((f) => f.data === file.data));
    setFiles([...files, ...Files]);
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
    if (files.length - 1 === 0) {
      setFilesErr(true);
    }
  };

  // dynamic input
  const [tags, setTags] = useState([]);
  const [tagErr, setTagErr] = useState(true);
  const [tagTouched, setTouchedErr] = useState(false);
  const handleKeyDown = (event) => {
    setTouchedErr(true);
    switch (event.key) {
      case ",":
      case " ": {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value.length > 0) {
          setTags([...tags, event.target.value]);
        }
        break;
      }
      default:
    }
  };
  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowSuccess(false);
      setShowDanger(false);
      setShowWarning(false);
      const response = await uploadCSVFile(
        files.map((f) => JSON.stringify(f)),
        tags
      );
      setFiles([]);
      setTags([]);
      if (response) {
        if (response.data?.success === true) {
          setErrCode(200);
          setShowSuccess(true);
          setErrMsg("Add new records successful");
        } else {
          setErrCode(400);
          setErrMsg(
            `Add new records successful! | (Duplicate rows: ${response.data?.duplicateRowCount}) | Rows without phone: ${response.data?.withoutPhoneNumberRowCount}`
          );
          setShowWarning(true);
        }
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        setErrCode(500);
        setShowDanger(true);
      } else if (err.response?.status === 400) {
        setErrMsg(err.response.data.message);
        setErrCode(400);
        setShowWarning(true);
      } else if (err.response?.status === 401) {
        setErrMsg(err.response.data.message);
        setErrCode(401);
      } else if (err.response?.status === 403) {
        navigate("/not-found");
        setErrCode(403);
      } else {
        setErrMsg("Upload Failed");
        setShowWarning(true);
      }
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
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
                  File Upload
                </MDTypography>
                <MDTypography display="block" variant="button" color="white" my={1}>
                  Enter tags related to csv and upload file
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                {showSuccess ? (
                  <MDAlert color="success" dismissible show={showSuccess}>
                    {errMsg}
                  </MDAlert>
                ) : (
                  " "
                )}
                {showWarning ? (
                  <MDAlert color="warning" dismissible show={showWarning}>
                    {errMsg}
                  </MDAlert>
                ) : (
                  " "
                )}
                {showDanger ? (
                  <MDAlert color="error" show={showDanger} dismissible>
                    {errMsg}
                  </MDAlert>
                ) : (
                  " "
                )}
                <MDBox component="form" role="form" onSubmit={handleSubmit}>
                  <Grid>
                    <Autocomplete
                      multiple
                      freeSolo
                      id="tags-outlined"
                      options={["csv"]}
                      getOptionLabel={(option) => option.title || option}
                      value={tags}
                      onChange={(event, newValue) => {
                        setTouchedErr(true);
                        setTags(newValue);
                        if (newValue.length > 0) {
                          setTagErr(false);
                        } else {
                          setTagErr(true);
                        }
                      }}
                      filterSelectedOptions
                      renderInput={(params) => {
                        // eslint-disable-next-line no-param-reassign
                        params.inputProps.onKeyDown = handleKeyDown;
                        return (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Tags"
                            placeholder="Tags"
                            margin="normal"
                            fullWidth
                            error={tagTouched && tagErr}
                          />
                        );
                      }}
                    />
                    <p style={myStyle}>
                      {tagTouched && tagErr ? "at least one tag is required" : ""}
                    </p>
                  </Grid>

                  <MDBox mt={4}>
                    <DropzoneAreaBase
                      fileObjects={files}
                      acceptedFiles={["text/csv"]}
                      onAdd={handleAdd}
                      onDelete={handleDelete}
                    />
                    <p style={myStyle}>
                      {filesTouched && filesErr ? "at least one tag is required" : ""}
                    </p>
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      type="submit"
                      id="submit-button"
                      variant="gradient"
                      color="info"
                      fullWidth
                      disabled={filesErr || tagErr}
                    >
                      submit
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
