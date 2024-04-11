import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("/api/products/" + productId);
    dispatch({
      type: CART_ADD_ITEM, payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: Number(qty)
      }
    });
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
    console.log(`Added product ${data.name} (ID: ${data._id}) to cart with quantity ${Number(qty)}.`);
  } catch (error) {
    console.error("Failed to add product to cart. Error:", error.message);
    throw new Error(`Adding product to cart failed: ${error.message}`);
  }
}

const removeFromCart = (productId) => (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
    console.log(`Removed product ID: ${productId} from cart.`);
  } catch (error) {
    console.error("Failed to remove product from cart. Error:", error.message);
    throw new Error(`Removing product from cart failed: ${error.message}`);
  }
}

const saveShipping = (data) => (dispatch) => {
  try {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
    console.log("Shipping information saved.");
  } catch (error) {
    console.error("Failed to save shipping information. Error:", error.message);
    throw new Error(`Saving shipping information failed: ${error.message}`);
  }
}

const savePayment = (data) => (dispatch) => {
  try {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
    console.log("Payment information saved.");
  } catch (error) {
    console.error("Failed to save payment information. Error:", error.message);
    throw new Error(`Saving payment information failed: ${error.message}`);
  }
}

export { addToCart, removeFromCart, saveShipping, savePayment }