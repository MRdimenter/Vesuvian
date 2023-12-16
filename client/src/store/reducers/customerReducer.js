import { CUSTOMER_DATA } from "../constants";

const initialState = {
  loading: false,
  error: null,
  customerData: {},
  isDeleted: false,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_DATA.START_LOADING_CUSTOMER_DATA:
      return { ...state, loading: true, error: null };
    case CUSTOMER_DATA.FINISH_LOADING_CUSTOMER_DATA:
      return { ...state, loading: false, error: action.payload?.error || null };
    case CUSTOMER_DATA.SET_CUSTOMER_DATA:
      return { ...state, customerData: action.payload, error: null };
    default:
      return state;
  }
}

export {
  customerReducer,
}
