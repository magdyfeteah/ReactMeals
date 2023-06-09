import React, { useContext } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/Cart-Context";
import CartItem from "./CartItem";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItem = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1})
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
