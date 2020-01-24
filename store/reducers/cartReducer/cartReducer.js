import {
  ADD_ITEM,
  DECREASE_ITEM_QNT,
  INCREASE_ITEM_QNT,
  INIT_CART,
  ORDER_FAILURE,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  REMOVE_ITEM
} from "../../actions/actionTypes";

const initialState = {
  order: {},
  totalPrice: 0,
  ordering: false,
  error: null,
};
let order = {
  bread: {qnt:3, totalPrice : 280},
};
const cartReducer = (state = initialState, action)=> {
  const curState = {...state.order};

  const addItem = (itemID, price)=> {
    const newPrice = parseInt(price);

    if (curState.hasOwnProperty(itemID)) {
      curState[itemID].qnt ++;
      curState[itemID].totalPrice += newPrice;
    } else {
      curState[itemID] ={qnt: 1, totalPrice: newPrice}
    }

    return {
      ...state,
      order: {...state.order, ...curState},
      totalPrice: state.totalPrice + newPrice,
    }
  };

  const increaseQnt = (itemID, price)=> {
    curState.itemID.qnt ++;
    curState.itemID.totalPrice += price;

    return{
      ...state,
      orders: curState,
      totalPrice: state.totalPrice + price,
    }
  };

  const decreaseQnt = (itemID, price)=>{
    if (curState.hasOwnProperty(itemID)) {

      if (curState[itemID].qnt > 1) {
        curState[itemID].qnt --;
        curState[itemID].totalPrice -= price;

        return{
          ...state,
          orders: curState,
          totalPrice: state.totalPrice - price,
        }

      } else {
        curState[itemID].qnt = 0;
        curState[itemID].total = 0;
        delete curState[itemID];

        return{
          ...state,
          orders: curState,
          totalPrice: state.totalPrice  - price,
        }
      }
    } else {
      return {...state}
    }

  };

  switch (action.type) {
    case ADD_ITEM:
      return addItem(action.itemID, action.price);
    case REMOVE_ITEM:
      return {
        ...state,
        orders: delete {...state.order}.action.itemID,
        totalPrice: state.totalPrice - action.price
      };
    case INCREASE_ITEM_QNT:
      return  increaseQnt(action.name, action.price);
    case DECREASE_ITEM_QNT:
      return  decreaseQnt(action.name, action.price);
    case ORDER_REQUEST:
      return {...state, ordering: true};
    case ORDER_SUCCESS:
      return {...state, ordering: false, error: null};
    case ORDER_FAILURE:
      return {...state, ordering: false, error: action.error};
    case INIT_CART:
      return {...state, order: {}, totalPrice: 0};
    default:
      return state
  }
};
export default cartReducer;