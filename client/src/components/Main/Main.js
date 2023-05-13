import React from 'react';

import './main.scss';
import { CardsField } from '../CardsField/CardsField';
import { SideBar } from '../SideBar/SideBar';
import { IntroChapter } from '../IntroChapter/IntroChapter';

export const Main = () => {
  return (
    <div className='main'>
      <SideBar/>
      <IntroChapter/>
      <CardsField />  
    </div>
  )
}

//<CardsField />