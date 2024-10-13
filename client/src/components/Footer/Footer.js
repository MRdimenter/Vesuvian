import { Button, IconButton } from '../Button/Button';

import './footer.scss';

export const Footer = () => {
  return (
    <div className='footer small-text'>
      <ul className='footer-nav'>
        <li>
          <Button
            btnStyle='link'
            fontSize='small'
            label='О проекте'
            link={'/registrationForm'}
          />
        </li>
        <li>
          <Button
            btnStyle='link'
            fontSize='small'
            label='FAQ'
            link={'/registrationForm'}
          />
        </li>
        <li>
          <Button
            btnStyle='link'
            fontSize='small'
            label='Блог'
            link={'/registrationForm'}
          />
        </li>
        <li>
          {/* <Button
            btnStyle='link'
            label='Ещё что-то'
            link={'/registrationForm'}
          /> */}
          <ul className='socialLinks'>
            <li><IconButton iconName={'telleg_icon'} width='25' height='25' /></li>
            <li><IconButton iconName={'twit_icon'} width='25' height='25' /></li>
            <li><IconButton iconName={'vk_icon'} width='25' height='25' /></li>
          </ul>
          
          
          
        </li>
      </ul>
        <div className='copyright'>
          <p>©  2023 - 2024 ООО “ВезувианРу”</p>
        </div>
    </div>
  )
}

