import './dropDown.scss';

const DropDown = ({width, height, paddingTop, children}) => {
  const dropDownStyles = {
    width: `${width}px`,
    height: `${height}px`,
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