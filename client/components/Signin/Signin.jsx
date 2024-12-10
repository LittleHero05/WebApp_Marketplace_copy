import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import { signin } from "../../frontend-ctrl/api-auth.js";
import { useAuth } from "../../helpers/auth-context";
import "./Signin.css";

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    text: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const isValidEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showSnackbar = (type, text) => {
    setSnackbar({ open: true, type, text });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const clickSubmit = () => {
    if (!isValidEmail(values.email)) {
      showSnackbar("error", "Please enter a valid email address.");
      return;
    }

    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        showSnackbar("error", data.error);
      } else {
        login(data, () => {
          navigate("/");          
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    });
  };

  return (
    <div className="signin-container">
      <Card className="signin-card">
        {/* Left Section: Illustration */}
        <div className="signin-left"></div>

        {/* Right Section: Form */}
        <div className="signin-right">
          <Typography variant="h4" className="signin-title" fontWeight={"bold"}>
            Welcome Back
          </Typography>
          <TextField
            id="email"
            label="Email Address"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            fullWidth
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={clickSubmit}
            fullWidth
            className="signin-button"
          >
            Log In
          </Button>
          <Typography variant="body2" className="signin-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </div>
      </Card>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.text}
        </Alert>
      </Snackbar>
    </div>
  );
}
