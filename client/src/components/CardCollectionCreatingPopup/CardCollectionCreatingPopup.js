import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardCollectionCreatingNav } from './CardCollectionCreatingNav/CardCollectionCreatingNav'
import { CardCreatingForm } from './CardCreatingForm/CardCreatingForm';
import { CollectionCreatingForm } from './CollectionCreatingForm/CollectionCreatingForm';

import './cardCollectionCreatingPopup.scss';

const CardCollectionCreatingPopup = () => {
  const location = useLocation();

  // const isCollectionSetting = locationState === 'onCollectionSetting';
  // const isCollectionAddition = locationState === 'CollectionEditingPageBody';
  // Необходимо для сохранения состояния "перешли из коллекции"
  const [locationState, setLocationState] = useState(location.state);
  const isCollectionSetting = useMemo(() => locationState?.from === 'onCollectionSetting', [locationState]);
  const isCollectionAddition = useMemo(() => locationState?.from === 'CollectionEditingPageBody', [locationState]);
  const collectionIdForAddition = locationState?.collectionIdForAddition;

  const [activeCreating, setActiveCreating] = useState(isCollectionAddition ? 'cardCreating' : 'collectionCreating')

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
        isCollectionAddition={isCollectionAddition}
      />
      {isCollectionCreatingForm && 
        <CollectionCreatingForm
          isCollectionSetting={isCollectionSetting}
          collectionIdForAddition={collectionIdForAddition}
        />
      }
      {isCardCreatingForm &&
        <CardCreatingForm
          isCollectionAddition={isCollectionAddition}
          collectionIdForAddition={collectionIdForAddition}
        />
      }
    </div>
  )
}

export {
  CardCollectionCreatingPopup,
}