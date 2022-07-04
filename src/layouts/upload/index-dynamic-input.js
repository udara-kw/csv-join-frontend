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
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import MDInput from "../../components/MDInput";

function Notifications() {
  // file
  const [files, setFiles] = useState([]);

  const handleAdd = (newFiles) => {
    const Files = newFiles.filter((file) => !files.find((f) => f.data === file.data));
    setFiles([...files, ...Files]);
    console.log(typeof files);
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  // tags
  const [values, setValues] = useState([]);
  const [text, setText] = useState("");

  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const addValue = () => {
    setValues([...values, ""]);
  };
  const handleValueChange = (index, e) => {
    const updatedValues = values.map((value, i) => {
      if (i === index) {
        return e.target.value;
      }
      return value;
    });
    setValues(updatedValues);
  };
  const deleteValue = (jump) => {
    setValues(values.filter((j) => j !== jump));
  };
  // validate
  // const [tagErr, setTagErr] = useState({});
  // const [fileErr, setFileErr] = useState({});

  // const formValidate =()=>{
  //   const tagErr={};
  //   const fileErr={};
  //   let isValid=true;
  //
  // }
  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
    console.log(files.map((f) => JSON.stringify(f)));
    console.log(values);
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
                <MDBox component="form" role="form" onSubmit={handleSubmit}>
                  <Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={10}>
                        <MDInput
                          autoFocus
                          margin="dense"
                          value={text}
                          onChange={handleChangeText}
                          label="Tags"
                          variant="standard"
                          type="text"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton aria-label="add" onClick={addValue}>
                          <Icon fontSize="large">add</Icon>
                        </IconButton>
                      </Grid>
                    </Grid>
                    {values.map((jump, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <MDBox key={`jump${index}`}>
                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item xs={10}>
                            <MDInput
                              autoFocus
                              margin="dense"
                              variant="standard"
                              type="text"
                              value={jump || ""}
                              onChange={(e) => handleValueChange(index, e)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <IconButton aria-label="add" onClick={addValue}>
                              <Icon fontSize="large">add</Icon>
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => deleteValue(jump)}>
                              <Icon fontSize="large">delete</Icon>
                            </IconButton>
                          </Grid>
                        </Grid>
                      </MDBox>
                    ))}
                  </Grid>

                  <MDBox mt={4}>
                    <DropzoneAreaBase
                      fileObjects={files}
                      onAdd={handleAdd}
                      onDelete={handleDelete}
                    />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      type="submit"
                      id="submit-button"
                      variant="gradient"
                      color="info"
                      fullWidth
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
