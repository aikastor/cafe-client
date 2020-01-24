import {
  ADD_ITEM, DECREASE_ITEM_QNT, INCREASE_ITEM_QNT,
  INIT_CART,
  ORDER_FAILURE,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  REMOVE_ITEM
} from "../actionTypes";
import axiosApi from "../../../axiosApi";

export const addItem = (itemID, price)=> ({type: ADD_ITEM, itemID, price});
export const removeItem =(itemID, price)=>({type: REMOVE_ITEM, item, price});

export const orderRequest = () => ({type: ORDER_REQUEST});
export const orderSuccess = () => ({type: ORDER_SUCCESS});
export const orderFailure = (error) => ({type: ORDER_FAILURE, error});

export const increaseQnt = (name, price)=> ({type: INCREASE_ITEM_QNT, name, price});
export const decreaseQnt = (name, price)=> ({type: DECREASE_ITEM_QNT, name, price});

export const initCart = ()=> ({type: INIT_CART});

export const createOrder = order => {
  return async (dispatch) => {
    try {
      dispatch (orderRequest());
      await axiosApi.post('react-cafe-orders.json', order);
      dispatch(orderSuccess());
    } catch (e) {
      dispatch(orderFailure(e))
    }
  }
};

