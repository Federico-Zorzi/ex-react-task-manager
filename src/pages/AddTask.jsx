import { useMemo, useRef, useState } from "react";

export default function AddTask() {
  const taskStatus = ["To do", "Doing", "Done"];

  const [nameTask, setNameTask] = useState("");
  const status = useRef("");
  const description = useRef("");

  const isValidNameTask = useMemo(() => {
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";
    return !nameTask.split("").some((l) => symbols.includes(l));
  }, [nameTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameTask && isValidNameTask) {
      console.log("Nuova Task:", {
        nameTask,
        status: status.current.value,
        description: description.current.value,
      });

      /* reset to default value */
      setNameTask("");
      status.current.value = "";
      description.current.value = "";
    } else console.error("Compilare tutti i campi nel modo corretto");
  };

  return (
    <main>
      <h1>Aggiungi una nuova task</h1>

      <section>
        {/* NEW TASK FORM */}
        <form className="form-add-task" onSubmit={handleSubmit}>
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
                  Il nome della task non può contenere caratteri speciali.
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
            <button type="submit" id="add-task-btn">
              Aggiungi Task
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
