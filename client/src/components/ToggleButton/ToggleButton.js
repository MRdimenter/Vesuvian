import { Button } from '../Button/Button';

import './toggleButton.scss';

function ToggleButton({ id, label, onClick, activeState }) {
    return (
        <div className={activeState === id ? 'underlined' : ''}>
            <Button btnStyle='link' label={label} id={id} action={onClick} textColor='black' fontSize='big' />
        </div>
    );
}

export default ToggleButton;