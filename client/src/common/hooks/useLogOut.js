import { useDispatch } from "react-redux";
import { authenticationAction } from "../../store/actions/authenticationActions";
import { OAuth2Service } from "../utils/OAuth2Service";

const useLogOut = () => {
  const dispatch = useDispatch();
  const oAuth2Servise = new OAuth2Service();

  const logout = async () => {
    await oAuth2Servise.OAuth2LogOut();
    localStorage.clear();
    dispatch(authenticationAction());
  }

  return { logout }
}

export {
  useLogOut,
}