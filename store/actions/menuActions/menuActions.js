import {DATA_FAILURE, DATA_REQUEST, DATA_SUCCESS} from "../actionTypes";
import axiosApi from "../../../axiosApi";

export const dataRequest = () => ({type: DATA_REQUEST});
export const dataSuccess = (data) => ({type: DATA_SUCCESS, data});
export const dataFailure = () => ({type: DATA_FAILURE});

export const fetchMenu = () => {
  return async dispatch => {
    try {
      dispatch(dataRequest());
      const response = await axiosApi.get('/react-menu.json');
      dispatch(dataSuccess(response.data));
    } catch (e) {
        dataFailure(e)
    }
  }
};
