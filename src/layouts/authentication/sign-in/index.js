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

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MDAlert from "../../../components/MDAlert";
import { login } from "../../../services";

// eslint-disable-next-line no-unused-vars
const schema = yup.object().shape({
  email: yup.string().required("Name is required").label("Name"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .label("Password"),
});

function Basic() {
  const navigate = useNavigate();
  const from = "/all-record";

  const myStyle = {
    fontSize: "0.6rem",
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

  const handleSubmit = async (values) => {
    try {
      const response = await login(values.email, values.password);

      if (response) {
        setErrCode(200);
        setShowSuccess(true);
        setErrMsg("Add new record successful");
        navigate(from, { replace: true });
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
      } else if (err.response?.status === 403) {
        setErrMsg("Username or password is wrong");
        setErrCode(403);
        setShowWarning(true);
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid password");
        setErrCode(401);
        setShowWarning(true);
      } else {
        setErrMsg("Login Failed");
        setShowWarning(true);
      }
    }
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }} />
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
              email: "",
              password: "",
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
              <MDBox component="form" role="form" noValidate onSubmit={handleSubmit}>
                <MDBox mb={2}>
                  <MDInput
                    label="name"
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
                    label="password"
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
                    {" "}
                    {touched.password && errors.password ? errors.password : ""}
                  </p>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isValid || !dirty}
                    fullWidth
                    type="submit"
                  >
                    sign in
                  </MDButton>
                </MDBox>
              </MDBox>
            )}
          </Formik>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
