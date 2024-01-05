import moment from "moment";

import './collectionCardCreatedAt.scss';

const CollectionCardCreatedAt = ({createdAtDate}) => {
  const dateObj = new Date(createdAtDate);
  const momentObj = moment(dateObj);
  const momentString = momentObj.format('YYYY.MM.DD');
    
  return (
    <div className="collection-card-created-at">
      <span>{momentString}</span>
    </div>
  )
}

export {
  CollectionCardCreatedAt
}