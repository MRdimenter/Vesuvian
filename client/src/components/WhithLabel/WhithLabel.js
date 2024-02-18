import './whithLabel.scss';

const WhithLabel = ({ children, label }) => {
  return (
    <div className="whith-label small-text">
      <div className='whith-label-label'>
        <span>{label}</span>
      </div>
      
      {children}
    </div>
  )
}

export {
  WhithLabel,
}