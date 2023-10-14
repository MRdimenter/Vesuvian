import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectionAction } from '../../store/actions/collectionAction';
import { LocalStorageService } from '../../common/utils/LocalStorageService';
import { CollectionEditingPageBody } from './CollectionEditingPageBody/CollectionEditingPageBody copy';
import { CollectionEditingPageHeader } from './CollectionEditingPageHeader/CollectionEditingPageHeader';

import './collectionEditingPage.scss';

const collection = [
  {
    term: 'Hello'
  },
  {
    term: 'It'
  },
  {
    term: 'Is'
  },
  {
    term: 'Me'
  },
  {
    term: 'I'
  },
  {
    term: 'Have'
  },
  {
    term: 'Thought'
  },
  {
    term: 'About'
  },
  {
    term: 'Us'
  },
  {
    term: 'For'
  },
  {
    term: 'A'
  },
  {
    term: 'Long'
  },
  {
    term: 'Time'
  },
]

const collectionTags_1 = [
  'English',
  'Nature',
  'Animals'
]

const getCollectionTags = (collectionData) => {
  //const collectionTags = collectionData.map((card) => card.)

  //return collectionTags
}

const CollectionEditingPage = () => {
  const dispatch = useDispatch();

  //const [collectionId, setCollectionId] = useState(null);
  const [collectionData, setcollectionData] = useState([]);

  //на случай потери данных о коллекции (при перезагрузке приложения)
  const collectionDataState = useSelector((state) => state.collectionData.collectionData);
  const loadingCollectionData = useSelector((state) => state.collectionData.loading);
  const errorCollectionData = useSelector((state) => state.collectionData.error);

  useEffect(() => {
    if (collectionDataState?.collectionData?.length) {
      let { collectionData } = collectionDataState;

      if (collectionData.length) {
        collectionData = collectionDataState.collectionData;
      }

      //setCollectionId(collectionId);
      setcollectionData(collectionData);
    } else {
      const localStorageService = new LocalStorageService('CollectionsPage');

      const collectionIdObject = localStorageService.getValue();
      dispatch(collectionAction(collectionIdObject.collectionId));
    }

  }, [collectionDataState, dispatch])

  const isCollectionData = collectionDataState && !loadingCollectionData && !errorCollectionData;

  return (
    <div className='collection-page'>
      { isCollectionData &&
        <>
          <CollectionEditingPageHeader tags={collectionTags_1} />
          <CollectionEditingPageBody collectionData={collectionData} />
        </>
      }
    </div>
  )
}

export {
  CollectionEditingPage,
}