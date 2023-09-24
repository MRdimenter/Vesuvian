import { useState } from 'react';
import { CardCollectionCreatingNav } from './CardCollectionCreatingNav/CardCollectionCreatingNav'

import './cardCollectionCreatingPopup.scss';
import { CardCreatingForm } from './CardCreatingForm/CardCreatingForm';

const CardCollectionCreatingPopup = () => {
  const [activeCreating, setActiveCreating] = useState('collectionCreating')

  const popupCreatingStyles = {
    cardCreating: 'card-creating-popup',
    collectionCreating: 'collectio-creating-popup'
  }

  const isCollectionCreatingForm = activeCreating === 'collectionCreating';
  const isCardCreatingForm = activeCreating === 'cardCreating';

  return (
    <div className={popupCreatingStyles[activeCreating]}>
      <CardCollectionCreatingNav activeCreating={activeCreating} setActiveCreating={setActiveCreating} />
      {isCardCreatingForm && <CardCreatingForm />}
    </div>
  )
}

export {
  CardCollectionCreatingPopup,
}