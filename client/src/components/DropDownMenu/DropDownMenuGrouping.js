// TODO избавиться от копипаста (одинаковые DropDownMenuGrouping)

import { useState } from "react";
import { DropDownMenuItem } from "./DropDownMenuItem/DropDownMenuItem";
import { Icon } from "../Icon/Icon";

import "./dropDownMenu.scss";

// todo закрытие меню при клике вне его
// todo добавить рамочку выбранного варианта при открыто меню
// todo rename setSelectedGroupOtionIndex on onChange
// todo а почему он не универсальный? и дублируется в getCollectionsPageGroups
const DropDownMenuGrouping = ({groupingOptions, selectedGroupOtionIndex, setSelectedGroupOtionIndex, width}) => {
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
    <div className="drop-down-menu" style={{ width: `${width}`}}>
      <ul onClick={handleOnClickDropDownMenu}>
        {isOpen ? getListItems(groupingOptions) : getSelectedItem(groupingOptions[selectedItemIndex])}
      </ul>
      <div className={`arrow-icon ${isOpen ? '' : 'icon-close'}`}>
        <Icon iconName='opening-arrow-svg' iconFormat='svg' width="15" height="15" />
      </div>
    </div>
  );
};

export {
  DropDownMenuGrouping,
}
