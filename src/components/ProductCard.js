import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import "../createorder.css";
import meatExample from "../imgs/meat_product.jpg";

export default function ProductCard({ product, addToCart, hasBeenAdded }) {
  // const productAdded = hasBeenAdded ? (
  //   <p>
  //     <CheckIcon />
  //   </p>
  // ) : (

  // );

  return (
    <div className="product-card">
      <h1 className="product-title">{product.name}</h1>

      <img className="product-picture" src={meatExample} alt="Meat Joint" />

      <p className="product-blurb">{product.description}</p>
      <p className="product-price">{product.amount}</p>
      <p>
        <button
          className="add-button"
          onClick={() => {
            addToCart(product.name, product.amount, product.id);
          }}
        >
          Add to Cart
        </button>
      </p>
    </div>
  );
}
