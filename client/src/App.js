import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import { Grid } from "@mui/material";
import NavBar from "./NavBar";
import Products from "./Products";
import SignUp from "./SignUp";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    //check if product exists in cart already
    //if yes, increase quantity of product by 1
    //if no, set quantity to 1

    
    let productInCart = null
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id) {
        productInCart = cart[i];
      }
    }
    if (productInCart) productInCart.quantity++;
    else {
      product.quantity = 1;
      setCart([...cart, product]);
    }
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Products setCart={setCart} cart={cart} addToCart={addToCart} />
          }
        />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/signup"
          element={<SignUp setCurrentUser={setCurrentUser} />}
        />
      </Routes>
    </>
  );
};

export default App;
