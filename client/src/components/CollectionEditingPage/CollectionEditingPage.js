import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectionAction } from '../../store/actions/collectionAction';
import { LocalStorageService } from '../../common/utils/LocalStorageService';
import { CollectionEditingPageBody } from './CollectionEditingPageBody/CollectionEditingPageBody copy';
import { CollectionEditingPageHeader } from './CollectionEditingPageHeader/CollectionEditingPageHeader';

import './collectionEditingPage.scss';

const collectionTags_1 = [
  'English',
  'Nature',
  'Animals'
]

const CollectionEditingPage = () => {
  const dispatch = useDispatch();
  const [collectionData, setcollectionData] = useState([]);

  //на случай потери данных о коллекции (при перезагрузке приложения)
  const collectionDataState = useSelector((state) => state.collectionData.collectionData);
  const loadingCollectionData = useSelector((state) => state.collectionData.loading);
  const errorCollectionData = useSelector((state) => state.collectionData.error);

  useEffect(() => {
    if (collectionDataState?.collectionData?.length) {
      let { collectionData } = collectionDataState;

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