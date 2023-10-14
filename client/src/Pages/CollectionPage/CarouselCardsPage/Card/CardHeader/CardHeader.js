import { SettingsDropDown } from './SettingsDropDown/SettingsDropDown';
import { DescriptionDropDown } from './DescriptionDropDown/DescriptionDropDown';

import './cardHeader.scss';

const CardHeader = ({hint}) => {
  return (
    <div className="card-header">
      <SettingsDropDown />
      <DescriptionDropDown hint={hint}/>
    </div>
  )
}

export {
  CardHeader,
}