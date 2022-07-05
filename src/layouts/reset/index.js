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
import { changePassword } from "../../services";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .label("Password"),
  conformPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});
function Reset() {
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
      const response = changePassword(values.oldPassword, values.newPassword);

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
        setErrMsg("Reset Failed");
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
                  Reset Password
                </MDTypography>
                <MDTypography display="block" variant="button" color="white" my={1}>
                  Enter new password to reset password
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
                    oldPassword: "",
                    newPassword: "",
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
                          label="Old Password"
                          type="password"
                          id="oldPassword"
                          name="oldPassword"
                          placeholder=""
                          value={values.oldPassword}
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
                          label="New Password"
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          placeholder=""
                          value={values.newPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!(touched.conformPassword && errors.conformPassword)}
                          fullWidth
                        />
                        <p style={myStyle}>
                          {touched.conformPassword && errors.conformPassword
                            ? errors.conformPassword
                            : ""}
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

export default Reset;
