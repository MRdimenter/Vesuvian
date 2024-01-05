// TODO избавиться от копипаста (одинаковые DropDownMenuGrouping)

import { useState } from "react";
import { DropDownMenuItem } from "./DropDownMenuItem/DropDownMenuItem";
import { Icon } from "../Icon/Icon";

import "./dropDownMenu.scss";

// todo закрытие меню при клике вне его
// todo добавить рамочку выбранного варианта при открыто меню
const DropDownMenuGrouping = ({groupingOptions, selectedGroupOtionIndex, setSelectedGroupOtionIndex}) => {
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
    setSelectedGroupOtionIndex(itemIndex);
    setIsOpen(false);
  }

  const getListItems = (groupingOptions) => {
    return (
      <>
        {
          groupingOptions.map((item, index) => {
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
      {isOpen ? getListItems(groupingOptions) : getSelectedItem(groupingOptions[selectedItemIndex])}
    </ul>
    
  );
};

export {
  DropDownMenuGrouping,
}
