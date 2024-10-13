import { useEffect, useState, useSyncExternalStore } from "react";
import { useSelector } from "react-redux";

import './userName.css';

const UserName = () => {
  const currentCustomerData = useSelector((state) => state.currentCustomerData);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userName = currentCustomerData?.userName || 'Польз';

    setUserName(userName);
  }, [currentCustomerData])

  return(
    <div className='username small-text'>{userName}</div>
  )
}

export {
  UserName,
}