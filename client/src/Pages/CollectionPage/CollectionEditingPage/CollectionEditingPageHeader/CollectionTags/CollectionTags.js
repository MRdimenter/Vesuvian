import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OAuth2Service } from '../../../../../common/utils/OAuth2Service';
import { ApiService } from '../../../../../common/utils/ApiService';
import { LocalStorageService } from '../../../../../common/utils/LocalStorageService';
import { collectionTagsAction } from '../../../../../store/actions/collectionAction';
import { TagsCreatingForm } from '../../../../../components/CardCollectionCreatingPopup/CollectionCreatingForm/TagsCreatingForm/TagsCreatingForm';

// TODO добавить очистку данных для тэгов коллекции при покидании коллекции 
// (при переходе на другую коллекцию до обновления данных сохраняются данные о предыдущей коллекции)
// хотя вроде исправил проверкой принадлежности к данной коллекции
const CollectionTags = ({ collectionId }) => {
  const dispatch = useDispatch();
  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);
  const localStorageService = new LocalStorageService('CollectionsPage');

  const collectionTagsState = useSelector((state) => state.collectionTags);
  const [collectionTags, setcollectionTags] = useState([]);
  const [collectionTagsFetchError, setcollectionTagsFetchError] = useState();

  const handleCollectionTagsAction = async (collectionIdObject) => {
    const { collectionId } = collectionIdObject;
    try {
      await dispatch(collectionTagsAction(collectionId));
    } catch (error) {
      setcollectionTagsFetchError(error);
    }
  }

  const setNewTag = async (newTagValue) => {
        const collectionData = {
      "name": newTagValue,
    }

    // todo ошибка 409 Conflict - создание дублирующего тега
    const response = await apiService.postNewCollectionTagById(collectionData, collectionId);
    console.log('postNewCollectionTagById: response: ', response);
    if (response) {
      const collectionIdObject = localStorageService.getValue();
      handleCollectionTagsAction(collectionIdObject);
    }
    //todo обновление списка тэгов при удалчном ответе (постараться обновлять не всю коллекцию, а только список тэгов)
  }

  const deleteTag = async (tagComponent) => {
    const tagIndex = tagComponent.props.index; 
    const tagId = collectionTagsState.collectionTags.collectionTags[tagIndex]?.id;

    const response = await apiService.deleteCollectionTag(tagId, collectionId);
    console.log('deleteTag postNewCollectionTagById: response: ', response);
    if (response) {
      const collectionIdObject = localStorageService.getValue();
      handleCollectionTagsAction(collectionIdObject);
    }
  }

  useEffect(() => {
    const collectionIdObject = localStorageService.getValue();
    handleCollectionTagsAction(collectionIdObject);
  }, [])

  useEffect(() => {
    const { collectionTags: collectionTagsObject } = collectionTagsState;

    // если тэги принадлежат выбранной коллекции
    if (collectionTagsObject.collectionId === collectionId) {
      const collectionTags = collectionTagsObject.collectionTags.map((tagObject) => tagObject.name);
      setcollectionTags(collectionTags);
    }
  }, [collectionTagsState, collectionId])

  return (
    <TagsCreatingForm
      tags={collectionTags}
      setNewTag={setNewTag}
      deleteTag={deleteTag}
    />
  )
}

export {
  CollectionTags,
}