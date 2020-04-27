import React, { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import "../createorder.css";

export default function CreateOrder() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [productQuantities, setProductQuantities] = useState(0);
  const [totalAmount, setTotalAmount] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch("https://cryptic-depths-18334.herokuapp.com/products")
      .then((res) => res.json())
      .then((result) => result["_embedded"])
      .then((embedded) => setProducts(embedded.products));
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    }
  }, []);
  const layoutOnMobile = isMobile ? "" : "scrollable-products";

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

  const removeFromBasket = (searchId) => {
    let prevBasket = [...basket];
    let indexOfUpdatedProduct = prevBasket.findIndex(
      (product) => product.productId === searchId
    );
    prevBasket.splice(indexOfUpdatedProduct, 1);
    setBasket(prevBasket);
  };

  const changeButton = (searchId) => {
    let prevProducts = [...products];
    let indexOfUpdatedProduct = prevProducts.findIndex(
      (product) => product.id === searchId
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
              <li className="basket-product">
                <button
                  onClick={() => {
                    removeFromBasket(basketProduct.productId);
                    changeButton(basketProduct.productId);
                  }}
                >
                  <ClearIcon />
                </button>
                {basketProduct.productName}:{" "}
                {priceFormatting(basketProduct.productAmount)}
                <div className="quantity-changes">
                  <button
                    onClick={() => {
                      decreaseByOne(basketProduct.productId);
                    }}
                  >
                    <RemoveIcon />
                  </button>
                  <span className="product-counter">
                    {basketProduct.quantity}
                  </span>
                  <button
                    onClick={() => {
                      increaseByOne(basketProduct.productId);
                    }}
                  >
                    <AddIcon />
                  </button>
                </div>
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
        <div className={layoutOnMobile}>
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

// Styling
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);
