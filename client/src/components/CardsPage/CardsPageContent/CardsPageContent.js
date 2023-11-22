import { useEffect, useState } from "react";
import { CongratulationMessage } from "../CongratulationMessage/CongratulationMessage.";
import { Card } from "../Card/Card";
import { SelectBar } from "../../CustomersPage/SelectBar";

import './cardsPageContent.scss'

const context = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
}

const collection = {
  "name": "Природа",
  "is_public": false,
  "description": "Коллекция для изучения слов на тему природы на английском языке.",
  "cards": [
      {
          "term": "Tree",
          "definition": "Дерево",
          "hint": "Большое растение с корой"
      },
      {
          "term": "Mountain",
          "definition": "Гора",
          "hint": "Высокий природный объект на Земле"
      },
      {
          "term": "River",
          "definition": "Река",
          "hint": "Течёт и наполняется водой"
      },
      {
        "term": "2Tree",
        "definition": "2Дерево",
        "hint": "2Большое растение с корой"
      },
      {
          "term": "2Mountain",
          "definition": "2Гора",
          "hint": "2Высокий природный объект на Земле"
      },
      {
          "term": "2River",
          "definition": "2Река",
          "hint": "2Течёт и наполняется водой"
      }
  ],
  "tags": ["природа", "английский"]
}

// TODO component for deleting
const CardsPageContent_Old = ({ content, collectionInfo, currentPage, handlePrevPage, handleNextPage }) => {
  const [side, setSide] = useState('front-side');
  const [isComleteCollection, setIsComleteCollection] = useState(false);
  const [firstCard, setFirstCard] = useState('previous'); //
  const [secondCard, setSecondCard] = useState('current');
  const [thirdCard, setThirdCard] = useState('next');

  const [firstCardContext, setFirstCardContext] = useState('');
  const [secondCardContext, setSecondCardContext] = useState(context[currentPage]);
  const [thirdCardContext, setThirdCardContext] = useState(context[currentPage + 1]);

  /*
  useEffect(() => {
    console.log('useEffect context: currentPage', currentPage);
    if (firstCard === 'next') {                                       //todo includes
      setFirstCardContext(context[currentPage + 1]);
    }
    if (secondCard === 'next') {
      setSecondCardContext(context[currentPage + 1])
    }
    if (thirdCard === 'next') {
      setThirdCardContext(context[currentPage + 1])
    }

  }, [firstCard, secondCard, thirdCard])
  */

  const cardSideToggle = () => {
    console.log('cardSideToggle');
    if (side === 'front-side') {
      setSide('back-side');
    } else {
      setSide('front-side');
    }
  }

  const onNext = () => {
    if (firstCard.includes('previous')) {
      setFirstCard('next')
    } else if (firstCard.includes('next')) {
      setFirstCard('current')  
    } else if (firstCard.includes('current')) {
      setFirstCard('previous forward')
    }

    if (secondCard.includes('previous')) {
      setSecondCard('next')
    } else if (secondCard.includes('next')) {
      setSecondCard('current')  
    } else if (secondCard.includes('current')) {
      setSecondCard('previous forward')
    }

    if (thirdCard.includes('previous')) {
      setThirdCard('next')
    } else if (thirdCard.includes('next')) {
      setThirdCard('current')  
    } else if (thirdCard.includes('current')) {
      setThirdCard('previous forward')
    }
  }

  const onPrevious = () => {
    if (firstCard.includes('next')) {
      setFirstCard('previous')
    } else if (firstCard.includes('previous')) {
      setFirstCard('current')
    } else if (firstCard.includes('current')) {
      setFirstCard('next backward')
    }

    if (secondCard.includes('next')) {
      setSecondCard('previous')
    } else if (secondCard.includes('previous')) {
      setSecondCard('current')
    } else if (secondCard.includes('current')) {
      setSecondCard('next backward')
    }

    if (thirdCard.includes('next')) {
      setThirdCard('previous')
    } else if (thirdCard.includes('previous')) {
      setThirdCard('current')
    } else if (thirdCard.includes('current')) {
      setThirdCard('next backward')
    }
  }

  useEffect(() => {
    if (currentPage === collectionInfo.cardsInCollection) {
      setIsComleteCollection(true);
    }
  }, [currentPage, collectionInfo])

  const flipedStyle = (side === 'back-side') && 'fliped';

  const getNextCardContent = () => {
    if (firstCard.includes('next')) {                                       //todo includes
      setFirstCardContext(context[currentPage + 1]);
    }
    if (secondCard.includes('next')) {
      setSecondCardContext(context[currentPage + 1])
    }
    if (thirdCard.includes('next')) {
      setThirdCardContext(context[currentPage + 1])
    }
  }

  const getPrevCardContent = () => {
    if (firstCard === 'previous') {                                     //todo includes
      setFirstCardContext(context[currentPage - 1]);
    }
    if (secondCard === 'previous') {
      setSecondCardContext(context[currentPage - 1])
    }
    if (thirdCard === 'previous') {
      setThirdCardContext(context[currentPage - 1])
    }
  }

  const thisHandleNextPage = () => {
    handleNextPage();
    onNext();
    getNextCardContent();
  }

  const thisHandlePrevPage = () => {
    handlePrevPage();
    onPrevious();
    getPrevCardContent();
  }

  return (
    <>
      {
        !isComleteCollection ? 
        <>
          <div className={firstCard} >
            <div className="flip-card">
              <div className={`flip-card-inner ${flipedStyle}`}>
                <div className="flip-card-front">
                  <Card side={'front-side'} onClick={cardSideToggle} content={firstCardContext} hint={content.hint} />
                </div>
                <div className="flip-card-back">
                  <Card side={'back-side'} onClick={cardSideToggle} content={content.backSide.text} />
                </div>
              </div>
            </div>
          </div>
          <div className={secondCard} >
            <div className="flip-card">
                <div className={`flip-card-inner ${flipedStyle}`}>
                  <div className="flip-card-front">
                    <Card side={'front-side'} onClick={cardSideToggle} content={secondCardContext} hint={content.hint} />
                  </div>
                  <div className="flip-card-back">
                    <Card side={'back-side'} onClick={cardSideToggle} content={content.backSide.text} />
                  </div>
                </div>
              </div>
          </div>
          <div className={thirdCard} >
            <div className="flip-card">
                <div className={`flip-card-inner ${flipedStyle}`}>
                  <div className="flip-card-front">
                    <Card side={'front-side'} onClick={cardSideToggle} content={thirdCardContext} hint={content.hint} />
                  </div>
                  <div className="flip-card-back">
                    <Card side={'back-side'} onClick={cardSideToggle} content={content.backSide.text} />
                  </div>
                </div>
              </div>
          </div>
          
          <div className='select-bar'>
            <button onClick={onPrevious}>prev</button>
            <button onClick={onNext}>next</button>
            <SelectBar currentPage={currentPage}
              totalPages={collectionInfo.cardsInCollection}
              handlePrevPage={thisHandlePrevPage}
              handleNextPage={thisHandleNextPage} />
          </div>
        </> :
          <CongratulationMessage />
      }
    </>
  )
}

export {
  CardsPageContent,
}

/*
<div className={firstCard} style={{border: '1px solid blue'}}>
            {firstCardContext}
          </div>
          <div className={secondCard} style={{border: '1px solid green'}}>
            {secondCardContext}
          </div>
          <div className={thirdCard} style={{border: '1px solid yellow'}}>
            {thirdCardContext}
          </div>
*/

/*
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
          </div>
*/

/*

*/