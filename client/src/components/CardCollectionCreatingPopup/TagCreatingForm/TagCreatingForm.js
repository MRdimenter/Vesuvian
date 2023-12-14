import './tagCreatingForm.scss';

const TagCreatingForm = ({children}) => {
  // TODO было бы неплохо, чтобы размер (ширина) менялся динамически в зависимости от наполнения

  return (
    <div className="tag-creating-form small-text">
      {children}
    </div>
  )
}

export {
  TagCreatingForm,
}