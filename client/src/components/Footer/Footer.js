import { Button } from '../Button/Button';

import './footer.scss';

export const Footer = () => {
  return (
    <div className='footer small-text'>
      <ul className='footer-nav'>
        <li style={{ border: '1px solid yellow'}}>
          <Button
            btnStyle='link'
            fontSize='small'
            label='О проекте'
            link={'/registrationForm'}
          />
        </li>
        <li style={{ border: '1px solid yellow'}}>
          <Button
            btnStyle='link'
            fontSize='small'
            label='FAQ'
            link={'/registrationForm'}
          />
        </li>
        <li style={{ border: '1px solid yellow'}}>
          <Button
            btnStyle='link'
            fontSize='small'
            label='Блог'
            link={'/registrationForm'}
          />
        </li>
        <li style={{ border: '1px solid yellow'}}>
          <Button
            btnStyle='link'
            label='Ещё что-то'
            link={'/registrationForm'}
          />
        </li>
      </ul>
        <div className='copyright'>
          <p>©  2023 - 2024 ООО “ВезувианРу”</p>
        </div>
    </div>
  )
}

