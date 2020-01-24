import {DATA_FAILURE, DATA_REQUEST, DATA_SUCCESS} from "../../actions/actionTypes";

const initialSate = {
  menu: {},
  loading: false,
  error: false
};

const menuReducer =(state = initialSate, action) => {
  switch (action.type) {
    case DATA_REQUEST:
      return {...state, loading: false};
    case DATA_SUCCESS:
      return {...state, menu: action.data, loading: false};
    case DATA_FAILURE:
      return {...state, loading: false, error: action.error};
    default:
      return state
  }
};

export default menuReducer;