import { useState } from 'react';

import './collectionSelection.scss';

// TODO сделать универсальный компонент
const CollectionSelection = ({label, options, initSelectedValue, onChange, direction='column', selectWidth='100%'}) => {
  const [selectedValue, setSelectedValue] = useState(initSelectedValue || '');

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    onChange(selectedOption);
  };

  return (
    <div className={`collection-selection ${direction}`}>
      <span className='collection-selection-label small-text'>{label}</span>
      <select
        className="collection-selection-select"
        value={selectedValue}
        onChange={handleSelectChange}
        style={{ width: selectWidth }}
        
      >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    </div>
  )
}

export {
  CollectionSelection,
}