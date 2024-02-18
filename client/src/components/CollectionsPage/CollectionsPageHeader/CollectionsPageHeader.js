
import { DropDownMenu } from '../../DropDownMenu/DropDownMenu';
import { DropDownMenuGrouping } from '../../DropDownMenu/DropDownMenuGrouping';

import './collectionsPageHeader.scss';

const CollectionsPageHeader = ({
  groupingOptions,
  selectedGroupOtionIndex,
  setSelectedGroupOtionIndex,
  sortingOptions,
  selectedOtionIndex,
  setSelectedOptionIndex,
}) => {

  const handleSubmit = () => {
    console.log('handleSubmit');
  }

  return (
    <flex-container className="collections-page-header">
      <flex-item>
        {/* todo rename asd */}
        <div className='asd'>
          <DropDownMenuGrouping 
            groupingOptions={groupingOptions}
            selectedGroupOtionIndex={selectedGroupOtionIndex}
            setSelectedGroupOtionIndex={setSelectedGroupOtionIndex}
            // width={}
          />
        </div>
      </flex-item>
      <flex-item>
        <div className='asd'>
        <DropDownMenuGrouping 
            groupingOptions={sortingOptions}
            selectedGroupOtionIndex={selectedOtionIndex}
            setSelectedGroupOtionIndex={setSelectedOptionIndex}
          />
        </div>
      </flex-item>
      {/* <flex-item abspos>item 3</flex-item> */}
    </flex-container>
  )
}

export {
  CollectionsPageHeader,
}
