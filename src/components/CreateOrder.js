import React, { useState, useEffect } from "react";

import "../createorder.css";
import ProductCard from "./ProductCard";

export default function CreateOrder() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);

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
          {products &&
            products.map((product) => {
              return <ProductCard product={product} />;
            })}
        </div>

        {/* checkout section */}
        <div className="basket-container">
          <p>Basket placeholder</p>
        </div>
      </div>
    </>
  );
}
