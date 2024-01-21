import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardCollectionCreatingNav } from './CardCollectionCreatingNav/CardCollectionCreatingNav'
import { CardCreatingForm } from './CardCreatingForm/CardCreatingForm';
import { CollectionCreatingForm } from './CollectionCreatingForm/CollectionCreatingForm';

import './cardCollectionCreatingPopup.scss';

const CardCollectionCreatingPopup = () => {
  const location = useLocation();
  const { state } = location;
  
  const isCollectionSetting = state?.from === 'onCollectionSetting';
  const isCollictionAddition = state?.from === 'CollectionEditingPageBody';
  const collectionIdForAddition = state?.collectionIdForAddition;

  const [activeCreating, setActiveCreating] = useState(isCollictionAddition ? 'cardCreating' : 'collectionCreating')

  const popupCreatingStyles = {
    cardCreating: 'card-creating-popup',
    collectionCreating: 'collection-creating-popup'
  }

  const isCollectionCreatingForm = activeCreating === 'collectionCreating';
  const isCardCreatingForm = activeCreating === 'cardCreating';

  return (
    <div className={popupCreatingStyles[activeCreating]}>
      <CardCollectionCreatingNav
        activeCreating={activeCreating}
        setActiveCreating={setActiveCreating}
        isCollectionSetting={isCollectionSetting}
        isCollictionAddition={isCollictionAddition}
      />
      {isCollectionCreatingForm && 
        <CollectionCreatingForm
          isCollectionSetting={isCollectionSetting}
          collectionIdForAddition={collectionIdForAddition}
        />
      }
      {isCardCreatingForm &&
        <CardCreatingForm
          isCollictionAddition={isCollictionAddition}
          collectionIdForAddition={collectionIdForAddition}
        />
      }
    </div>
  )
}

export {
  CardCollectionCreatingPopup,
}