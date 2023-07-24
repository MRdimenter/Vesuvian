import { Button } from '../Button/Button';

import './footer.scss';

export const Footer = () => {
  return (
    <div className='footer small-text'>
      <ul className='footer-nav'>
        <li><Button btnStyle='link' label='О нас' link={'/registrationForm'} /></li>
        <li><Button btnStyle='link' label='Контакты' link={'/registrationForm'} /></li>
        <li><Button btnStyle='link' label='Блог' link={'/registrationForm'} /></li>
        <li><Button btnStyle='link' label='Что-то ещё' link={'/registrationForm'} /></li>
        <li><Button btnStyle='link' label='Ещё что-то' link={'/registrationForm'} /></li>
      </ul>
        <div className='copyright'>
          <p>© Vesuvian, Inc.</p>
          <p>2023</p>
        </div>
    </div>
  )
}

