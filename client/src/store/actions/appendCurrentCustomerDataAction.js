import { ApiService } from '../../common/utils/ApiService';
import { OAuth2Service } from '../../common/utils/OAuth2Service';
import { CURRENT_CUSTOMER_DATA } from '../constants';

export const appendCurrentCustomerDataAction = () => {
  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);

  return async (dispatch) => {
    try {
      const response = await apiService.getCurrentCustomer();
      dispatch({type: CURRENT_CUSTOMER_DATA.APPEND_DATA, payload: response});  
    } catch (error) {
      dispatch({type: CURRENT_CUSTOMER_DATA.FETCH_DATA_ERROR, payload: error});
    }
  }
}