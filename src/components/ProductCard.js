import React from "react";
import "../createorder.css";
import meatExample from "../imgs/meat_product.jpg";

export default function ProductCard({ product, addToCart }) {
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
            addToCart(product.name, product.amount);
          }}
        >
          Add to Cart
        </button>
      </p>
    </div>
  );
}
