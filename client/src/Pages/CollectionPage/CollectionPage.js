import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectionAction } from '../../store/actions/collectionAction';
import { LocalStorageService } from '../../common/utils/LocalStorageService';
import { CollectionEditingPage } from './CollectionEditingPage/CollectionEditingPage';
import { CarouselCardsPage } from './CarouselCardsPage/CarouselCardsPage';
import { RefreshTokenMissingError, ServerError } from '../../common/utils/Errors/Errors';
import { Navigate, useNavigate } from 'react-router-dom';

const CollectionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        
      // try {
      //   dispatch(collectionAction(collectionIdObject.collectionId));
      // } catch (error) {
      //   console.log('!!!!!!!!!!!!!!!!!!!!');
      //   console.log('error: ', error);
      // }
      handleCollectionAction();
    }

  }, [navigate, collectionDataState, dispatch])

  const isCollectionData = collectionDataState && !loadingCollectionData && !errorCollectionData;

  return (
    <div className='collection-page'>
      {/* { isCollectionData && <CollectionEditingPage collectionData={collectionData}/> } */}
      { isCollectionData && <CarouselCardsPage collectionData={collectionData}/> }
    </div>
  )
}

export {
  CollectionPage,
}