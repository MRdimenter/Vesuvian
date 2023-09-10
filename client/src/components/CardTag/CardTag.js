import './cardTag.scss';

const CardTag = ({tagText}) => {
  return (
    <div className="card-tag">
      <span>{tagText}</span>
    </div>
  )
}

export {
  CardTag,
}