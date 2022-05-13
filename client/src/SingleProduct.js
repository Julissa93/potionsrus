import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";

const SingleProduct = ({product, cart, setCart, addToCart}) => {
  const handleAddToCart = () => {
    //check if product exists in cart
    //if product exists increase quantity of product
    //if product does not exist set quantity = 0
    addToCart(product);
  }
  return (
    <Grid
      item
      container
      direction="row"
      xs={12}
      justifyContent="center"
      sm={4}
      md={4}
      xl={3}
      alignContent="center"
      id="single-product"
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://i.redd.it/r2v0p7f4jlm61.png"
          alt="potion"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleAddToCart}>Add To Cart</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default SingleProduct;
