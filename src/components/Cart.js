import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RestaurantMenuCard from "./RestaurantMenuCard";
import { clearCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleEmptyClick = () => {
    dispatch(clearCart());
  };

  if (cartItems?.length == 0) {
    return (
      <div className="empty-cart-msg">
        <img
          alt="Empty Cart"
          src="https://cdn-icons-png.freepik.com/512/11329/11329060.png"
        />
      </div>
    );
  }

  return (
    <div className="cart">
      <div style={{ marginTop: "6rem" }} className="cart-name">
        Cart
      </div>
      <button className="filter-btn" onClick={handleEmptyClick}>
        Empty Cart
      </button>
      <div className="cart-items">
        {cartItems?.map((item, index) => {
          return <RestaurantMenuCard data={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Cart;