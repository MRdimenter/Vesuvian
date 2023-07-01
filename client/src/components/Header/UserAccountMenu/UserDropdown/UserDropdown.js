import './userDropdown.scss'

const UserDropdown = () => {
    return (
        <ul className="dropdown-menu">
            <li className="dropdown-item">Profile</li>
            <li className="dropdown-item">Settings</li>
            <li className="dropdown-item">Logout</li>
        </ul>
    );
};

export {
    UserDropdown,
}
