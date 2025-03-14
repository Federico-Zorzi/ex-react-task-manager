import { useNavigate, useParams } from "react-router-dom";
import { useTaskContext } from "../context/taskContext";
import { useEffect, useState } from "react";

import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

const TaskDetail = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { taskList, removeTask, updateTask, formatStatusDesign } =
    useTaskContext();

  const [taskSelected, setTaskSelected] = useState(null);
  useEffect(() => {
    if (!id || !taskList) return;

    setTaskSelected(taskList.find((t) => parseInt(id) === t.id) || null);
  }, [id, taskList]);

  const [operationMsg, setOperationMsg] = useState(null);

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);

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

  const handleTaskUpdate = async (e, taskUpdated, taskId) => {
    e.preventDefault();

    try {
      const resUpdateTask = await updateTask(taskUpdated, taskId);
      console.log("Task modificata:", resUpdateTask);

      setOperationMsg(resUpdateTask);
    } catch (err) {
      console.error("Errore durante la modifica della task:", err);
    }
  };

  useEffect(() => setOperationMsg(null), []);

  return (
    <main>
      <h1>Task n°{id}</h1>
      {taskSelected && (
        <>
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
                <button
                  id="update-btn"
                  onClick={() => setIsShowUpdateModal(true)}
                >
                  <i className="fa-solid fa-pen fa-lg"></i>
                </button>

                <button
                  id="delete-btn"
                  onClick={() => setIsShowDeleteModal(true)}
                >
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

          <Modal
            title={"Elimina task"}
            content={"Vuoi eliminare la task selezionata?"}
            show={isShowDeleteModal}
            onClose={() => setIsShowDeleteModal(false)}
            onConfirm={() => {
              handleTaskDelete(id);
              setIsShowDeleteModal(false);
            }}
            confirmButton={{
              confirmText: "Conferma",
              confirmColor: "#f44336",
              buttonType: "button",
            }}
          />

          <EditTaskModal
            show={isShowUpdateModal}
            onClose={() => setIsShowUpdateModal(false)}
            task={taskSelected}
            onSave={handleTaskUpdate}
          />
        </>
      )}
    </main>
  );
};

export default TaskDetail;
