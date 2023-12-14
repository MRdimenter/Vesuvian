import './cardTag.scss';

const CardTag = ({tagText}) => {
  return (
    <div className="card-tag">
      <span className='medium-small-text'>{tagText}</span>
    </div>
  )
}

export {
  CardTag,
}