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

import { Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MDInput from "../../components/MDInput";
import MDAlert from "../../components/MDAlert";
import { registerNewUser } from "../../services";

const schema = yup.object().shape({
  username: yup.string().required("name is required").min(8).label("Name"),
  email: yup.string().email("Enter valid email").required("Email is required").label("Email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .label("Password"),
});
function Registration() {
  const navigate = useNavigate();

  const myStyle = {
    fontSize: "0.6rem",
    fontWeight: "300",
    lineHeight: "1.25",
    color: "#F44335",
    marginTop: "10px",
  };

  const [errMsg, setErrMsg] = useState("");
  const [errCode, setErrCode] = useState(0);
  // alert 200 404 500
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showDanger, setShowDanger] = useState(false);

  useEffect(() => {
    setErrMsg("");
    setErrCode(0);
    setShowSuccess(true);
    setShowWarning(false);
    setShowDanger(false);
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(errMsg);
    console.log(errCode);
    try {
      const response = registerNewUser(
        values.username,
        values.email,
        values.password,
        values.master_secret
      );

      if (response) {
        setErrCode(200);
        setShowSuccess(true);
        setErrMsg("Add new record successful");
      }

      // navigate(from, { replace: true });
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
        setErrMsg("Registration Failed");
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
                  Register New User
                </MDTypography>
                <MDTypography display="block" variant="button" color="white" my={1}>
                  Enter email and password to register
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

                <Formik
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                  initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    master_secret: "",
                  }}
                >
                  {/* eslint-disable-next-line no-shadow */}
                  {({
                    // eslint-disable-next-line no-shadow
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleBlur,
                    isValid,
                    dirty,
                  }) => (
                    <MDBox component="form" role="form" onSubmit={handleSubmit}>
                      <MDBox mb={2}>
                        <MDInput
                          label="Username"
                          type="text"
                          id="username"
                          name="username"
                          placeholder=""
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          error={!!(touched.username && errors.username)}
                        />
                        <p style={myStyle}>
                          {touched.username && errors.username ? errors.username : ""}
                        </p>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          label="Email"
                          type="text"
                          id="email"
                          name="email"
                          placeholder=""
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          error={!!(touched.email && errors.email)}
                        />
                        <p style={myStyle}>{touched.email && errors.email ? errors.email : ""}</p>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          label="New Password"
                          type="password"
                          id="password"
                          name="password"
                          placeholder=""
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.password && errors.email)}
                          fullWidth
                        />
                        <p style={myStyle}>
                          {touched.password && errors.password ? errors.password : ""}
                        </p>
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          label="Master Secret Code"
                          type="password"
                          id="master_secret"
                          name="master_secret"
                          placeholder=""
                          value={values.master_secret}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.password && errors.email)}
                          fullWidth
                        />
                        <p style={myStyle}>
                          {touched.password && errors.password ? errors.password : ""}
                        </p>
                      </MDBox>
                      <MDBox mt={4} mb={1}>
                        <MDButton
                          variant="gradient"
                          color="info"
                          onClick={handleSubmit}
                          disabled={isSubmitting || !isValid || !dirty}
                          type="submit"
                          fullWidth
                        >
                          Submit
                        </MDButton>{" "}
                      </MDBox>
                    </MDBox>
                  )}
                </Formik>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Registration;
