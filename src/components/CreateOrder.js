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

  const addToCart = (name, amount, id) => {
    const productToBeAdded = {
      productName: name,
      productAmount: amount,
      productId: id,
      quantity: 1,
    };
    setBasket((basket) => [...basket, productToBeAdded]);
  };

  const increaseByOne = (searchId) => {
    for (const basketProduct of basket) {
      if (basketProduct.productId === searchId) {
        basketProduct.quantity += 1;
      }
    }
  };

  const basketNotEmpty =
    basket.length > 0 ? (
      <div className="basket-container">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={basket.length} color="secondary">
            <ShoppingCartIcon style={{ fontSize: 40 }} />
          </StyledBadge>
        </IconButton>
        <ul>
          {basket.map((basketProduct) => {
            return (
              <li>
                {basketProduct.productName}: {basketProduct.productAmount}{" "}
                {basketProduct.quantity}{" "}
                <button onClick={increaseByOne(basketProduct.productId)}>
                  +
                </button>
              </li>
            );
          })}
        </ul>
        <p>
          <button className="checkout-button">
            Proceed To Checkout <ShoppingCartIcon />{" "}
          </button>
        </p>
      </div>
    ) : (
      <div className="empty-basket">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={basket.length} color="secondary">
            <ShoppingCartIcon style={{ fontSize: 40 }} />
          </StyledBadge>
        </IconButton>
      </div>
    );

  return (
    <>
      <div className="grid-container">
        <div className="scrollable-products">
          {products &&
            products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              );
            })}
        </div>

        {/* checkout section */}
        {basketNotEmpty}
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
