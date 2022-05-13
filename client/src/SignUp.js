import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Item,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import attemptTokenLogin from "./functions";

const SignUp = (props) => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

 
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("submitted! user = ", user);
    const validEmail = validateEmail(user.email);
    const validPassword = validatePassword(user.password);
    if (!user.firstname) setFirstnameError("Please enter your first name.");
    if (!user.lastname) setLastnameError("Please enter your last name.");
    if (validEmail && validPassword && user.firstname && user.lastname) {
      const { data } = await axios.post("/api/auth/signup", user);
      if (data) window.localStorage.setItem("token", JSON.stringify(data));
      const res = await attemptTokenLogin();
      if(res) navigate("/");
    }
  };

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    setEmailError("Please enter a valid email address.");
    return false;
  };

  const validatePassword = (password) => {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)) {
      return true;
    } else {
      setPasswordError(
        "Your password must have at least one digit, one lower case, one uppercase, and is at least characters long."
      );
      return false;
    }
  };

  return (
    <Grid
      container
      direction="column"
      item
      xs={6}
      sx={{ m: "auto", mt: "10rem", height: "100vh" }}
    >
      <form>
        <Typography component="h4" variant="h4" align="center">
          Sign Up
        </Typography>
        <TextField
          required
          variant="outlined"
          name="firstname"
          label="First Name"
          margin="dense"
          value={user.firstname}
          onChange={handleChange}
        ></TextField>
        {firstnameError ? (
          <Alert severity="error">{firstnameError}</Alert>
        ) : (
          <></>
        )}
        <TextField
          required
          variant="outlined"
          name="lastname"
          label="Last Name"
          margin="dense"
          value={user.lastname}
          onChange={handleChange}
        ></TextField>
        {lastnameError ? (
          <Alert severity="error">{lastnameError}</Alert>
        ) : (
          <></>
        )}
        <TextField
          required
          variant="outlined"
          name="email"
          label="Email"
          margin="dense"
          value={user.email}
          onChange={handleChange}
        ></TextField>
        {emailError ? <Alert severity="error">{emailError}</Alert> : <></>}
        <TextField
          required
          variant="outlined"
          name="password"
          label="Password"
          type="password"
          margin="dense"
          value={user.password}
          onChange={handleChange}
        ></TextField>
        {passwordError ? (
          <Alert severity="error">{passwordError}</Alert>
        ) : (
          <></>
        )}
        <Button
          margin="dense"
          className="button"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    </Grid>
  );
};

export default SignUp;
