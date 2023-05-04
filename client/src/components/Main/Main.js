import React from 'react';

import './main.scss';
import { CardsField } from '../CardsField/CardsField';
import { SideBar } from '../SideBar/SideBar';

export const Main = () => {
  return (
    <div className='main'>
      <SideBar/>
      <CardsField />  
    </div>
  )
}

//<CardsField />