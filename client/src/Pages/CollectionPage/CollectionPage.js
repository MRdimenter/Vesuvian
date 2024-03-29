import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectionAction, collectionTagsAction } from '../../store/actions/collectionAction';
import { LocalStorageService } from '../../common/utils/LocalStorageService';
import { CollectionEditingPage } from './CollectionEditingPage/CollectionEditingPage';
import { CarouselCardsPage } from './CarouselCardsPage/CarouselCardsPage';
import { RefreshTokenMissingError } from '../../common/utils/Errors/Errors';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '../../components/ErrorPage/ErrorPage';

const CollectionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collectionCards, setcollectionCards] = useState([]);
  const [collectionTagsFetchError, setcollectionTagsFetchError] = useState();
  const [isTraining, setIsTraining] = useState(false);

  //на случай потери данных о коллекции (при перезагрузке приложения)
  const collectionDataState = useSelector((state) => state.collectionData.collectionData);
    const loadingCollectionData = useSelector((state) => state.collectionData.loading);
  const errorCollectionData = useSelector((state) => state.collectionData.error);

  const collectionTagsState = useSelector((state) => state.collectionTags.collectionTags);
  const loadingCollectionTags = useSelector((state) => state.collectionTags.loading);
  const errorCollectionTags = useSelector((state) => state.collectionTags.error);

  const onStartTraining = () => {
    setIsTraining(true);
  }

  useEffect(() => {
    if (collectionDataState?.collectionCards) {
      let { collectionCards } = collectionDataState;

      setcollectionCards(collectionCards);
    } else {
      const localStorageService = new LocalStorageService('CollectionsPage');
      const collectionIdObject = localStorageService.getValue();

      const handleCollectionAction = async (collectionIdObject) => {
        try {
          // Выполняем "коллекционное" действие
          await dispatch(collectionAction(collectionIdObject.collectionId));
        } catch (error) {
          if (error instanceof RefreshTokenMissingError) {
            // В случае ошибки 401, переходим на страницу авторизации
            navigate("/reLoginPage");
          } else {
            // Обработка других ошибок
            console.log('ELSE: // Обработка других ошибок');
            if (error instanceof RefreshTokenMissingError) {
              navigate("/errorPage");
            }
          }
        }
      }
      handleCollectionAction(collectionIdObject);

      const handleCollectionTagsAction = async (collectionIdObject) => {
        const { collectionId } = collectionIdObject;
        try {
          await dispatch(collectionTagsAction(collectionId));
        } catch (error) {
          setcollectionTagsFetchError(error);
        }
      }
      handleCollectionTagsAction(collectionIdObject);
    }
  }, [navigate, collectionDataState, dispatch])

  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

  const isCollectionData = collectionDataState && !loadingCollectionData && !errorCollectionData;
  const isShowCollectionEditingPage = isCollectionData && !isTraining;
  const isShowCarouselCardsPage = isCollectionData && isTraining;
  const spinner = loadingCollectionData ? <div className='spinner'><Loading /></div> : null;
  const errorMessage = errorCollectionData ? <ErrorPage /> : null;
  
  return (
    <div className='collection-page'>
      {spinner}
      {errorMessage}
      { isShowCollectionEditingPage && 
        <CollectionEditingPage
          collectionId={collectionDataState.collectionId}
          collectionCards={collectionCards}
          onStartTraining={onStartTraining}
        />
      }
      { isShowCarouselCardsPage && <CarouselCardsPage collectionCards={collectionCards}/> }
    </div>
  )
}

export {
  CollectionPage,
}