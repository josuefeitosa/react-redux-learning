import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, ICartState } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id,
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({ product, quantity: 1 });
        }

        break;
      }
      case ActionTypes.addProductToCartFailure: {
        const productFailedStockCheckIndex = draft.failedStockCheck.findIndex(
          (item) => item === action.payload.productId,
        );

        if (productFailedStockCheckIndex < 0)
          draft.failedStockCheck.push(action.payload.productId);

        break;
      }
      case ActionTypes.removeProductFromCart: {
        const productIndex = draft.items.findIndex(
          (item) => item.product.id === action.payload.productId,
        );
        const productFailedStockCheckIndex = draft.failedStockCheck.findIndex(
          (item) => item === action.payload.productId,
        );

        console.log(productFailedStockCheckIndex);

        if (productFailedStockCheckIndex >= 0)
          draft.failedStockCheck.splice(productFailedStockCheckIndex, 1);

        draft.items.splice(productIndex, 1);

        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default cart;
