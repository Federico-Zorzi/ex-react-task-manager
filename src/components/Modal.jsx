import { createPortal } from "react-dom";

const Modal = ({
  title = "Titolo modale",
  content = "Contenuto modale",
  show = false,
  onClose = () => {},
  onConfirm = () => {},
  confirmText = "Conferma",
}) => {
  return createPortal(
    <div className={`modal${show ? " show" : ""}`}>
      <section className="modal-content">
        <span className="close" title="Close Modal" onClick={onClose}>
          ×
        </span>
        <div className="modal-container">
          <h2>{title}</h2>
          <p>{content}</p>

          <div className="modal-btn">
            <button type="button" className="cancelbtn" onClick={onClose}>
              Annulla
            </button>
            <button type="button" className="deletebtn" onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
};

export default Modal;
