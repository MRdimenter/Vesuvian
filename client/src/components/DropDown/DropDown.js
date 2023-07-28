import './dropDown.scss';

const DropDown = ({width, padding, paddingTop, children}) => {
  const dropDownStyles = {
    width: `${width}px`,
    minHeight: '20px',
    padding: `${padding}px`,
    borderRadius: '10px',

    color: 'black',
  }

  const dropDownContentStyles = {
    paddingTop: `${paddingTop}px`,
    marginLeft: `${15}px`,
    marginRight: `${15}px`,
  }

  return (
    <div className='drop-down' style={dropDownStyles}>
      <div className="drop-down-content" style={dropDownContentStyles}>
        {children}
      </div>
    </div>
  )
}

export {
  DropDown,
}