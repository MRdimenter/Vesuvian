import { useState } from "react";
import { DropDownMenuItem } from "./DropDownMenuItem/DropDownMenuItem";
import { Icon } from "../Icon/Icon";

import "./dropDownMenu.scss";

// todo закрытие меню при клике вне его
// todo добавить рамочку выбранного варианта при открыто меню
const DropDownMenu = ({sortingOptions, selectedOtionIndex, setSelectedOptionIndex}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const handleOnClickDropDownMenu = () => {
    if (!isOpen) {
      setIsOpen(true); 
    }
  }

  const handleOnSelect = (itemIndex) => {
    console.log('handleOnSelect: itemIndex: ', itemIndex);
    setSelectedItemIndex(itemIndex);
    setSelectedOptionIndex(itemIndex);
    setIsOpen(false);
  }

  const getListItems = (sortingOptions) => {
    return (
      <>
        {
          sortingOptions.map((item, index) => {
            return (
              <li onClick={() => handleOnSelect(index)}>{item.name}</li>
            )
          })
        }
      </>
    )
  }

  const getSelectedItem = (item) => {
    return (
      <DropDownMenuItem item={item}/>
    )
  }

  return (
    <ul onClick={handleOnClickDropDownMenu} className="drop-down-menu">
      <div className={`arrow-icon ${isOpen ? '' : 'icon-close'}`}>
        <Icon iconName='opening-arrow-svg' iconFormat='svg' width="15" height="15" />
      </div>
      {isOpen ? getListItems(sortingOptions) : getSelectedItem(sortingOptions[selectedItemIndex])}
    </ul>
    
  );
};

export {
  DropDownMenu,
}
