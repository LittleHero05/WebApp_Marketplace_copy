import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Typography, TextField, Button, Alert } from "@mui/material"; // Added Alert
import { create } from "../../frontend-ctrl/api-user.js";
import "./Signup.css";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" }); // State for messages

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const isValidEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clickSubmit = () => {
    if (!values.name || !values.email || !values.password) {
      setMessage({ type: "error", text: "Please fill all the fields." });
      return;
    }

    if (!isValidEmail(values.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    create(user).then((data) => {
      if (data.error) {
        setMessage({ type: "error", text: data.error });
      } else {
        setMessage({ type: "success", text: "Account successfully created. Please sign in." });
        setTimeout(() => navigate("/signin"), 1500); // Redirect after showing the message
      }
    });
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        {/* Left Section: Illustration */}
        <div className="signup-left"></div>

        {/* Right Section: Form */}
        <div className="signup-right">
          <Typography variant="h4" className="signup-title" fontWeight={"bold"}>
            Create an Account
          </Typography>
          {/* Display Message */}
          {message.text && (
            <Alert severity={message.type} className="signup-alert">
              {message.text}
            </Alert>
          )}
          <TextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
            fullWidth
          />
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
            className="signup-button"
          >
            Sign Up
          </Button>
          <Typography variant="body2" className="signup-footer">
            Already have an account? <Link to="/signin">Sign in</Link>
          </Typography>
        </div>
      </Card>
    </div>
  );
}
