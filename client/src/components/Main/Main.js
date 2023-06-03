import './main.scss';

import { CardsField } from '../CardsField/CardsField';
import { SideBar } from '../SideBar/SideBar';
import { IntroChapter } from '../IntroChapter/IntroChapter';

export const Main = () => {
  return (
    <div className='main'>
      <SideBar/>
      <CardsField />  
    </div>
  )
}

// <IntroChapter/>
// <CardsField />