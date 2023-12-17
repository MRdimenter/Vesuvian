import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LocalStorageService } from '../../../../common/utils/LocalStorageService';
import { delectecollectionAction } from '../../../../store/actions/collectionAction';
import { Button, IconButton } from '../../../../components/Button/Button';
import { CollectionTags } from './CollectionTags/CollectionTags';
import { CollectionInformation } from './CollectionInformation/CollectionInformation';
import { Icon } from '../../../../components/Icon/Icon';
import { Title } from '../../../../components/Title/Title';
import { COLLECTION_DATA } from '../../../../store/constants';

import './collectionEditingPageHeader.scss';

// todo а у меня до сих пор нет реальных данных для коллекции?
const collectionAuthor = '@skaipnik';
const collectionRecentChangesDate= '09.08.2023 23:01';

// todo - а хорошо ли использовать OAuth2Service в хедере? и хедер ли это?? или самостоятельный уже компонент...
const CollectionEditingPageHeader = ({ collectionTitle = 'Basic English', onStartTraining, collectionId: propsCollectionId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localStorageService = new LocalStorageService('CollectionsPage');

  const [collectionId, setCollectionId] = useState();

  const collectionDataState = useSelector((state) => state.collectionData);
  const isDeletedCollection = useSelector((state) => state.collectionInfo.isDeleted);

  useEffect(() => {
    if (propsCollectionId) {
      setCollectionId(propsCollectionId);
    } else {
      const collectionIdObject = localStorageService.getValue();
      setCollectionId(collectionIdObject.collectionId);
    }
  }, [propsCollectionId])

  useEffect(() => {
    if (isDeletedCollection) {
      console.log('isDeletedCollection');
      dispatch({type: COLLECTION_DATA.INFO.DELETE_COLLECTION_INFO, payload: false});
      navigate('/collectionsPage');
      // navigate('/');
    } else {
      console.log('else isDeletedCollection');
    }
  },[isDeletedCollection])

  const settingsSubmit = () => {
    console.log('settingsSubmitClick');
  }

  // TODO dвынести функцию удаления из хедера - негоже хедеру управлять данными приложения
  const deleteColletion = async () => {
    console.log('deleteColletion, collectionId: ', collectionId);
    // apiService.deleteCollection(collectionId);
    await dispatch(delectecollectionAction(collectionId));
  }

  return (
    <div className='collection-page-header'>
      <div className="collection-page-header-top">
        <div className="card-bar">
          <Title text ={collectionTitle}/>
          <Icon iconName='globe-svg' iconFormat='svg' width="40" height="40" />
          <CollectionTags collectionId={collectionId} />
          <Button btnStyle='btn' label='Удалить коллекцию' action={deleteColletion} />
        </div>
        <div className="training-bar">
          <Button btnStyle='btn' label='Начать тренировку' action={onStartTraining} />
          <IconButton iconName={'gear-wheel-svg'} iconFormat='svg' width='30' height='30' onClick={settingsSubmit} />
        </div>
      </div>
      <CollectionInformation collectionDataState={collectionDataState}/>
    </div>
  )
}

export {
  CollectionEditingPageHeader,
}