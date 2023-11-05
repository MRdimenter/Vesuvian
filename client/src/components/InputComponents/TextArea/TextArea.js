import './textArea.scss'

const TextArea = ({ id, label, placeholder, value, onChange }) => {

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className="collection-description-textarea"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export {
  TextArea,
}