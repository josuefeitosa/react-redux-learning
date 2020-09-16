import React, { MouseEvent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { IState } from '../store';
import { removeProductFromCart } from '../store/modules/cart/actions';
import { ICartItem } from '../store/modules/cart/types';

const Cart: React.FC = () => {
  const cart = useSelector<IState, ICartItem[]>((state) => state.cart.items);

  const dispatch = useDispatch();
  const handleRemoveProductFromCart = useCallback(
    (productId: number) => {
      dispatch(removeProductFromCart(productId));
    },
    [dispatch],
  );

  const handleCheckout = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      console.log(cart);
    },
    [cart],
  );

  return (
    <>
      <table style={{ marginTop: 15 }}>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.product.id}>
              <td>{item.product.title}</td>
              <td>{item.product.price}</td>
              <td>{item.quantity}</td>
              <td>{(item.product.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveProductFromCart(item.product.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cart.length > 0 && (
        <button style={{ marginTop: 8 }} type="button" onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </>
  );
};

export default Cart;
