import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import "../createorder.css";
import meatExample from "../imgs/meat_product.jpg";

export default function ProductCard({
  product,
  addToCart,
  priceFormatting,
  changeButton,
}) {
  const productAdded = product.addedToBasket ? (
    <p>
      <CheckIcon />
    </p>
  ) : (
    <p>
      <button
        className="add-button"
        onClick={() => {
          addToCart(product);
          // changeButton(product.id);
        }}
      >
        Add to Cart
      </button>
    </p>
  );

  return (
    <div className="product-card">
      <h1 className="product-title">{product.name}</h1>

      <img className="product-picture" src={meatExample} alt="Meat Joint" />

      <p className="product-blurb">{product.description}</p>
      <p className="product-price">{priceFormatting(product.amount)}</p>
      {productAdded}
    </div>
  );
}
