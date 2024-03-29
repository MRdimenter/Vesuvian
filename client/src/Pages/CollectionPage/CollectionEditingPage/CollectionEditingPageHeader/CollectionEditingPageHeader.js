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

// todo - а хорошо ли использовать OAuth2Service в хедере? и хедер ли это?? или самостоятельный уже компонент...
const CollectionEditingPageHeader = ({ collectionTitle = `Basic English default`, onStartTraining, collectionId: propsCollectionId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localStorageService = new LocalStorageService('CollectionsPage');

  const [collectionId, setCollectionId] = useState();

  const collectionDataState = useSelector((state) => state.collectionData);
  const isDeletedCollection = useSelector((state) => state.collectionInfo.isDeleted);
  const collectionInfo = useSelector((state) => state.collectionInfo.collectionInfo)

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
      dispatch({type: COLLECTION_DATA.INFO.DELETE_COLLECTION_INFO, payload: false});
      navigate('/collectionsPage');
    } else {
      console.log('else isDeletedCollection');
    }
  },[isDeletedCollection])

  const settingsSubmit = () => {
    console.log('settingsSubmitClick');
  }

  // TODO dвынести функцию удаления из хедера - негоже хедеру управлять данными приложения
  const deleteColletion = async () => {
    await dispatch(delectecollectionAction(collectionId));
  }

  const onCollectionSetting = () => {
    navigate('/cardCreatingPage', { state: { from: 'onCollectionSetting', collectionIdForAddition: collectionId } });
  }

  return (
    <div className='collection-page-header'>
      <div className="collection-page-header-top">
        <div className="card-bar">
          <Title text ={collectionInfo.name}/>
          <Icon iconName='globe-svg' iconFormat='svg' width="40" height="40" />
          <CollectionTags collectionId={collectionId} />
          <Button btnStyle='btn' label='Удалить коллекцию' action={deleteColletion} />
          <button onClick={onCollectionSetting}>CollectionSetting</button>
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