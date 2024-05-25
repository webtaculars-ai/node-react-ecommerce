import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartScreen from './CartScreen';

const mockStore = configureStore([]);

const renderWithRedux = (component, { initialState, store = mockStore(initialState) } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('CartScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        cartItems: [
          { id: '1', name: 'Product 1', qty: 1, price: 100 },
          { id: '2', name: 'Product 2', qty: 2, price: 200 },
        ],
      },
    });
  });

  it('should display the correct subtotal of items', () => {
    renderWithRedux(<CartScreen />);

    const subtotalText = screen.getByText(/subtotal/i);
    expect(subtotalText).toHaveTextContent('subtotal 3 items');
  });

  it('should update the subtotal when item quantity is changed', () => {
    renderWithRedux(<CartScreen />);

    const increaseButton = screen.getAllByRole('button', { name: '+' })[0];
    fireEvent.click(increaseButton);

    const subtotalText = screen.getByText(/subtotal/i);
    expect(subtotalText).toHaveTextContent('subtotal 4 items');
  });

  it('should handle multiple quantity changes and display the correct subtotal', () => {
    renderWithRedux(<CartScreen />);

    const increaseButton = screen.getAllByRole('button', { name: '+' })[0];
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);

    const decreaseButton = screen.getAllByRole('button', { name: '-' })[1];
    fireEvent.click(decreaseButton);

    const subtotalText = screen.getByText(/subtotal/i);
    expect(subtotalText).toHaveTextContent('subtotal 4 items');
  });
});