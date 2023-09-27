import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ApiService } from '../../common/utils/ApiService';
import { OAuth2Service } from '../../common/utils/OAuth2Service';
import { authenticationAction } from '../../store/actions/authenticationActions';
import { BadRequestError, RefreshTokenMissingError, ServerError } from '../../common/utils/Errors/Errors';

import { ErrorPage } from '../ErrorPage/ErrorPage';
import { CollectionsPageBody } from './CollectionsPageBody/CollectionsPageBody';
import { CollectionsPageHeader } from './CollectionsPageHeader/CollectionsPageHeader';

import './collectionsPage.scss';
import { collectionAction } from '../../store/actions/collectionAction';

function getAlfaFilterObjects(collections) {
  const firstLetters = new Map();
  const sortedCollections = {};
  collections.forEach(element => {
    firstLetters.set(element.name[0])
  });

  const sortedFirstLetters = Array.from(firstLetters.keys()).sort();
  sortedFirstLetters.forEach(letter => {
    sortedCollections[letter] = [];
  });

  collections.forEach((collection) => {
    sortedCollections[collection.name[0]].push(collection);
  })

  return Object.entries(sortedCollections);
}

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collectionsList, setCollectionsList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // для перехода на страницу коллекции
  const [isMakeTransition, setIsMakeTransition] = useState(false);
  const collectionDataState = useSelector((state) => state.collectionData.collectionData);
  const loadingCollectionData = useSelector((state) => state.collectionData.loading);
  const errorCollectionData = useSelector((state) => state.collectionData.error);



  useEffect(() => {
    if (isMakeTransition) {
      if (collectionDataState?.length && !loadingCollectionData && !errorCollectionData) {
        navigate('/collectionPage');
      }
    }
  }, [collectionDataState, loadingCollectionData, errorCollectionData])

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

    async function getAPICustomers() {  //TODO rename (злой копипаст - не изменил название функции)
      setLoading(true);
      try {
        const reponseCollectionList = await apiService.getCurrentCustomerCollections();

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

    setCollectionsList(null);
    getAPICustomers();
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

    //TODO задумка такая:
    // получить данные коллекции и отправить их в с store
    // после этого перейти на страницу коллекции и получить их там
    // НО сперва нужно убедиться, что данные получены и находятся в store
    // А теперь вопрос: как узнать, что collectionAction завершился успешно?

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
  const collections = collectionsList ? <>
    <CollectionsPageHeader />
    <CollectionsPageBody sortedCollections={collectionsList} onCollectionCardClick={onCollectionCardClick} />
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