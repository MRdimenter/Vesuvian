import { useEffect, useState } from 'react';
import { SelectBar } from '../CustomersPage/SelectBar';
import { Card } from './Card/Card';
import { CardsPageHeader } from './CardsPageHeader/CardsPageHeader';
import { CongratulationMessage } from './CongratulationMessage/CongratulationMessage.';

import './cardsPage.scss';

const content = 'Hello';
const cardsInCollection = 3;

const CardsPage = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [isComleteCollection, setIsComleteCollection] = useState(false);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, cardsInCollection));
  };

  useEffect(() => {
    if (currentPage === cardsInCollection) {
      setIsComleteCollection(true);
    }
  },[currentPage])

  return (
    <div className='cards-page'>
      <CardsPageHeader currentPage={currentPage} cardsInCollection={cardsInCollection} />
      <div className="cards-page-body">
        {
          !isComleteCollection ? <>
            <Card content={content}
                  currentPage={currentPage}
                  pages={cardsInCollection}
                  setCurrentPage={setCurrentPage}
                  perPage={1} />
            <div className='select-bar'>
              <SelectBar  currentPage={currentPage}
                          totalPages={cardsInCollection}
                          handlePrevPage={handlePrevPage}
                          handleNextPage={handleNextPage} />
            </div>
          </> : 
          <CongratulationMessage />
        }

      </div>
      
      
    </div>
  )
}

export {
  CardsPage,
}