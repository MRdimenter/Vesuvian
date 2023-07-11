import './modal.scss'

const Modal = ({ children, title, onClose }) => {
  return (
    <div className='modal-wrapper' onClick={onClose}>
      <div className='modal-opacity-bg'></div>
        <div className="modal-container">
          <h1 className="modal-title">{title}</h1>
          {children}
        </div>
    </div>
  )
}

export {
  Modal,
}