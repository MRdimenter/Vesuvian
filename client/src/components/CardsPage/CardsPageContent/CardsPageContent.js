import { useEffect, useState } from "react";
import { CongratulationMessage } from "../CongratulationMessage/CongratulationMessage.";
import { Card } from "../Card/Card";
import { SelectBar } from "../../CustomersPage/SelectBar";

import './cardsPageContent.scss'

const CardsPageContent = ({ content, collectionInfo, currentPage, handlePrevPage, handleNextPage }) => {
  const [side, setSide] = useState('front-side');
  const [isComleteCollection, setIsComleteCollection] = useState(false);

  const cardSideToggle = () => {
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

  const flipedStyle = (side === 'front-side') && 'fliped';

  return (
    <>
      {
        !isComleteCollection ? <>
          <div class="flip-card">
            <div class={`flip-card-inner ${flipedStyle}`}>
              <div class="flip-card-front">
                <Card content={content.frontSide.text} side={'front-side'} onClick={cardSideToggle} />
              </div>
              <div class="flip-card-back">
                <Card content={content.backSide.text} side={'back-side'} onClick={cardSideToggle} />
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