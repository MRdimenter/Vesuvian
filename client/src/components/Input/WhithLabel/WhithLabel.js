import './whithLabel.scss';

const WhithLabel = ({labelContent, necessary, classNameFor, inputBoxLabelWidth, children}) => {
  const star = <span style={{ color: 'red' }}>*</span>

  return (
    <>
      <div className='inputBox-label' style={{ width: `${inputBoxLabelWidth}` }}>
        <label className="form-label small-text" htmlFor={classNameFor}>{labelContent} {necessary && star}</label>
      </div>
      {children}
    </>
  )
}

export {
  WhithLabel,
}