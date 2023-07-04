import { CURRENT_CUSTOMER_DATA } from "../constants";

const initialState = {
    currentCustomerData: []
};

const appendCurrentCustomerDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_CUSTOMER_DATA.APPEND_DATA:
            console.log('{...action.payload}:', {...action.payload});
            return Object.assign({}, {...action.payload})
        default:
            return state;
    }
}

export {
    appendCurrentCustomerDataReducer,
}