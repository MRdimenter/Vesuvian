import './whithLabel.scss';

const WhithLabel = ({ children, label }) => {
  return (
    <div className="whith-label small-text">
      <div className='whith-label-label'>
        <span>{label}</span>
      </div>
      <div className='children' style={{height: '50px'}}>
      {/* <div className='children'> */}
          {children}
      </div>
      
    </div>
  )
}

export {
  WhithLabel,
}