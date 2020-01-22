import {DATA_FAILURE, DATA_REQUEST, DATA_SUCCESS} from "../actionTypes";

export const dataRequest = () => ({type: DATA_REQUEST});
export const dataSuccess = (data) => ({type: DATA_SUCCESS, data});
export const dataFailure = () => ({type: DATA_FAILURE});
