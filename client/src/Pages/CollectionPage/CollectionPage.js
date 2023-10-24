import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectionAction } from '../../store/actions/collectionAction';
import { LocalStorageService } from '../../common/utils/LocalStorageService';
import { CollectionEditingPage } from './CollectionEditingPage/CollectionEditingPage';
import { CarouselCardsPage } from './CarouselCardsPage/CarouselCardsPage';
import { RefreshTokenMissingError } from '../../common/utils/Errors/Errors';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '../../components/ErrorPage/ErrorPage';

const CollectionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collectionData, setcollectionData] = useState([]);
  const [isTraining, setIsTraining] = useState(false);

  //на случай потери данных о коллекции (при перезагрузке приложения)
  const collectionDataState = useSelector((state) => state.collectionData.collectionData);
  const loadingCollectionData = useSelector((state) => state.collectionData.loading);
  const errorCollectionData = useSelector((state) => state.collectionData.error);

  const onStartTraining = () => {
    setIsTraining(true);
  }

  useEffect(() => {
    if (collectionDataState?.collectionData?.length) {
      let { collectionData } = collectionDataState;

      setcollectionData(collectionData);
    } else {
      const localStorageService = new LocalStorageService('CollectionsPage');
      const collectionIdObject = localStorageService.getValue();

      const handleCollectionAction = async () => {
        try {
          // Выполняем коллекционное действие
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

      handleCollectionAction();
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
      { isShowCollectionEditingPage && <CollectionEditingPage collectionData={collectionData} onStartTraining={onStartTraining}/> }
      { isShowCarouselCardsPage && <CarouselCardsPage collectionData={collectionData}/> }
    </div>
  )
}

export {
  CollectionPage,
}