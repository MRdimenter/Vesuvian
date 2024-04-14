import { Button } from '../../Button/Button'
import picture from '../../../../src/img/pictures/promo-img.png';

import './promo.scss'
import { ReactTransitionGroupMenu } from '../../Header/ReactTransitionGroupMenu/ReactTransitionGroupMenu';

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
              <h2 className='h2-promo'>Upload your learning cats</h2>
              <p className='h5-promo'>Upload all of your learning materials into your iDoRecall library. Word files, PowerPoints, PDFs, images, media hosted on YouTube, Vimeo, Soundcloud, and much more.</p>
            </div>
          </div>
        </div>

        <div className="promo-offer">
          <div className="promo-offer-column">
            <div className='promo-offer-text-column'>
              <h2 className='h2-promo'>Upload your learning materials</h2>
              <p className='h5-promo'>Upload all of your learning materials into your iDoRecall library. Word files, PowerPoints, PDFs, images, media hosted on YouTube, Vimeo, Soundcloud, and much more.</p>
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
              <h2 className='h2-promo'>Upload your learning materials</h2>
              <p className='h5-promo'>Upload all of your learning materials into your iDoRecall library. Word files, PowerPoints, PDFs, images, media hosted on YouTube, Vimeo, Soundcloud, and much more.</p>
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