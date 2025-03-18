import { useEffect, useMemo, useRef, useState } from "react";
import { useTaskContext } from "../context/taskContext";

export default function AddTask() {
  const taskStatus = ["To do", "Doing", "Done"];
  const { addTask } = useTaskContext();
  const [operationMsg, setOperationMsg] = useState(null);

  const [nameTask, setNameTask] = useState("");
  const status = useRef("");
  const description = useRef("");

  const isValidNameTask = useMemo(() => {
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";
    return !nameTask.split("").some((l) => symbols.includes(l));
  }, [nameTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameTask || !isValidNameTask) return;

    try {
      const resAddTask = await addTask({
        title: nameTask,
        status: status.current.value,
        description: description.current.value,
      });
      /* console.log("Nuova Task aggiunta:", resAddTask); */
      setOperationMsg(resAddTask);

      if (resAddTask.success) {
        setNameTask("");
        status.current.value = "";
        description.current.value = "";
      }
    } catch (error) {
      console.error("Errore durante l'aggiunta della task:", err);
    }
  };

  useEffect(() => setOperationMsg(null), []);

  return (
    <main>
      <h1>Aggiungi una nuova task</h1>

      <section>
        {/* NEW TASK FORM */}
        <form className="form-task" onSubmit={handleSubmit}>
          <div className="form-row">
            {/* NAME */}
            <div className="form-field">
              <label htmlFor="name">Nome Task</label>
              <input
                id="name"
                type="text"
                className="form-input-field"
                value={nameTask}
                onChange={(e) => setNameTask(e.target.value)}
                placeholder="Inserisci una nuova task..."
                required
              />
              {!isValidNameTask && (
                <p className="error-validation-msg">
                  Il nome della task non può essere vuoto o contenere caratteri
                  speciali.
                </p>
              )}
            </div>

            <div className="form-field">
              {/* STATUS */}
              <label htmlFor="status">Stato</label>
              <select
                id="status"
                className="form-input-field"
                ref={status}
                required
              >
                <option value="">Seleziona lo stato...</option>
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
                ref={description}
                placeholder="Inserisci una descrizione della task..."
                required
              />
            </div>
          </div>

          <div className="form-row">
            <button type="submit" id="add-task-btn" disabled={!isValidNameTask}>
              Aggiungi Task
            </button>
          </div>
        </form>

        {operationMsg !== null ? (
          <div
            id="operation-message"
            className={operationMsg.success ? "success" : "failed"}
          >
            <p className="task-message">{operationMsg.message}</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
