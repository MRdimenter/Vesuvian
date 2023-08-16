import { useEffect, useState } from "react";
import { CongratulationMessage } from "../CongratulationMessage/CongratulationMessage.";
import { Card } from "../Card/Card";
import { SelectBar } from "../../CustomersPage/SelectBar";

import './cardsPageContent.scss'

const CardsPageContent = ({ content, collectionInfo, currentPage, handlePrevPage, handleNextPage }) => {
  const [side, setSide] = useState('front-side');
  const [isComleteCollection, setIsComleteCollection] = useState(false);

  const cardSideToggle = () => {
    console.log('cardSideToggle');
    if (side === 'front-side') {
      setSide('back-side');
    } else {
      setSide('front-side');
    }
  }

  useEffect(() => {
    if (currentPage === collectionInfo.cardsInCollection) {
      setIsComleteCollection(true);
    }
  }, [currentPage, collectionInfo])

  const flipedStyle = (side === 'back-side') && 'fliped';

  return (
    <>
      {
        !isComleteCollection ? <>
          <div className="flip-card">
            <div className={`flip-card-inner ${flipedStyle}`}>
              <div className="flip-card-front">
                <Card side={'front-side'} onClick={cardSideToggle} content={content.frontSide.text} hint={content.hint} />
              </div>
              <div className="flip-card-back">
                <Card side={'back-side'} onClick={cardSideToggle} content={content.backSide.text} />
              </div>
            </div>
          </div>
          <div className='select-bar'>
            <SelectBar currentPage={currentPage}
              totalPages={collectionInfo.cardsInCollection}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage} />
          </div></> :
          <CongratulationMessage />
      }
    </>
  )
}

export {
  CardsPageContent,
}