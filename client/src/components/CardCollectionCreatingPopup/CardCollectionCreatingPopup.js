import { useState } from 'react';
import { CardCollectionCreatingNav } from './CardCollectionCreatingNav/CardCollectionCreatingNav'
import { CardCreatingForm } from './CardCreatingForm/CardCreatingForm';
import { CollectionCreatingForm } from './CollectionCreatingForm/CollectionCreatingForm';

import './cardCollectionCreatingPopup.scss';

const CardCollectionCreatingPopup = () => {
  const [activeCreating, setActiveCreating] = useState('collectionCreating')

  const popupCreatingStyles = {
    cardCreating: 'card-creating-popup',
    collectionCreating: 'collection-creating-popup'
  }

  const isCollectionCreatingForm = activeCreating === 'collectionCreating';
  const isCardCreatingForm = activeCreating === 'cardCreating';

  return (
    <div className={popupCreatingStyles[activeCreating]}>
      <CardCollectionCreatingNav activeCreating={activeCreating} setActiveCreating={setActiveCreating} />
      {isCollectionCreatingForm && <CollectionCreatingForm />}
      {isCardCreatingForm && <CardCreatingForm />}
    </div>
  )
}

export {
  CardCollectionCreatingPopup,
}