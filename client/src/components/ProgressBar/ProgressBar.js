import './progressBar.scss'

const ProgressBar = ({currentPage, cardsInCollection}) => {
  const progressValue = cardsInCollection - currentPage;
  const currentPercent = Math.floor((currentPage/cardsInCollection) * 100);
  
  const percentsStyle = {
    right: `${100 - currentPercent +0.2}%`,
    display: currentPercent < 2 ? 'none' : '',
  }

  const displayCurrentPercent = (currentPercent <= 100) ? `${currentPercent}%` : '';

  return (
    <div className='progress-bar'>
      <progress value={progressValue} max={cardsInCollection} />
      <span className='medium-small-text' style={percentsStyle}>{displayCurrentPercent}</span>
    </div>
  )
}

export {
  ProgressBar,
}