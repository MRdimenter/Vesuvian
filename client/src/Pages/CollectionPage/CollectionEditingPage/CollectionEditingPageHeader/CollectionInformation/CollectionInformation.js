import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerDataAction } from '../../../../../store/actions/customerAction';

import './collectionInformation.scss';

const CollectionInformation = ({collectionDataState}) => {
  const dispatch = useDispatch();

  const customerDataState = useSelector((state) => state.customerDataState);

  const [userName, setUserName] = useState('');
  console.log('CollectionInformation collectionDataState: ', collectionDataState);

  // const 
  

  const handleCustomerDataAction = async (customerUUID) => {
    try {
      await dispatch(customerDataAction(customerUUID));
    } catch (error) {
      // setcollectionTagsFetchError(error);
      console.log('!!!!!!!! setcollectionTagsFetchError(error);');
    }
  }

  useEffect(() => {

    const customerUUID = 'be834a8c-58f0-4965-b941-523427293524';

    handleCustomerDataAction(customerUUID);
  }, [])

  useEffect(() => {
    const { userName } = customerDataState.customerData;
    console.log('useEffect: userName: ', userName);
    if (userName) {
      setUserName(userName)  ;
    }
  }, [customerDataState])

  const collectionRecentChangesDate = 'collectionRecentChangesDate'

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