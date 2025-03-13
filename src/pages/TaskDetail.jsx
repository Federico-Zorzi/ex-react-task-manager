import { useNavigate, useParams } from "react-router-dom";
import { useTaskContext } from "../context/taskContext";
import { useEffect, useState } from "react";

const TaskDetail = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { taskList, removeTask, formatStatusDesign } = useTaskContext();
  const [taskSelected, setTaskSelected] = useState(() =>
    taskList.find((t) => parseInt(id) === t.id)
  );
  const [operationMsg, setOperationMsg] = useState(null);
  /* 
  const [isModalOpen, setIsModalOpen] = useState(false); */

  const handleTaskDelete = async (id) => {
    try {
      const resRemoveTask = await removeTask(parseInt(id));

      /* console.log("Task eliminata:", resRemoveTask); */
      setOperationMsg(resRemoveTask);

      if (resRemoveTask.success) {
        navigate("/");
      }
    } catch (err) {
      console.error("Errore durante l'eliminazione della task:", err);
    }
  };

  useEffect(() => setOperationMsg(null), []);

  return (
    <main>
      <h1>Task n°{id}</h1>

      <section>
        <div id="detail-card">
          <div id="detail-card-head">
            <h2>
              {formatStatusDesign(taskSelected.status)} {taskSelected.title}
            </h2>
          </div>
          <div id="detail-card-body">
            <p>{taskSelected.description}</p>
          </div>
          <div id="detail-card-footer">
            <button onClick={() => handleTaskDelete(id)}>
              <i className="fa-solid fa-trash fa-lg"></i>
            </button>
          </div>
        </div>

        {operationMsg !== null && !operationMsg.success ? (
          <div id="operation-message" className="failed">
            <p className="task-message">{operationMsg.message}</p>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default TaskDetail;
