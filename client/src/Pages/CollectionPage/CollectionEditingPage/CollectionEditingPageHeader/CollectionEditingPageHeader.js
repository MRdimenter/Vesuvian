import { useEffect, useState } from 'react';
import { ApiService } from '../../../../common/utils/ApiService';
import { OAuth2Service } from '../../../../common/utils/OAuth2Service';
import { Button, IconButton } from '../../../../components/Button/Button';
import { CardTag } from '../../../../components/CardTag/CardTag';
import { Icon } from '../../../../components/Icon/Icon';
import { Title } from '../../../../components/Title/Title';

import './collectionEditingPageHeader.scss';
import { LocalStorageService } from '../../../../common/utils/LocalStorageService';
import { useDispatch, useSelector } from 'react-redux';
import { delectecollectionAction } from '../../../../store/actions/collectionAction';
import { useNavigate } from 'react-router-dom';
import { COLLECTION_DATA } from '../../../../store/constants';

const collectionAuthor = '@skaipnik';
const collectionRecentChangesDate= '09.08.2023 23:01';

const CollectionEditingPageHeader = ({ collectionTitle = 'Basic English', tags=['English'], onStartTraining, collectionId: propsCollectionId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);
  const localStorageService = new LocalStorageService('CollectionsPage');

  const [collectionId, setCollectionId] = useState();

  const collectionDataState = useSelector((state) => state.collectionData);
  const isDeletedCollection = useSelector((state) => state.collectionData.isDeleted);
  console.log('collectionDataState: ', collectionDataState);
  console.log('isDeletedCollection: ', isDeletedCollection);

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
      dispatch({type: COLLECTION_DATA.DATA.DELETE_COLLECTION_DATA, payload: false});
      navigate('/collectionsPage');
      // navigate('/');
    } else {
      console.log('else isDeletedCollection');
    }
  },[isDeletedCollection])

  const handleSubmit = () => {
    console.log('addTabClick');
  }

  const settingsSubmit = () => {
    console.log('settingsSubmitClick');
  }

  const getTags = (tags) => {
    return (
      <>
        {tags.map((tag) => {
          return (<CardTag key={tag} tagText={tag}/>) //TODO bad key
        })}
      </>
    )
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
          {getTags(tags)}
          {tags.length < 3 && <Button btnStyle='link' label='+добавить тег' action={handleSubmit} />}
          <Button btnStyle='btn' label='Удалить коллекцию' action={deleteColletion} />
        </div>
        <div className="training-bar">
          <Button btnStyle='btn' label='Начать тренировку' action={onStartTraining} />
          <IconButton iconName={'gear-wheel-svg'} iconFormat='svg' width='30' height='30' onClick={settingsSubmit} />
        </div>
      </div>
      <div className="collection-page-header-bottom">
        <div className='collection-creator'>
          <span className='small-text'>Создано {collectionAuthor}</span>
        </div>
        <div className='recent-collection-changes'>
          <span className='small-text'>Последнее изменение от {collectionRecentChangesDate}</span>
        </div>
      </div>
    </div>
  )
}

export {
  CollectionEditingPageHeader,
}