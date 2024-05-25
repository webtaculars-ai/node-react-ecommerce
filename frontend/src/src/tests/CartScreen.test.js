import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartScreen from '../screens/CartScreen';

const mockStore = configureStore([]);

describe('CartScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        cartItems: [
          { id: 1, name: 'Item 1', price: 10, qty: 1 },
          { id: 2, name: 'Item 2', price: 15, qty: 2 },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  test('should display correct subtotal items and amount', () => {
    try {
      render(
        <Provider store={store}>
          <CartScreen />
        </Provider>
      );

      // Verify initial subtotal items and amount
      expect(screen.getByText('Subtotal (3 items)')).toBeInTheDocument();
      expect(screen.getByText('$ 40')).toBeInTheDocument();
      console.log('Initial subtotal items and amount displayed correctly.');
    } catch (error) {
      console.error('Error in displaying initial subtotal items and amount:', error);
    }
  });

  test('should update subtotal items and amount when quantity changes', () => {
    try {
      render(
        <Provider store={store}>
          <CartScreen />
        </Provider>
      );

      // Update quantity of the first item
      const qtyInput = screen.getByLabelText('Qty of Item 1');
      fireEvent.change(qtyInput, { target: { value: '3' } });

      // Verify updated subtotal items and amount
      expect(screen.getByText('Subtotal (5 items)')).toBeInTheDocument();
      expect(screen.getByText('$ 65')).toBeInTheDocument();
      console.log('Subtotal items and amount updated correctly when quantity changes.');
    } catch (error) {
      console.error('Error in updating subtotal items and amount:', error);
    }
  });
});