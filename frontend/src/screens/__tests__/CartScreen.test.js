import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CartScreen from '../CartScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock store setup
const mockStore = configureStore([]);
const initialState = {
  cart: {
    cartItems: [
      { product: '1', name: 'Product 1', image: '/images/p1.jpg', price: 60, countInStock: 10, qty: 1 },
      { product: '2', name: 'Product 2', image: '/images/p2.jpg', price: 70, countInStock: 15, qty: 2 },
    ],
  },
};
const store = mockStore(initialState);

describe('CartScreen - Quantity Updates and Subtotal Calculation', () => {
  test('should correctly calculate and display subtotal quantity when item quantities are updated', () => {
    try {
      const { getByText, getAllByRole } = render(
        <Provider store={store}>
          <CartScreen />
        </Provider>
      );

      // Find quantity select elements for each cart item
      const quantitySelects = getAllByRole('combobox');
      
      // Simulate changing quantity for the first item
      fireEvent.change(quantitySelects[0], { target: { value: '3' } });

      expect(getByText('Subtotal (5 items)')).toBeInTheDocument();
    } catch (error) {
      console.error('Failed to test quantity update in CartScreen', error);
      throw error;
    }
  });

  test('should correctly update subtotal when an item is added', () => {
    try {
      // Assuming the action of adding an item is handled outside and reflects through props or redux state update
      const newState = {
        ...initialState,
        cart: {
          ...initialState.cart,
          cartItems: [
            ...initialState.cart.cartItems,
            { product: '3', name: 'Product 3', image: '/images/p3.jpg', price: 80, countInStock: 5, qty: 1 },
          ],
        },
      };
      const newStore = mockStore(newState);

      const { getByText } = render(
        <Provider store={newStore}>
          <CartScreen />
        </Provider>
      );

      expect(getByText('Subtotal (4 items)')).toBeInTheDocument();
    } catch (error) {
      console.error('Failed to test item addition in CartScreen', error);
      throw error;
    }
  });

  test('should correctly update subtotal when an item is removed', () => {
    try {
      // Assuming the action of removing an item is handled outside and reflects through props or redux state update
      const newState = {
        ...initialState,
        cart: {
          ...initialState.cart,
          cartItems: initialState.cart.cartItems.slice(0, 1), // Remove second item
        },
      };
      const newStore = mockStore(newState);

      const { getByText } = render(
        <Provider store={newStore}>
          <CartScreen />
        </Provider>
      );

      expect(getByText('Subtotal (1 items)')).toBeInTheDocument();
    } catch (error) {
      console.error('Failed to test item removal in CartScreen', error);
      throw error;
    }
  });
});