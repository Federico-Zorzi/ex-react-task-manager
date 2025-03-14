import { useState } from "react";
import Modal from "./Modal";

const EditTaskModal = ({
  show = false,
  onClose = () => {},
  task = {},
  onSave = () => {},
}) => {
  const taskStatus = ["To do", "Doing", "Done"];
  const [nameUpdated, setNameUpdated] = useState(task.title);
  const [statusUpdated, setStatusUpdated] = useState(task.status);
  const [descriptionUpdated, setDescriptionUpdated] = useState(
    task.description
  );

  return (
    <Modal
      title={"Modifica Task"}
      content={
        <form
          id="form-modal"
          className="form-task"
          onSubmit={(e) => {
            onSave(
              e,
              {
                title: nameUpdated,
                status: statusUpdated,
                description: descriptionUpdated,
              },
              task.id
            );
            onClose();
          }}
        >
          <div className="form-row">
            {/* NAME */}
            <div className="form-field">
              <label htmlFor="name">Nome Task</label>
              <input
                id="name"
                type="text"
                className="form-input-field"
                value={nameUpdated}
                onChange={(e) => setNameUpdated(e.target.value)}
                placeholder="Inserisci una nuova task..."
                required
              />
              {/* {!isValidNameTask && (
                <p className="error-validation-msg">
                  Il nome della task non può contenere caratteri speciali.
                </p>
              )} */}
            </div>

            <div className="form-field">
              {/* STATUS */}
              <label htmlFor="status">Stato</label>
              <select
                id="status"
                className="form-input-field"
                value={statusUpdated}
                onChange={(e) => setStatusUpdated(e.target.value)}
                required
              >
                {taskStatus.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            {/* DESCRIPTION */}
            <div className="form-field">
              <label htmlFor="description">Descrizione</label>
              <textarea
                id="description"
                className="form-input-field"
                value={descriptionUpdated}
                onChange={(e) => setDescriptionUpdated(e.target.value)}
                placeholder="Inserisci una descrizione della task..."
                required
              />
            </div>
          </div>
        </form>
      }
      show={show}
      onClose={onClose}
      /* onConfirm={onSave} */
      confirmButton={{
        confirmText: "Salva",
        confirmColor: "#6bac57",
        buttonType: "submit",
        buttonForm: "form-modal",
      }}
    />
  );
};

export default EditTaskModal;
