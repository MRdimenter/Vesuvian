import React from 'react';

import OAuthPopup from '../OAuthPopup/OAuthPopup';
import './main.scss';
import { CardsField } from '../CardsField/CardsField';
import { SideBar } from '../SideBar/SideBar';
import { Card } from '../CardsField/Card/Card';

export const Main = () => {
  return (
    <div className='main'>
      <SideBar/>
      <OAuthPopup/>
      <CardsField />  
    </div>
  )
}

//<CardsField />