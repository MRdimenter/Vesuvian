import './main.scss';

//import { CardsField } from '../CardsField/CardsField';
import { SideBar } from '../SideBar/SideBar';
import { Promo } from './Promo/Promo';

export const Main = () => {
  return (
    <div className='main'>
      <SideBar />
      <Promo />
    </div>
  )
}

// <IntroChapter/>
// <CardsField />