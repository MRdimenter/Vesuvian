
import { Button } from '../../Button/Button';
import { DropDownMenu } from '../../DropDownMenu/DropDownMenu';

import './collectionsPageHeader.scss';

const CollectionsPageHeader = ({sortingOptions, selectedOtionIndex, setSelectedOptionIndex}) => {
  const handleSubmit = () => {
    console.log('handleSubmit');
  }

  return (
    <div className="collections-page-header">
      <DropDownMenu 
        sortingOptions={sortingOptions}
        selectedOtionIndex={selectedOtionIndex}
        setSelectedOptionIndex={setSelectedOptionIndex}
      />  
      <div className="collections-page-header-groupby">
        <span>Группировка по:</span>
          <Button btnStyle='link' label='Алфавиту' action={handleSubmit} />
          <Button btnStyle='link' label='Тегу' action={handleSubmit} />
      </div>
      </div>
  )
}

export {
  CollectionsPageHeader,
}