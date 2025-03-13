import { useEffect, useState } from "react";

const useTasks = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [taskList, setTaskList] = useState();

  useEffect(() => {
    (async () => {
      try {
        const fetchTaskList = await fetch(`${apiUrl}/tasks`);
        const taskListResponse = await fetchTaskList.json();
        /* console.log("taskListResponse", taskListResponse); */
        setTaskList(taskListResponse);
      } catch (err) {
        console.error("Errore:", err);
      }
    })();
  }, []);

  const addTask = async ({ title, status, description }) => {
    try {
      const fetchAddTask = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          status,
          description,
        }),
      });

      if (!fetchAddTask.ok) {
        throw new Error(
          `Errore nella comunicazione con il server: ${fetchAddTask.status} - ${fetchAddTask.statusText}`
        );
      }

      const resAddTask = await fetchAddTask.json();

      if (!resAddTask.success) {
        throw new Error(
          resAddTask.message ||
            "Non è stato possibile aggiungere una nuova task"
        );
      }

      setTaskList((prevTaskList) => [...prevTaskList, resAddTask.task]);
      return {
        success: resAddTask.success,
        message: "Task aggiunta con successo!",
      };
    } catch (err) {
      /* console.error("Errore nell'aggiunta della task:", err.message); */
      return {
        success: false,
        message: err.message,
      };
    }
  };

  const removeTask = async (taskId) => {
    const taskSelected = taskList.filter((t) => taskId === t.id);

    try {
      const fetchRemoveTask = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!fetchRemoveTask.ok) {
        throw new Error(
          `Errore nella comunicazione con il server: ${fetchRemoveTask.status} - ${fetchRemoveTask.statusText}`
        );
      }

      const resRemove = await fetchRemoveTask.json();

      if (!resRemove.success) {
        throw new Error("Non è stato possibile eliminare la seguente task");
      }

      alert(
        `Task "${taskSelected[0].title}" n°${taskId} è stata eliminata con successo...`
      );
      setTaskList((prevTaskList) =>
        prevTaskList.filter((t) => t.id !== taskId)
      );

      return {
        success: resRemove.success,
        message: "Task Eliminata con successo!",
      };
    } catch (err) {
      /* console.error("Errore:", err.message); */
      return {
        success: false,
        message: err.message,
      };
    }
  };

  const updateTask = () => {};

  return {
    taskList,
    addTask,
    removeTask,
    updateTask,
  };
};

export default useTasks;
