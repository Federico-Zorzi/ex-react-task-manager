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

  const addTask = () => {};
  const removeTask = () => {};
  const updateTask = () => {};

  return { taskList, addTask, removeTask, updateTask };
};

export default useTasks;
