import './progressBar.scss'

const ProgressBar = ({currentPage, cardsInCollection}) => {
  const progressValue = cardsInCollection - currentPage;
  const currentPercent = Math.floor((currentPage/cardsInCollection) * 100);
  
  const percentsStyle = {
    right: `${100 - currentPercent}%`,
    display: currentPercent < 2 ? 'none' : '',
  }

  return (
    <div className='progress-bar'>
      <progress value={progressValue} max={cardsInCollection} />
      <span className='medium-small-text' style={percentsStyle}>{currentPercent}%</span>
    </div>
  )
}

export {
  ProgressBar,
}