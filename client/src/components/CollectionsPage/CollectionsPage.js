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

const getSortedCollectionsList = (arr, sortProp, order) => {
  const sortOrder = order === 'decrease' ? -1 : 1;
  // console.log('getSortedCollectionsList: arr: ', arr);
  // console.log('getSortedCollectionsList: sortProp: ', sortProp);
  // console.log('getSortedCollectionsList: order: ', order);

  return arr.slice().sort((a, b) => {
    if (a[sortProp] < b[sortProp]) return -1 * sortOrder;
    if (a[sortProp] > b[sortProp]) return 1 * sortOrder;
    return 0;
  });
}

// todo разделить функцию сортировки и группировки - сейчас это в одной, т.е.:
// одна функция сортирует
// вторая группирует уже отсортированный список
// todo возможно правильнее делать это в компоненте отрисовке а не в получении данных!
function getAlfaFilterObjects(collections, order) {
  // order = 'decrease'
  // order = 'inc'
  const sortOrder = order === 'decrease' ? -1 : 1;

  const firstLetters = new Map();
  const sortedCollections = {};
  collections.forEach(element => {
    firstLetters.set(element.name[0])
  });

  const sortedFirstLetters = Array.from(firstLetters.keys()).sort((a, b) => {
    if (a < b) return -1 * sortOrder;
    if (a > b) return 1 * sortOrder;
    return 0;
  });

  sortedFirstLetters.forEach(letter => {
    sortedCollections[letter] = [];
  });

  collections.forEach((collection) => {
    sortedCollections[collection.name[0]].push(collection);
  })

  // TODO переделать на массив объектов
  return Object.entries(sortedCollections);
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

  const getSortedCollectionsList = (arr, sortProp, order) => {
    const sortOrder = order === 'decrease' ? -1 : 1;

    // console.log('getSortedCollectionsList: arr: ', arr);
    // console.log('getSortedCollectionsList: sortProp: ', sortProp);
    // console.log('getSortedCollectionsList: order: ', order);
  
    return arr.slice().sort((a, b) => {
      if (a[sortProp] < b[sortProp]) return -1 * sortOrder;
      if (a[sortProp] > b[sortProp]) return 1 * sortOrder;
      return 0;
    });
  }

  useEffect(() => {
    const sortedCollections_1 = getSortedCollectionsList(collectionsList, sortingOptions[selectedOtionIndex].prop, sortingOptions[selectedOtionIndex].sortDirection)
    console.log('sortedCollections_1: ', sortedCollections_1);
  }, [selectedOtionIndex])


  useEffect(() => {
    console.log('useEffect: errorCollectionData: ', errorCollectionData);
    if (isMakeTransition) {
      console.log('useEffect collectionDataState: ', collectionDataState);
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
          const sortedCollections = getAlfaFilterObjects(reponseCollectionList);
          setCollectionsList(sortedCollections); // !!! original (working) string
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

  async function getCollectionById() {
    const oauthService = new OAuth2Service();
    const apiService = new ApiService(oauthService);

    try {
      const reponseCollectionList = await apiService.getCollectionById(5);
      console.log('reponseCollectionList: ', reponseCollectionList);
    } catch (error) {
      console.log('error: ', error);
    }

  }

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

  const sortingOptions = [
    {
      name: '↓ Сортировка по дате создания',
      prop: 'created_at',
      sortDirection: 'decrease',
    },
    {
      name: '↑ Сортировка по дате создания',
      prop: 'created_at',
      sortDirection: 'increase',
    },
    {
      name: '↓ Сортировка по алфавиту',
      prop: 'name',
      sortDirection: 'decrease',
    },
    {
      name: '↑ Сортировка по алфавиту',
      prop: 'name',
      sortDirection: 'increase',
    },
  ]

  const spinner = (loading || loadingCollectionData) ? <div className='spinner'><Loading /></div> : null;
  const errorMessage = error ? <ErrorPage /> : null;
  const errorCollectionFetchingData = error ? <ErrorPage message='Не удалось загрузить коллекцию' /> : null;
  const collections = collectionsList ? 
    <>
      <CollectionsPageHeader
        sortingOptions={sortingOptions}
        selectedOtionIndex={selectedOtionIndex}
        setSelectedOptionIndex={setSelectedOptionIndex} />
      <CollectionsPageBody 
        sortedCollections={collectionsList}
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