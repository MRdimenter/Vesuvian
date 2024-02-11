import { useState } from 'react';
import { CardTag } from '../../../CardTag/CardTag';
import { WhithCornerDeleteButton } from '../../../WhithCornerDeleteButton/WhithCornerDeleteButton';
import { CardCreatingTextarea } from '../../CardCreatingForm/CardCreatingTextarea/CardCreatingTextarea';
import { TagCreatingForm } from '../../TagCreatingForm/TagCreatingForm';
import { Button } from '../../../Button/Button';

import './tagsCreatingForm.scss';

const TagsCreatingFormId = 'tag-textarea';

const TagsCreatingForm = ({tags, setNewTag, deleteTag}) => {
  const [isShowTagCreatingForm, setIsShowTagCreatingForm] = useState(false);
  const [tagValue, setTagValue] = useState('');

  const getTags = (tags) => {
    return (
      <>
        {tags.map((tag, index) => {
          return  (
            //TODO bad key
            <WhithCornerDeleteButton
              deleteTag={deleteTag}
              icon='corner-delete-button'
            >
              <CardTag key={tag} tagText={tag} index={index}/>
            </WhithCornerDeleteButton>
          )
        })}
      </>
    )
  }

  const handleSetTagValue = (e) => {
    const { value } = e.target;

    if (value?.length < 14) {
      setTagValue(value);
    } else {
      //todo: при достижении максимума появляется предупреждение
    }
    e.preventDefault();
  }

  const addTag = () => {
    if (tagValue) {
      setNewTag(tagValue); 
    }
    setTagValue('');
    setIsShowTagCreatingForm(false);
  }

  const handleOnBlur = () => {
    addTag();
  }

  const handleAddTagKeyEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  }
  
  const handleOnClickBtnAddTag = (e) => {
    setIsShowTagCreatingForm(true);
    setTimeout(() => {
      document.getElementById(TagsCreatingFormId).focus();  
    });
    e.preventDefault();
  }

  // todo: есть проблемка с "+добавить тег": при добавлении третьего тэга через сервер:
  // пропадает форма создания тэга, в этот момент отправляется запрос на создание
  // при этом появляется "+добавить тег" - заменить на Loading (т.е. должно быть состояние ожидания)

  return (
    <div className="adding-collection-tags">
      {getTags(tags)}
      {tags.length < 3 && !isShowTagCreatingForm && 
        <Button btnStyle='link' label='+добавить тег' textColor='black' action={(e) => handleOnClickBtnAddTag(e)} />}
      {isShowTagCreatingForm &&
      <div onBlur={handleOnBlur} onKeyDown={handleAddTagKeyEnter}>
        <TagCreatingForm>
          <CardCreatingTextarea
              id={TagsCreatingFormId}
              placeholder=''
              value={tagValue}
              onChange={(e) => handleSetTagValue(e)}
              textSize='small'
            />
        </TagCreatingForm>
      </div>}
    </div>
  )
}

export {
  TagsCreatingForm,
}