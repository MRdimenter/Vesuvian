import { Button } from '../Button/Button';
import './footer.scss';

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <Button btnStyle='link' label='О компании' link={'/registrationForm'} />
        <Button btnStyle='link' label='Помощь' link={'/registrationForm'} />
        <Button btnStyle='link' label='Новости' link={'/registrationForm'} />
      </div>
        <div className='copyright'>© 2023 Vesuvian, Inc.</div>
    </div>
  )
}

