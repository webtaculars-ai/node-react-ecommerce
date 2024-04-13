import { cartReducer } from '../../reducers/cartReducers';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_ITEM } from '../../constants/cartConstants';

describe('Cart Reducer', () => {
  it('should handle CART_ADD_ITEM correctly by summing item quantities as integers', () => {
    const initialState = { cartItems: [] };
    const action = { 
      type: CART_ADD_ITEM, 
      payload: { product: '1', name: 'Test Product', image: '/images/test.jpg', price: 50, countInStock: 10, qty: 2 } 
    };
    
    const state = cartReducer(initialState, action);
    console.log('Testing CART_ADD_ITEM with initial item addition. Expected quantity: 2');
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].qty).toBe(2);
    
    // Simulate adding another item with quantity 3
    const secondAction = { 
      type: CART_ADD_ITEM, 
      payload: { product: '2', name: 'Second Test Product', image: '/images/test2.jpg', price: 75, countInStock: 5, qty: 3 } 
    };
    
    const updatedState = cartReducer(state, secondAction);
    console.log('Testing CART_ADD_ITEM with second item addition. Expected total quantity: 5');
    expect(updatedState.cartItems).toHaveLength(2);
    // Ensure quantities are integers and summed correctly
    const totalQty = updatedState.cartItems.reduce((sum, item) => sum + item.qty, 0);
    expect(totalQty).toBe(5);
  });

  it('should handle CART_REMOVE_ITEM correctly, updating the total item count', () => {
    const initialState = { 
      cartItems: [
        { product: '1', name: 'Test Product', qty: 2 },
        { product: '2', name: 'Second Test Product', qty: 3 }
      ] 
    };
    const action = { type: CART_REMOVE_ITEM, payload: '1' };
    
    const state = cartReducer(initialState, action);
    console.log('Testing CART_REMOVE_ITEM. Expected remaining quantity: 3');
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].product).toBe('2');
    // Ensure quantities are integers and summed correctly after removal
    const totalQty = state.cartItems.reduce((sum, item) => sum + item.qty, 0);
    expect(totalQty).toBe(3);
  });

  it('should handle CART_UPDATE_ITEM correctly, ensuring item quantities are integers and total is calculated correctly', () => {
    const initialState = { 
      cartItems: [
        { product: '1', name: 'Test Product', qty: 1 },
        { product: '2', name: 'Second Test Product', qty: 1 }
      ] 
    };
    const action = { 
      type: CART_UPDATE_ITEM, 
      payload: { product: '1', qty: 2 } // Simulate updating quantity of the first item to 2
    };
    
    const state = cartReducer(initialState, action);
    console.log('Testing CART_UPDATE_ITEM. Expected updated quantity for item 1: 2, Total quantity: 3');
    expect(state.cartItems).toHaveLength(2);
    expect(state.cartItems.find(item => item.product === '1').qty).toBe(2);
    // Ensure quantities are integers and summed correctly after update
    const totalQty = state.cartItems.reduce((sum, item) => sum + item.qty, 0);
    expect(totalQty).toBe(3);
  });
  
  // Additional logging and error handling are embedded within the testing framework's expect() and console.log() mechanisms.
});