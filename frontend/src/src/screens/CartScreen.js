import React from 'react';
import { useSelector } from 'react-redux';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate the total quantity
  const totalItems = cartItems.reduce((a, c) => a + parseInt(c.qty, 10), 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>subtotal {totalItems} items</p>
      {/* Other cart rendering logic */}
    </div>
  );
};

export default CartScreen;