import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerDataAction } from '../../../../../store/actions/customerAction';
import { collectionInfoAction } from '../../../../../store/actions/collectionAction';

import './collectionInformation.scss';
import moment from 'moment';

const CollectionInformation = ({collectionDataState}) => {
  const dispatch = useDispatch();

  const customerDataState = useSelector((state) => state.customerDataState);
  const state = useSelector((state) => state);
  const collectionInfo = useSelector((state) => state.collectionInfo.collectionInfo)

  useEffect(() => {
    console.log('state: ', state);
  }, [state])
  

  const [userName, setUserName] = useState('');
  const [collectionRecentChangesDate, setCollectionRecentChangesDate] = useState('');
  

  const handleCollectionInfoAction = async (collcetionId) => {
    try {
      await dispatch(collectionInfoAction(collcetionId));
    } catch (error) {
      // setcollectionTagsFetchError(error);
      console.log('!!!!!!!! setcollectionTagsFetchError(error);');
    }
  }
  

  const handleCustomerDataAction = async (customerUUID) => {
    try {
      await dispatch(customerDataAction(customerUUID));
    } catch (error) {
      // setcollectionTagsFetchError(error);
      console.log('!!!!!!!! setcollectionTagsFetchError(error);');
    }
  }

  useEffect(() => {
    const { collectionId } = collectionDataState.collectionData;
    if (collectionId) {
      handleCollectionInfoAction(collectionId)  
    }
  }, [collectionDataState])

  const getModifiedDate = (date) => {
    const dateObj = new Date(date);
    const momentObj = moment(dateObj);
    const momentString = momentObj.format('YYYY.MM.DD');
    const momentTimeString = momentObj.format('h:mm');
    return `${momentString} ${momentTimeString}`
  }

  useEffect(() => {
    const customerUUID = collectionInfo.collection_creator;
    const modifiedDate = collectionInfo.modified_date;

    handleCustomerDataAction(customerUUID);
    setCollectionRecentChangesDate(getModifiedDate(modifiedDate));
  }, [collectionInfo])

  useEffect(() => {
    const { userName } = customerDataState.customerData;
    if (userName) {
      setUserName(userName)  ;
    }
  }, [customerDataState])

  return (
    <div className="collection-information">
      <div className='collection-creator'>
        <span className='small-text'>{`Создано ${userName ? `@${userName}` : ''}`}</span>
      </div>
      <div className='recent-collection-changes'>
        <span className='small-text'>Последнее изменение от {collectionRecentChangesDate}</span>
      </div>
    </div>
  )
}

export {
  CollectionInformation,
}