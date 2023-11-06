import { useState } from 'react';

import './collectionSelection.scss';

const CollectionSelection = ({label, options, onChange}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    onChange(selectedOption);
  };

  return (
    <div className="collection-selection">
      <span className='small-text'>{label}</span>
      <select className="collection-selection-select" value={selectedValue} onChange={handleSelectChange}>
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