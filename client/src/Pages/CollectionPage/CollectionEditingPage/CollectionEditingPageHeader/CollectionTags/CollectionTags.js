import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectionTagsAction } from '../../../../../store/actions/collectionAction';
import { TagsCreatingForm } from '../../../../../components/CardCollectionCreatingPopup/CollectionCreatingForm/TagsCreatingForm/TagsCreatingForm';
import { OAuth2Service } from '../../../../../common/utils/OAuth2Service';
import { ApiService } from '../../../../../common/utils/ApiService';
import { LocalStorageService } from '../../../../../common/utils/LocalStorageService';

const CollectionTags = ({ collectionId }) => {
  const dispatch = useDispatch();
  const oauthService = new OAuth2Service();
  const apiService = new ApiService(oauthService);
  const localStorageService = new LocalStorageService('CollectionsPage');

  const collectionTagsState = useSelector((state) => state.collectionTags.collectionTags);
  const state = useSelector((state) => state);
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
    const tagId = collectionTagsState.collectionTags[tagIndex]?.id;

    const response = await apiService.deleteCollectionTag(tagId, collectionId);
    console.log('postNewCollectionTagById: response: ', response);
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
    console.log('useEffect: collectionTagsState: ', collectionTagsState);
    if (collectionTagsState?.collectionTags?.length) {
      const { collectionTags: collectionTagsObjects } = collectionTagsState;
      const collectionTags = collectionTagsObjects.map((tagObject) => tagObject.name);
      setcollectionTags(collectionTags);
    } else {
      const collectionIdObject = localStorageService.getValue();
      handleCollectionTagsAction(collectionIdObject);
    }
  }, [collectionTagsState])

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