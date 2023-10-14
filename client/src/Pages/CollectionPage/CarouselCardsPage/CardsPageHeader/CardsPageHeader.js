import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar'

import './cardsPageHeader.scss'

const CardsPageHeader = ({collectionName = 'Some collection', currentPage, cardsInCollection}) => {
  
  return (
    <div className='cards-page-header'>
      <ProgressBar currentPage={currentPage} cardsInCollection={cardsInCollection} />
      <h5 className='h5-promo'>{collectionName}</h5>
    </div>
  )
}

export {
  CardsPageHeader,
}