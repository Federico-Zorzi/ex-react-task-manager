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
      const fetchAddTask = await fetch(`${apiUrl}/tasksaa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          status,
          description,
        }),
      });

      if (!fetchAddTask.ok) {
        throw new Error(`${fetchAddTask.status} - ${fetchAddTask.statusText}`);
      }

      const resAddTask = await fetchAddTask.json();

      if (!resAddTask.success) {
        throw new Error(resAddTask.message);
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
        message: `Errore nell'aggiunta della task: ${err.message}`,
      };
    }
  };

  const removeTask = () => {};
  const updateTask = () => {};

  return {
    taskList,
    addTask,
    removeTask,
    updateTask,
  };
};

export default useTasks;
