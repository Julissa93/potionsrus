import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Item, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  console.log("props = ", props);

  const [error, setError] = useState("");

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  const attemptTokenLogin = async () => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    if(token) {
      const { data } = await axios.get(`/api/auth`, {
        headers: {
          authorization: token.token
        }
      });
      console.log("data = ", data);
      props.setCurrentUser(data);
      setAuth(data);
    }
  }

  const handleSubmit = async () => {
    try {
      if(user.email && user.password) {
        const { data } = await axios.post("/api/auth/login", user);
        console.log("data = ", data);
        if (data) window.localStorage.setItem("token", JSON.stringify(data));
        await attemptTokenLogin();
        if(auth) {
          navigate("/")
        };
      }
      else setError("You entered the wrong credentials!");
    } catch (err) {
      setError("Something Went Wrong!");
      console.error(err);
    }
  };

  return (
    <Grid
      container
      direction="column"
      item
      xs={8}
      md={6}
      sx={{ m: "auto", mt: "15rem" }}
    >
      <Typography component="h4" variant="h4" align="center">
        Login
      </Typography>
      {error ? <Alert severity="error">{error}</Alert> : <></>}
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Typography align="center" variant="p">Need an account? <a href="/signup">Sign Up Here</a></Typography>
    </Grid>
  );
};

export default Login;
