import { useDispatch } from 'react-redux';
import { OAuth2Service } from '../../../../common/utils/OAuth2Service';
import { authenticationAction } from '../../../../store/actions/authenticationActions';
import { Button } from '../../../Button/Button';

import './userDropdown.scss'

async function logout(dispatch) {
    const oAuth2Servise = new OAuth2Service();
  
    oAuth2Servise.OAuth2LogOut();
    localStorage.clear();
    dispatch(authenticationAction());
  }

const UserDropdown = () => {
    const dispatch = useDispatch();
    return (
        <ul className="dropdown-menu">
            <li className="dropdown-item">Profile</li>
            <li className="dropdown-item">Settings</li>
            <li className="dropdown-item">
                <Button btnStyle='link' label='LogOut' link={'/'} action={() => logout(dispatch)} />
            </li>
        </ul>
    );
};

export {
    UserDropdown,
}
