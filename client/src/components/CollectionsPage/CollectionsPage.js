import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ApiService } from '../../common/utils/ApiService';
import { OAuth2Service } from '../../common/utils/OAuth2Service';
import { authenticationAction } from '../../store/actions/authenticationActions';
import { collectionAction } from '../../store/actions/collectionAction';
import { LocalStorageService } from '../../common/utils/LocalStorageService';
import { BadRequestError, RefreshTokenMissingError, ServerError } from '../../common/utils/Errors/Errors';
import { CollectionsPageBody } from './CollectionsPageBody/CollectionsPageBody';
import { CollectionsPageHeader } from './CollectionsPageHeader/CollectionsPageHeader';
import { ErrorPage } from '../ErrorPage/ErrorPage';

import './collectionsPage.scss';

const DESC = 'desc';
const INC = 'inc';

const sortingOptions = [
  {
    name: '↓ Сортировка по дате создания',
    prop: 'created_at',
    sortDirection: DESC,
  },
  {
    name: '↑ Сортировка по дате создания',
    prop: 'created_at',
    sortDirection: INC,
  },
  {
    name: '↓ Сортировка по алфавиту',
    prop: 'name',
    sortDirection: DESC,
  },
  {
    name: '↑ Сортировка по алфавиту',
    prop: 'name',
    sortDirection: INC,
  },
]

const getSortedCollectionsList = (arr, sortProp, order) => {
  const sortOrder = order === DESC ? -1 : 1;

  return arr.slice().sort((a, b) => {
    if (a[sortProp] < b[sortProp]) return -1 * sortOrder;
    if (a[sortProp] > b[sortProp]) return 1 * sortOrder;
    return 0;
  });
}

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collectionsList, setCollectionsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // для перехода на страницу коллекции
  const [isMakeTransition, setIsMakeTransition] = useState(false);
  const collectionDataState = useSelector((state) => state.collectionData.collectionData);
  const loadingCollectionData = useSelector((state) => state.collectionData.loading);
  const errorCollectionData = useSelector((state) => state.collectionData.error);
  // сортировка
  const [selectedOtionIndex, setSelectedOptionIndex] = useState(0);
  
  useEffect(() => {
    if (isMakeTransition) {
      if (collectionDataState?.collectionCards && !loadingCollectionData && !errorCollectionData) {        
        const localStorageService = new LocalStorageService('CollectionsPage');

        localStorageService.setValue({collectionId: collectionDataState.collectionId});
        navigate('/collectionPage');
      } else {
        console.log('!errorCollectionData: ', !errorCollectionData);
      }
    }
  }, [isMakeTransition, navigate, collectionDataState, loadingCollectionData, errorCollectionData])

  //для отмены самостотельного перехода на страницу коллекции при полученных ранее данных о коллекции
  useEffect(() => {
    return () => {
      if (isMakeTransition) {
        setIsMakeTransition(false);
      }
    }
  }, [isMakeTransition])
  //-----------------------------------

  async function logout(dispatch) {
    const oAuth2Servise = new OAuth2Service();

    oAuth2Servise.OAuth2LogOut();
    localStorage.clear();
    dispatch(authenticationAction(false));
  }

  useEffect(() => {
    const oauthService = new OAuth2Service();
    const apiService = new ApiService(oauthService);

    async function fetchCurrentCustomerCollections() {  //TODO rename (злой копипаст - не изменил название функции)
      setLoading(true);
      try {
        const reponseCollectionList = await apiService.getCurrentCustomerCollections();
        console.log('reponseCollectionList: ', reponseCollectionList);

        if (reponseCollectionList) {
          setCollectionsList(reponseCollectionList); // !!! original (working) string
          //setTimeout(() => setCollectionsList(customers), 1000); // For testing long loading   
        } else {
          setError(true);
          throw new Error('Неверные данные');
        }
      } catch (error) {
        if (error instanceof RefreshTokenMissingError || error instanceof BadRequestError) {
          logout(dispatch); // не обязательно, но желательно привести приложение в состояние LogOut
          navigate("/reLoginPage"); //TODO но лучше на страницу с предупреждением (чтобы не было неожиданностью почему так)
        }
        if (error instanceof ServerError) {
          navigate("/errorPage");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentCustomerCollections();
  }, [dispatch, navigate]);

  const onCollectionCardClick = async (collection) => {
    const { collection_id: collectionId } = collection;
    setIsMakeTransition(true);

    // TODO добавитбь проверку (tryCatch) на ошибки при dispatch(collectionAction
    // в случае потери ключей перевести на страницу reLogin
    await dispatch(collectionAction(collectionId));
    // в теории после диспатча нужно переходить на страницу коллекции

    //getCollectionById();
  }

  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

  const spinner = (loading || loadingCollectionData) ? <div className='spinner'><Loading /></div> : null;
  const errorMessage = error ? <ErrorPage /> : null;
  const errorCollectionFetchingData = error ? <ErrorPage message='Не удалось загрузить коллекцию' /> : null;

  const sortedCollectionList = getSortedCollectionsList(collectionsList, sortingOptions[selectedOtionIndex].prop, sortingOptions[selectedOtionIndex].sortDirection);
  
  const collections = sortedCollectionList ? 
    <>
      <CollectionsPageHeader
        sortingOptions={sortingOptions}
        selectedOtionIndex={selectedOtionIndex}
        setSelectedOptionIndex={setSelectedOptionIndex} />
      <CollectionsPageBody 
        sortedCollections={sortedCollectionList}
        sortingProp={sortingOptions[selectedOtionIndex].prop}
        onCollectionCardClick={onCollectionCardClick} />
    </> : null;

  return (
    <div className='collections-page'>
      {spinner}
      {errorMessage}
      {errorCollectionFetchingData}
      {collections}
    </div>
  )
}

export {
  CollectionsPage,
}