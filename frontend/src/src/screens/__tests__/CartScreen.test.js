import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartScreen from '../CartScreen';

const mockStore = configureStore([]);

describe('CartScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        cartItems: [
          { id: 1, name: 'Product 1', qty: '1' },
          { id: 2, name: 'Product 2', qty: '2' },
          { id: 3, name: 'Product 3', qty: '1' },
        ],
      },
    });
  });

  it('should display the correct subtotal of items', () => {
    const { getByText } = render(
      <Provider store={store}>
        <CartScreen />
      </Provider>
    );

    try {
        expect(getByText('subtotal 4 items')).toBeInTheDocument();
        console.log('Test passed: Correct subtotal displayed.');
    } catch (error) {
        console.error('Test failed: Incorrect subtotal.', error);
        throw error;
    }
  });
});