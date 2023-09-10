import { Button, IconButton } from '../../Button/Button';
import { CardTag } from '../../CardTag/CardTag';
import { Icon } from '../../Icon/Icon';
import { Title } from '../../Title/Title';

import './collectionPageHeader.scss';

const collectionAuthor = '@skaipnik';
const collectionRecentChangesDate= '09.08.2023 23:01';

const CollectionPageHeader = ({ collectionTitle = 'Basic English', tags=['English'] }) => {
  const handleSubmit = () => {
    console.log('addTabClick');
  }

  const settingsSubmit = () => {
    console.log('settingsSubmitClick');
  }

  const getTags = (tags) => {
    return (
      <>
        {tags.map((tag) => {
          return (<CardTag tagText={tag}/>)
        })}
      </>
    )
  }

  return (
    <div className='collection-page-header'>
      <div className="collection-page-header-top">
        <div className="card-bar">
          <Title text ={collectionTitle}/>
          <Icon iconName='globe-svg' iconFormat='svg' width="40" height="40" />
          {getTags(tags)}
          <Button btnStyle='link' label='+добавить тег' action={handleSubmit} />
        </div>
        <div className="training-bar">
          <Button btnStyle='btn' label='Начать тренировку' link={'/cards'} />
          <IconButton iconName={'gear-wheel-svg'} iconFormat='svg' width='30' height='30' onClick={settingsSubmit} />
        </div>
      </div>
      <div className="collection-page-header-bottom">
        <div className='collection-creator'>
          <span className='small-text'>Создано {collectionAuthor}</span>
        </div>
        <div className='recent-collection-changes'>
          <span className='small-text'>Последнее изменение от {collectionRecentChangesDate}</span>
        </div>
      </div>
    </div>
  )
}

export {
  CollectionPageHeader,
}