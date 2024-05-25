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
    try {
      dispatch(removeFromCart(productId));
      console.log(`Removed product ${productId} from cart`);
    } catch (error) {
      console.error(`Error removing product ${productId} from cart: `, error);
    }
  }

  useEffect(() => {
    try {
      if (productId) {
        dispatch(addToCart(productId, qty));
        console.log(`Added product ${productId} to cart with quantity ${qty}`);
      }
    } catch (error) {
      console.error(`Error adding product ${productId} to cart: `, error);
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    try {
      props.history.push("/signin?redirect=shipping");
      console.log("Navigating to sign-in page for checkout");
    } catch (error) {
      console.error("Error during checkout navigation: ", error);
    }
  }

  return (
    <div className="cart">
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
          {cartItems.length === 0 ? (
            <div>
              Cart is empty
            </div>
          ) : (
            cartItems.map(item => (
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
                    <select
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((a, c) => a + parseInt(c.qty, 10), 0)} items) :
          $ {cartItems.reduce((a, c) => a + c.price * parseInt(c.qty, 10), 0)}
        </h3>
        <button
          onClick={checkoutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
