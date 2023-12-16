import { IconButton } from '../Button/Button';

import './whithCornerDeleteButton.scss';

//TODO deleteTag не подходит для универсального компонента
const WhithCornerDeleteButton = ({deleteTag, children}) => {
  
  return (
    <div className="whith-corner-delete-button">
      <div className="corner-delete-button">
        <IconButton iconName={'corner-delete-button'} iconFormat='svg' width='13' height='13' onClick={(e) => deleteTag(children)} />
      </div>
      {children}
    </div>
  )
}

export {
  WhithCornerDeleteButton
}