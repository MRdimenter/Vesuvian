
import { Button } from '../../Button/Button';

import './collectionsPageHeader.scss';

const CollectionsPageHeader = () => {
  const handleSubmit = () => {
    console.log('handleSubmit');
  }

  return (
    <div className="collections-page-header">
        <div className="collections-page-header-sortby">
          <span>Сортировка по:    </span>
          <Button btnStyle='link' label='Алфавиту' action={handleSubmit} />
          <span>    </span>
          <Button btnStyle='link' label='Дате' action={handleSubmit} />
        </div>
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