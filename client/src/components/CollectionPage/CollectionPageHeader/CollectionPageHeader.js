import { Button } from '../../Button/Button';
import './collectionPageHeader.scss';

const CollectionPageHeader = ({ collectionTitle = 'Basic English' }) => {
  return (
    <div className='collection-page-header'>
      <div className="collection-page-header-top">
        <div className="card-bar">
          <div className='collection-page-header-collection-title'>{collectionTitle}</div>
          <div>O</div>
          <div className="tages-bar">
            TagsList
          </div>
          <div className="button-add-tag">
            +добавить тег
          </div>
        </div>
        <div className="training-bar">
          <Button btnStyle='btn' label='Начать тренировку' link={'/collectionsPage'} />
          <div className="training-settings">
            Sun
          </div>
        </div>
      </div>
      <div className="collection-page-header-bottom">
        collection-page-header-bottom
      </div>
    </div>
  )
}

export {
  CollectionPageHeader,
}