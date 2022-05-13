import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SingleProduct from "./SingleProduct";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products/");
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <Grid container sx={{height: "100vh"}}>
      {products.map((product, idx) => (
        <SingleProduct product={product} key={idx} {...props}/>
      ))}
    </Grid>
  );
};

export default Products;
