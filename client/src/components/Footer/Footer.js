import { Button } from '../Button/Button';
import './footer.scss';

export const Footer = () => {
  return (
    <div className='footer small-text'>
      <nav className='footer-nav'>
        <Button btnStyle='link' label='О нас' link={'/registrationForm'} />
        <Button btnStyle='link' label='Контакты' link={'/registrationForm'} />
        <Button btnStyle='link' label='Блог' link={'/registrationForm'} />
        <Button btnStyle='link' label='Что-то ещё' link={'/registrationForm'} />
        <Button btnStyle='link' label='Ещё что-то' link={'/registrationForm'} />
      </nav>
        <div className='copyright'>
          <p>© Vesuvian, Inc.</p>
          <p>2023</p>
        </div>
    </div>
  )
}

