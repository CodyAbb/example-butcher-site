import React, { useState, useEffect } from "react";
import meatExample from "../imgs/meat_product.jpg";
import "../createorder.css";

export default function CreateOrder() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((result) => result["_embedded"])
      .then((embedded) => setProducts(embedded.products));
  }, []);

  return (
    <>
      <div className="grid-container">
        <div className="scrollable-products">
          <div className="product-card">
            <h1 className="product-title">Piece of Meat</h1>

            <img
              className="product-picture"
              src={meatExample}
              alt="Meat Joint"
            />

            <p className="product-blurb">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              suscipit ultrices tristique. Cras placerat posuere vehicula.
              Aliquam eget dignissim quam, sed tempus massa. Cras placerat
              posuere vehicula. Aliquam eget dignissim quam, sed tempus massa.
            </p>
            <p className="product-price">£10.99</p>
            <p>
              <button className="add-button">Add to Cart</button>
            </p>
          </div>

          <div className="product-card">
            <h1 className="product-title">Piece of Meat</h1>

            <img
              className="product-picture"
              src={meatExample}
              alt="Meat Joint"
            />

            <p className="product-blurb">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              suscipit ultrices tristique. Cras placerat posuere vehicula.
              Aliquam eget dignissim quam, sed tempus massa. Cras placerat
              posuere vehicula. Aliquam eget dignissim quam, sed tempus massa.
            </p>
            <p className="product-price">£10.99</p>
            <p>
              <button className="add-button">Add to Cart</button>
            </p>
          </div>

          <div className="product-card">
            <h1 className="product-title">Piece of Meat</h1>

            <img
              className="product-picture"
              src={meatExample}
              alt="Meat Joint"
            />

            <p className="product-blurb">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              suscipit ultrices tristique. Cras placerat posuere vehicula.
              Aliquam eget dignissim quam, sed tempus massa. Cras placerat
              posuere vehicula. Aliquam eget dignissim quam, sed tempus massa.
            </p>
            <p className="product-price">£10.99</p>
            <p>
              <button className="add-button">Add to Cart</button>
            </p>
          </div>
        </div>

        {/* checkout section */}
        <div className="basket-container">
          <p>Basket placeholder</p>
        </div>
      </div>
    </>
  );
}
