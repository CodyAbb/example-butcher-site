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
  const [hasBeenAdded, setHasBeenAdded] = useState(false);

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
    // setHasBeenAdded(true);
  };

  const increaseByOne = (searchId) => {
    let prevBasket = [...basket];

    let indexOfUpdatedProduct = prevBasket.findIndex(
      (product) => product.productId === searchId
    );

    let productToBeChanged = {
      ...prevBasket[indexOfUpdatedProduct],
    };

    productToBeChanged.quantity = productToBeChanged.quantity += 1;

    prevBasket[indexOfUpdatedProduct] = productToBeChanged;

    setBasket(prevBasket);
  };

  const decreaseByOne = (searchId) => {
    let prevBasket = [...basket];

    let indexOfUpdatedProduct = prevBasket.findIndex(
      (product) => product.productId === searchId
    );

    let productToBeChanged = {
      ...prevBasket[indexOfUpdatedProduct],
    };

    productToBeChanged.quantity = productToBeChanged.quantity -= 1;

    if (productToBeChanged.quantity > 0) {
      prevBasket[indexOfUpdatedProduct] = productToBeChanged;
    }

    setBasket(prevBasket);
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
                <button
                  onClick={() => {
                    increaseByOne(basketProduct.productId);
                  }}
                >
                  +
                </button>
                |
                <button
                  onClick={() => {
                    decreaseByOne(basketProduct.productId);
                  }}
                >
                  -
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
                  hasBeenAdded={hasBeenAdded}
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
