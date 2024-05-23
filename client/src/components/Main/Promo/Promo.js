import { Button } from '../../Button/Button'
import { ReactTransitionGroupMenu } from '../../Header/ReactTransitionGroupMenu/ReactTransitionGroupMenu';
import picture from '../../../../src/img/pictures/promo-img.png';

import './promo.scss'

const Promo = () => {
  return (
    <div className='promo-wrapper'>
      <section className='promo-header'>
      <ReactTransitionGroupMenu />
        <div className='promo-header-content big-text'>
          <div className='promo-header-column justify-left'>
            <p>учиться</p>
            <p>учиться</p>
            <p>учиться</p>
          </div>
          <div className='promo-header-column justify-right'>
            <p>проще</p>
            <p>быстрее</p>
            <p>эффективнее</p>
          </div>
        </div>
        <Button btnStyle='btn big-button' label='НАЧНИТЕ ПРЯМО СЕЙЧАС' link={'/registrationForm'} />
      </section>

      <section className='promo-offers'>
        <div className="promo-offer">
          <div className="promo-offer-column">
            <img src={picture} className="promo-offer-picture" alt="promo-offer"></img>
          </div>
          <div className="promo-offer-column">
            <div className='promo-offer-text-column'>
              <h2 className='middle-promo'>Ваш любимый сервис для создания карточек</h2>
              <p className='h5-promo'>С их помощью вы сможете освоить любой учебный материал. Эффективный способ повторения поможет вам усвоить нужную информацию и успешно применять её на практике.</p>
            </div>
          </div>
        </div>

        <div className="promo-offer">
          <div className="promo-offer-column">
            <div className='promo-offer-text-column'>
              <h2 className='middle-promo'>Персонализация карточек</h2>
              <p className='h5-promo'>Добавляйте индивидуальный характер к вашим карточкам с помощью загрузки собственных изображений и формул. Максимум возможностей для эффективной подготовки к экзаменам, тестам и презентациям.</p>
            </div>
          </div>
          <div className="promo-offer-column flex-column-justify-right">
            <img src={picture} className="promo-offer-picture" alt="promo-offer"></img>
          </div>
        </div>

        <div className="promo-offer">
          <div className="promo-offer-column">
            <img src={picture} className="promo-offer-picture" alt="promo-offer"></img>
          </div>
          <div className="promo-offer-column">
            <div className='promo-offer-text-column'>
              <h2 className='middle-promo'>Обмен коллекциями</h2>
              <p className='h5-promo'>Ищите коллекции по интересующим вас темам и делитесь своими собственными наработками с друзьями или учебными группами. Расширяйте границы знаний вместе с Vesuvian.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export {
  Promo,
}