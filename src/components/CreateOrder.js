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
  const [productQuantities, setProductQuantities] = useState(0);
  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((result) => result["_embedded"])
      .then((embedded) => setProducts(embedded.products));
  }, []);

  useEffect(() => {
    let newQuantity = 0;
    for (let product of basket) {
      newQuantity += product.quantity;
    }

    setProductQuantities(newQuantity);
  }, [basket]);

  useEffect(() => {
    let totalCost = 0;
    for (let product of basket) {
      totalCost += product.productAmount * product.quantity;
    }
    const stringConversion = priceFormatting(totalCost);
    setTotalAmount(stringConversion);
  }, [basket]);

  const addToCart = (product) => {
    const productToBeAdded = {
      productName: product.name,
      productAmount: product.amount,
      productId: product.id,
      quantity: 1,
    };
    setBasket((basket) => [...basket, productToBeAdded]);
    // numOfProductsInBasket();
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
    // numOfProductsInBasket();
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
    // numOfProductsInBasket();
  };

  const removeFromBasket = (searchId) => {
    let prevBasket = [...basket];
    let indexOfUpdatedProduct = prevBasket.findIndex(
      (product) => product.productId === searchId
    );
    prevBasket.splice(indexOfUpdatedProduct, 1);
    setBasket(prevBasket);
    // numOfProductsInBasket();
  };

  const changeButton = (searchId) => {
    let prevProducts = [...products];
    // console.log(prevProducts);
    // console.log(searchId);
    let indexOfUpdatedProduct = prevProducts.findIndex(
      (product) => product.id == searchId
    );

    let productToBeChanged = prevProducts[indexOfUpdatedProduct];
    productToBeChanged.addedToBasket = !productToBeChanged.addedToBasket;

    prevProducts[indexOfUpdatedProduct] = productToBeChanged;
    setProducts(prevProducts);
  };

  const priceFormatting = (price) => {
    let calculatedPrice = (price / 100).toFixed(2);
    return `£${calculatedPrice}`;
  };

  // const numOfProductsInBasket = () => {
  //   let newQuantity = 0;
  //   for (let product of basket) {
  //     newQuantity += product.quantity;
  //   }
  //   console.log(productQuantities);

  //   setProductQuantities(newQuantity);
  // };

  const basketNotEmpty =
    basket.length > 0 ? (
      <div className="basket-container">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={productQuantities} color="secondary">
            <ShoppingCartIcon style={{ fontSize: 40 }} />
          </StyledBadge>
        </IconButton>
        <ul>
          {basket.map((basketProduct) => {
            return (
              <li>
                <button
                  onClick={() => {
                    removeFromBasket(basketProduct.productId);
                    changeButton(basketProduct.productId);
                  }}
                >
                  x
                </button>
                {basketProduct.productName}:{" "}
                {priceFormatting(basketProduct.productAmount)}{" "}
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
        <p>Total: {totalAmount}</p>
        <p>
          <button className="checkout-button">
            Proceed To Checkout <ShoppingCartIcon />{" "}
          </button>
        </p>
      </div>
    ) : (
      <div className="empty-basket">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={productQuantities} color="secondary">
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
                  priceFormatting={priceFormatting}
                  addToCart={addToCart}
                  changeButton={changeButton}
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
