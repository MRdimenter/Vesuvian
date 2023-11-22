import { useEffect, useState } from "react";
import { CongratulationMessage } from "../../../../components/CardsPage/CongratulationMessage/CongratulationMessage.";
import { Card } from "../../../../components/CardsPage/Card/Card";
import { SelectBar } from "../../../../components/CustomersPage/SelectBar";

import './cardsPageContent.scss'

const EMPTY_COLLETION_DATA = {term: '', definition: ''}

const CardsPageContent = ({ collectionCards, content, collectionInfo, currentPage, handlePrevPage, handleNextPage }) => {
  const [side, setSide] = useState('front-side'); // todo 'front-side' in constant
  const [isComleteCollection, setIsComleteCollection] = useState(false);
  const [firstCard, setFirstCard] = useState('previous');
  const [secondCard, setSecondCard] = useState('current');
  const [thirdCard, setThirdCard] = useState('next');

  //TODO important: почитать почему изначально рендерится при пустом collectionCards
  const [firstCardContext, setFirstCardContext] = useState({term: collectionCards[0]?.term, definition: collectionCards[0]?.definition} || EMPTY_COLLETION_DATA); //TODO если не первая страница открыта то - collectionCards[currentPage - 2].term
  const [secondCardContext, setSecondCardContext] = useState({term: collectionCards[currentPage - 1]?.term, definition: collectionCards[currentPage - 1]?.definition} || EMPTY_COLLETION_DATA);
  const [thirdCardContext, setThirdCardContext] = useState({term: collectionCards[currentPage]?.term, definition: collectionCards[currentPage]?.definition} || EMPTY_COLLETION_DATA);

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
    if (collectionCards.length && currentPage > collectionCards.length) { //TODO почему при > сразу true? (возможно проблема в типах при сравнении)
      console.log('ififif :', `currentPage(${currentPage}) collectionCards.length(${collectionCards.length})`);
      setIsComleteCollection(true);
    }
  }, [currentPage, collectionInfo])

  const flipedStyle = (side === 'back-side') && 'fliped';

  const getNextCardContent = () => {
    if (firstCard.includes('next')) {
      setFirstCardContext({term: collectionCards[currentPage]?.term, definition: collectionCards[currentPage]?.definition});
    }
    if (secondCard.includes('next')) {
      setSecondCardContext({term: collectionCards[currentPage]?.term, definition: collectionCards[currentPage]?.definition})
    }
    if (thirdCard.includes('next')) {
      setThirdCardContext({term: collectionCards[currentPage]?.term, definition: collectionCards[currentPage]?.definition})
    }
  }

  const getPrevCardContent = () => {
    if (firstCard === 'previous') {
      setFirstCardContext({term: collectionCards[currentPage - 2]?.term, definition: collectionCards[currentPage - 2]?.definition} || EMPTY_COLLETION_DATA);
    }
    if (secondCard === 'previous') {
      setSecondCardContext({term: collectionCards[currentPage - 2]?.term, definition: collectionCards[currentPage - 2]?.definition} || EMPTY_COLLETION_DATA)
    }
    if (thirdCard === 'previous') {
      setThirdCardContext({term: collectionCards[currentPage - 2]?.term, definition: collectionCards[currentPage - 2]?.definition} || EMPTY_COLLETION_DATA)
    }
  }

  const thisHandleNextPage = () => {
    if (side === 'back-side') {
      setSide('front-side');
    }
    handleNextPage();
    onNext();
    getNextCardContent();
  }

  const thisHandlePrevPage = () => {
    if (side === 'back-side') {
      setSide('front-side');
    }
    handlePrevPage();
    onPrevious();
    getPrevCardContent();
  }

  useEffect(() => {
    setFirstCardContext({term: collectionCards[currentPage - 2]?.term, definition: collectionCards[currentPage - 2]?.definition} || '')
    setSecondCardContext({term: collectionCards[currentPage - 1]?.term, definition: collectionCards[currentPage - 1]?.definition} || '');
    setThirdCardContext({term: collectionCards[currentPage]?.term, definition: collectionCards[currentPage]?.definition} || '');
  }, [collectionCards])

  return (
    <>
      {
        !isComleteCollection ? 
        <>
          <div className={firstCard} >
            <div className="flip-card">
              <div className={`flip-card-inner ${flipedStyle}`}>
                <div className="flip-card-front">
                  <Card side={'front-side'} onClick={cardSideToggle} content={firstCardContext.term} hint={content.hint} />
                </div>
                <div className="flip-card-back">
                  <Card side={'back-side'} onClick={cardSideToggle} content={firstCardContext.definition} hint={content.hint}/>
                </div>
              </div>
            </div>
          </div>
          <div className={secondCard} >
            <div className="flip-card">
                <div className={`flip-card-inner ${flipedStyle}`}>
                  <div className="flip-card-front">
                    <Card side={'front-side'} onClick={cardSideToggle} content={secondCardContext.term} hint={content.hint} />
                  </div>
                  <div className="flip-card-back">
                    <Card side={'back-side'} onClick={cardSideToggle} content={secondCardContext.definition} />
                  </div>
                </div>
              </div>
          </div>
          <div className={thirdCard} >
            <div className="flip-card">
                <div className={`flip-card-inner ${flipedStyle}`}>
                  <div className="flip-card-front">
                    <Card side={'front-side'} onClick={cardSideToggle} content={thirdCardContext.term} hint={content.hint} />
                  </div>
                  <div className="flip-card-back">
                    <Card side={'back-side'} onClick={cardSideToggle} content={thirdCardContext.definition} />
                  </div>
                </div>
              </div>
          </div>
          
          <div className='select-bar'>
            <button onClick={onPrevious}>prev</button>
            <button onClick={onNext}>next</button>
            {/* //TODO возможно вынести в отдельный компонент на уровень выше */}
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