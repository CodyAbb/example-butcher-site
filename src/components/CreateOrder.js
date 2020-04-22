import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "../createorder.css";

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
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </div>
      </div>
    </>
  );
}

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);
