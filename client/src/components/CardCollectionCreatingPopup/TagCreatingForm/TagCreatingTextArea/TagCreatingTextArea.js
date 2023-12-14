import './tagCreatingTextArea.scss';

const TagCreatingTextArea = () => {
  const [actualPlaceholder, setActualPlaceholder] = useState(placeholder)

  useEffect(() => {
    const textarea = document.getElementById(id);

    function adjustTextarea() {
      textarea.style.height = '0px'; // Сначала сбросим высоту

      var textHeight = textarea.scrollHeight;
      textarea.style.height = textHeight + 'px';
    }

    textarea.addEventListener("input", function() {
      adjustTextarea();
    });

    // Вызовем функцию для начальной настройки
    adjustTextarea();
  }, [id, actualPlaceholder]);

  const onFocus = () => {
    setActualPlaceholder('');
  }

  const onBlur = () => {
    setActualPlaceholder(placeholder);
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className="centr-align-textarea btn-link-font-big"
        placeholder={actualPlaceholder}
        value={value}
        onChange={onChange}
        style={{ height: '1em' }} // Начальная высота как одна строка
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}

export {
  TagCreatingTextArea,
}