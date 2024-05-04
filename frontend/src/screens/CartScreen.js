import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartScreen(props) {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    console.log(`Removing product with ID: ${productId} from cart`);
    dispatch(removeFromCart(productId));
  }

  useEffect(() => {
    if (productId) {
      console.log(`Adding product with ID: ${productId} to cart with quantity: ${qty}`);
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  const handleQuantityChange = (productId, value) => {
    try {
      const quantity = parseInt(value, 10);
      console.log(`Updating quantity for product with ID: ${productId} to ${quantity}`);
      dispatch(addToCart(productId, quantity));
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  }

  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Cart
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Cart is empty
            </div>
            :
            cartItems.map(item =>
              <li key={item.product}>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>
                  </div>
                  <div>
                    Qty:
                    <select value={item.qty} onChange={(e) => handleQuantityChange(item.product, e.target.value)}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            )
        }
      </ul>
    </div>
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * Number(c.qty), 0)}
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  </div>
}

export default CartScreen;