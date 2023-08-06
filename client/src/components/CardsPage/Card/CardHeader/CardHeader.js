import { SettingsDropDown } from './SettingsDropDown/SettingsDropDown';
import { DescriptionDropDown } from './DescriptionDropDown/DescriptionDropDown';

import './cardHeader.scss';

const CardHeader = () => {
  return (
    <div className="card-header">
      <SettingsDropDown />
      <DescriptionDropDown />
    </div>
  )
}

export {
  CardHeader,
}